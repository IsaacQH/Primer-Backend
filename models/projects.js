'use strict'

var mongoose = require('mongoose')      //Cargamos mongoose porque maneja los modelos
var Schema = mongoose.Schema            //definismos el esquema

var ProjectSchema = Schema({            //Objeto molde que usaremos para crear los doc con esta base de datos
    name:String,
    description:String,
    category:String,
    langs:[String],
    year:Number
})            

module.exports = mongoose.model('Project', ProjectSchema)           //Exporta el modelo creado con mongoose
//                           (Nombre de la colección ,  Schema )   Project => projects