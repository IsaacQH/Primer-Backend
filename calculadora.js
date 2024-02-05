'use strict'

var params = process.argv.slice(2)  //Esto nor permite procesar y leer los argumentos dados en la consola.
                                    // node ARCHIVO  PARAMETROS
                                    // 0      1       2

console.log(params)                 // node calculadora 1 2 3 4 = ['1', '2', '3', '4']
console.log("Probando Node.JS")

var numero1 = parseFloat(params[0])  //Cambia de string a float el valor de params0
var numero2 = parseFloat(params[1])  //Cambia de string a float el valor de params2

//Plantilla de calculadora 
var plantilla = `
    Input: ${numero1} y  ${numero2} 
    Suma  -> ${numero1 + numero2}
    Resta -> ${numero1 - numero2}
    Mult  -> ${numero1 * numero2}
    Div   -> ${numero1 / numero2}`

console.log(plantilla)