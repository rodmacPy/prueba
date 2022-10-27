//TEXTOS PARA LOS DESAFIOS
const textos = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];
// almacena la lista de palabras y el índice de la palabra que el jugador está escribiendo actualmente
let palabras = [];
let palabraIndice = 0;
// la hora de inicio
let startTime = Date.now();
// elementos de la pagina
const desafioElement = document.getElementById('desafio');
const mensajeElement = document.getElementById('mensaje');
const textoTipeadoElement = document.getElementById('texto-tipeado');
const marcasElement = document.getElementById('marcas');

//varibles para realizar un top de mejores tiempos
let top1 = window.localStorage.getItem("1");
let top2 =window.localStorage.getItem("2");
let top3 =window.localStorage.getItem("3");
//mostramos en las vista el top con los tiempos
marcasElement.innerHTML = "<p>Top1 "+top1+" Top2 " + top2 + " Top3 "+top3+"</p>"

//desacticamos el input antes que empiece el juego
textoTipeadoElement.disabled=true;


//agregamos evento al boton inicio y con ello la logica que se necita
document.getElementById('inicio').addEventListener('click', () => {
    //avilitamos el input para escribir las palabras del test
    textoTipeadoElement.disabled=false;

    //de manera aleatoria se elije el indice del texto a mostrar
    const textoIndice = Math.floor(Math.random() * textos.length);
    // accedemos a nuestra matriz para opter el texto 
    const texto = textos[textoIndice];
    // separamos el texto en un array de palabras
    palabras = texto.split(' ');
    // reestablemos el idice de palabras para el seguimiento
    palabraIndice = 0;
  
    //hacemos que cada palabra sea un span para poder darle un class y asi resaltar
    const spanPalabras = palabras.map(function(palabra) { return `<span>${palabra} </span>`});
    // comvertimos el array mapeado a string y lo mostramos
    desafioElement.innerHTML = spanPalabras.join('');
    // Resaltamos la primer palabra
    desafioElement.childNodes[0].className = 'resaltar';
    
    // Borramos los mensajes previos
    mensajeElement.innerText = '';
  
    // Vaciamos el elemento textbox
    textoTipeadoElement.value = '';
    // Definimos el foco en el elemento
    textoTipeadoElement.focus();
    // Iniciamos el contador de tiempo
    startTime = new Date().getTime();
  });
//control de las acciones del juego 


//agregamos un escuchador de evento al elemento input
textoTipeadoElement.addEventListener('input', () => {
    // tomamos la palabra actual
    const palabraActual = palabras[palabraIndice];
    // tomamos el valor actual
    const palabraEscrita = textoTipeadoElement.value;
    // con esto controlamos si la palabra que acabamos de escribir es la ultima y en caso que no se mueve el puntero
    if (palabraEscrita === palabraActual && palabraIndice === palabras.length - 1) {
        //Tiempo es la constanilizacion de lo que se tardo en completar el test
        let tiempo = new Date().getTime() - startTime;
        tiempo = Math.round(tiempo/1000);
        //TOP 3 DE MEJORES TIEMPOS
        if (tiempo <= window.localStorage.getItem("1")) {
            window.localStorage.setItem("1",tiempo);
        } else if(tiempo <= window.localStorage.getItem("2")){
            window.localStorage.setItem("2",tiempo);
        }else if (tiempo <= window.localStorage.getItem("3")) {
            window.localStorage.setItem("3",tiempo);
        }


        const mensaje = `FELICITACIONES! Finalizaste en ${tiempo / 1000} segundos.`;
        //esto es para que al final quede vacio el imput
        textoTipeadoElement.value = '';
        //mostramos el mensaje de exito
        mensajeElement.className = 'exito' 
        mensajeElement.innerText = mensaje;

        //desabilitamos el input al terminar 
        textoTipeadoElement.disabled=true;

        //Escondemos el cuadro de texto
        desafioElement.innerHTML=""
        
        
        //logica para que al apretar espacio cambien de palabra
        // si palabraEscrita tiene un espacio al final y la palabra que se escribio es igual al de la muestra se cambia de palabra
    } else if (palabraEscrita.endsWith(' ') && palabraEscrita.trim() === palabraActual) {
        // vaciamos input
        textoTipeadoElement.value = '';
        // movemos a la palabra siguiente
        palabraIndice++;
        // reiniciamos el estado de todas las clases para los textos
        for (const palabraElement of desafioElement.childNodes) {
            palabraElement.className = '';
        }
        // resaltamos la palabra actual
        desafioElement.childNodes[palabraIndice].className = 'resaltar';
        //vamos controlando que las palabra se esta escribiendo de manera correcta
    } else if (palabraActual.startsWith(palabraEscrita)) {
        // resaltar la siguiente palabra
        textoTipeadoElement.className = '';
    } else {
      // en caso que haya un error al escribir el imput se pinta de rojo para denotar el error
      textoTipeadoElement.className = 'error';
    }
  });