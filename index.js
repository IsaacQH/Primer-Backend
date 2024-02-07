//ARCHIVO PRINCIPAL DE EL PROYECTO: Se haran las funcionalidades principales y las conexiones requeridas.


'use strict'

var mongoose = require('mongoose')    //Carga modulo o libreria mongoose, se crea objeto de Mongoose
var app = require('./app')            //importa en variable el valor de app.js
var port = 3700                       //Puerto que queremos asignar para el proyecto
//--------------------------------------------------------------------------------------------------------------
mongoose.Promise = global.Promise     //Inidcamos que se realizará una promesa en mongoose
mongoose.connect('mongodb://127.0.0.1:27017/Portafolio')  //Conecta a la db 127.0.0.1:27017 = localhost:27017
        .then(() =>{                                      //Promesa que ejecuta si todo sale bien

            console.log("Conexion a base de datos establecida con exito")

            //CREACION DEL SERVIDOR ----------------------------------
            app.listen(port,() =>{
                console.log("Servidor corriendo correctamente en la url localhost:3700")
            })
        })
        .catch((err) => {                                //Promesa que captura el error
            console.log(err)
        })
