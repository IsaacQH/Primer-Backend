//ARCHIVO DE RUTAS PARA PROJECT

'use strict'

var express = require('express')                                     //Inicia express
var ProjectController = require('../controllers/project.controller')    //IMPORTA objeto de controlador Projects

var router = express.Router()                 //Manda a llamar a los métodos HTTP de express

router.get('/home', ProjectController.home)     //Se hace un metodo get y se realiza la acción de la función home en controaldor  

router.post('/test', ProjectController.test)    //Se hace un metodo post y se realiza la acción de la función home en controaldor 

module.exports = router                      //Se exporta
//NO OLVIDAR COLOCAR EN app.js