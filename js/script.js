const pantalla = document.querySelector(".pantalla");

let operacionPendiente = "";

let numeroAnterior = "";

let operadorActual = null;

let reiniciarPantalla = false;

//* Función Agregar numero o digito con el boton "+"
function agregar(valor) {

    if (reiniciarPantalla) {
        pantalla.value = "";
        reiniciarPantalla = false;
  }

    if (["+"].includes(valor)) {

        if (operadorActual !== null) {
            calcular();
        }
        numeroAnterior = pantalla.value;
        operadorActual = valor;
        reiniciarPantalla = true;

    } else {
        pantalla.value += valor;
    }

}

//* Función Restar numero o digito con el boton "-"
function restar(valor) {

    if (reiniciarPantalla) {
        pantalla.value = "";
        reiniciarPantalla = false;
  }

    if (["-"].includes(valor)) {

        if (operadorActual !== null) {
            calcular();
        }
        numeroAnterior = pantalla.value;
        operadorActual = valor;
        reiniciarPantalla = true;

    } else {
        pantalla.value -= valor;
    }
}

//* Función dividir números con el signo "/"
let dividir = (valor) => {
    
    if (reiniciarPantalla) {
        pantalla.value = "";
        reiniciarPantalla = false;
  }

    if (["/"].includes(valor)) {

        if (operadorActual !== null) {
            calcular();
        }
        numeroAnterior = pantalla.value;
        operadorActual = valor;
        reiniciarPantalla = true;

    } else {
        pantalla.value /= valor;
    }
}

//* Función raiz de un número con el signo "√"
let raiz = (valor) => {
    
    if (reiniciarPantalla) {
        pantalla.value = "";
        reiniciarPantalla = false;
  }

    if (["√"].includes(valor)) {

        if (operadorActual !== null) {
            calcular();
        }
        numeroAnterior = pantalla.value;
        operadorActual = valor;
        reiniciarPantalla = true;

    } else {
        pantalla.value += valor;
    }
}

//* Funcion limpiarTodo con el boton "C"
function limpiarTodo() {

    limpiar();
    
}

//* Funcion borrarDigito con el boton '←'

let borrarDigito = () => {

    pantalla.value = pantalla.value.slice(0, -1);

}

//* Función limpiar pantalla
function limpiar () {
    pantalla.value = '';
    operacionPendiente = '';
    numeroAnterior = '';
    operadorActual = null;
}

//* Función calcular
function calcular() {
    if(operadorActual === null || reiniciarPantalla) {
        return;
    }

    const numero1 = parseFloat(numeroAnterior);
    const numero2 = parseFloat(pantalla.value);

    if (isNaN(numero1) || isNaN(numero2)) {

        pantalla.value = 'Error';
        setTimeout(limpiar, 1500)
        return
    }

    let resultado;

    switch (operadorActual) {
        case '+':
            resultado = numero1 + numero2;
            break;
        case '-':
            resultado = numero1 - numero2;
            break;
        case '×':
            resultado = numero1 * numero2;
            break;
        case '/':
            resultado = numero1 / numero2;
            break;
        case '√':
            resultado = Math.sqrt(numero1);
            break;
    }

    //* Redondear a ocho decimales, evitando problemas de precición
    resultado = Math.round(resultado * 100000000) / 100000000;

    pantalla.value = resultado;
    operadorActual = null;
    numeroAnterior = '';
    reiniciarPantalla = true;

}

//* Manejo de eventos
document.addEventListener('keydown', (event) => {
    event.preventDefault();
    const key = event.key;
    
    // Tecla enter para calcular 
    if (/[0-9\+\-\*\/\./]/.test(key)) {
        agregar(key);

    }
    // Tecla enter para confirmar una operacion
    else if (key === 'Enter') {
        calcular();
        console.log("Enter key pressed"); //Permite comprobar en consola si funcionó
    }

    // Tecla escape para limpiar
    else if (key === 'Escape') {
        limpiarTodo();
        console.log("Escape key pressed"); //Permite comprobar en consola si funcionó
    }

    // Tecla backscape para borrar caracter 
    else if (key === 'Backspace') {
        borrarDigito();
        console.log("Backspace key pressed"); //Permite comprobar en consola si funcionó
    } 
})