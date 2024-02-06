//ARCHIVO DE EXPRESS: Se hace la declaración de express y los protocolos necesarios

'use strict'

var express = require('express')        //Carga libreria express y se declara el objeto
var bodyParse = require('body-parser')  //Carga libreria body parse (para hacer transofrmaciones) y se declara el objeto

var app = express()

//ARCHIVOS DE RUTAS

//MIDDLEWARES: Son capas que se ejecutan antes de ejecutar el resultado de la peticion

app.use(bodyParse.urlencoded({extended:false}))      //Configuracion NECESARIA para funcionalidad para bodyParse
app.use(bodyParse.json())                            //Convierte todo lo que llega a un objeto JSON en express

//CORS

//RUTAS
app.get('/', (req, res) =>{                    //función get de http 
    res.status(200).send(                         //hace res (envia la respuesta) con un mensaje
        "<h1>HOME</h1>"
    )
})

app.post('/test', (req, res) =>{                    //función get de http 
    console.log(req.params.nombre)                           //Imprime lo que recibe del post
    console.log(req.body.nombre)
    console.log(req.query.web)
    res.status(200).send({                         //hace res (envia la respuesta) con un mensaje
        message: "API node.JS en ruta Test"
    })
})

//EXPORTAR
module.exports = app
