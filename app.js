//ARCHIVO DE EXPRESS: Se hace la declaración de express y los protocolos necesarios

'use strict'

var express = require('express')        //Carga libreria express y se declara el objeto
var bodyParse = require('body-parser')  //Carga libreria body parse (para hacer transofrmaciones) y se declara el objeto

var app = express()

//ARCHIVOS DE RUTAS
var project_routes = require('./routes/projects.routes')

//MIDDLEWARES: Son capas que se ejecutan antes de ejecutar el resultado de la peticion

app.use(bodyParse.urlencoded({extended:true}))      //Configuracion NECESARIA para funcionalidad para bodyParse
app.use(bodyParse.json())                            //Convierte todo lo que llega a un objeto JSON en express

//CORS

//ROUTES OVERIDE
app.use('/', project_routes)      //Podemos colocar el nombre de ruta y se sumará a la otra ruta   /api/home o /home

//EXPORTAR
module.exports = app
