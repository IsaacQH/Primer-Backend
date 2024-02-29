'use strict'

var mongoose = require('mongoose')      //Cargamos mongoose porque maneja los modelos
var Schema = mongoose.Schema            //definismos el esquema

var CommentSchema = Schema({            //Objeto molde que usaremos para crear los doc con esta base de datos
    text:String
})            

module.exports = mongoose.model('Comment', CommentSchema)           //Exporta el modelo creado con mongoose
//                           (Nombre de la colección ,  Schema )   Comment => comments