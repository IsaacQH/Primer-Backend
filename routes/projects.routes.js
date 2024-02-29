//ARCHIVO DE RUTAS PARA PROJECT

'use strict'

var express = require('express')                                     //Inicia express
var ProjectController = require('../controllers/project.controller')    //IMPORTA objeto de controlador Projects
var CommentController = require('../controllers/comment.controller')    //Importa el objeto de controlador comment

var router = express.Router()                 //Manda a llamar a los métodos HTTP de express

//Middleware para subir archivos
var multipart = require('connect-multiparty')      //LLama a multiparty
var multipartMiddleware = multipart({ uploadDir: './uploads'})        //lugar donde se guardarán los archivos

router.get('/home', ProjectController.home)     //Se hace un metodo get y se realiza la acción de la función home en controaldor  
router.post('/test', ProjectController.test)    //Se hace un metodo post y se realiza la acción de la función test en controaldor 
router.post('/saveProject', ProjectController.saveProject)    //Se hace un metodo post y se realiza la acción de la función saveProject
router.get('/getProject/:id?', ProjectController.getProject)    //Se hace un metodo post y se realiza la acción de la función saveProject
router.get('/getAll', ProjectController.getAll)    //Se hace un metodo pogetst y se realiza la acción de la función saveProject
router.put('/updateProject/:id', ProjectController.updateProject)    //Se hace un metodo put y se realiza el update
router.delete('/deleteProject/:id', ProjectController.deleteProject)    //Se hace un metodo put y se realiza el update
router.post('/uploadImage/:id', multipartMiddleware, ProjectController.uploadImage)    //Se hace un metodo put y se realiza el update
                     //Esto solo sube a la carpeta lo que se envie
router.get('/getImage/:img', ProjectController.getImage)        //Ruta para obener imagen

router.post('/saveComment', CommentController.saveComment)

                               
module.exports = router                      //Se exporta
//NO OLVIDAR COLOCAR EN app.js