'use strict'

var Project = require('../models/projects')       //Tenemos que importar el modelo para crear métodos con el modelo
var fs = require('fs')                            //Libreria filesystem de nodeJS (sirve para borrar)
var path = require('path')           //Nos permite cargar rutas físicas

var controller = {                         //Creamos el controlador

    home: function(req, res){              //Creamos las funciones que reciban o envien datos
        return res.status(200).send({
            message:'Soy HOME'
        })
    },
    test: function(req, res){              //Método del test
        return res.status(200).send({
            message:'Soy TEST'
        })
    },

    //Guarda datos en la colección de projecto
    saveProject: function(req, res){            //Mérodo de saveProject
        var project = new Project()             //Creamos un objeto Projecto para darle propiedades

        var params = req.body                   //Captura de datos introducidos en el POST

        //Captura de datos en modelo
        project.name = params.name
        project.description = params.description
        project.category = params.category
        project.langs = params.langs
        project.year = params.year
        project.image = null

        project.save()                         //Gurda datos en la db
                //Esto es solo para tener una retro de lo obenido
                .then((projectStored) =>{             
                    
                    if(!projectStored) return res.status(404).send({mesagge: "No se ha guardado nada"})
                    return res.status(200).send({project: projectStored})
                })
                .catch((err) => {
                    return res.status(500).send({mesagge: "Error al guardar documento"})
                }) 
    },
    
    //Obtiene la colección de projecto
    getProject: function(req, res){
        var projectId = req.params.id       //Declara el id de los Params

        if(projectId == null) return res.status(200).send({message: "No se colocó id"})   //Revisa que no sea null

        Project.findById(projectId)                   //Con mongoose podemos buscar el id con (El id, funcion promesa)
                .then((project) =>{
                    if(!project) return res.status(404).send({mesagge: "No existe el documento"})  //Error si no coleccion existente
                    return res.status(200).send({project})   //Devuelve la colección project
                })
                .catch((err) => {
                    return res.status(500).send({message: "Error al cargar documento"})    //Error si no carga projecto
                })
    },

    //Función que obtiene todos los datos
    getAll: function(req,res){

        Project.find({}).sort("+year").exec()                               // find({Condicional WHERE})  Busca todo en el modelo Project
                        .then((projects) =>{
                            if(!projects) return res.status(404).send({mesagge: "No hay projectos"})  //No hay proyectos
                            return res.status(200).send({projects})   //Devuelve todas las colecciones
                        })
                        .catch(() => {
                            return res.status(500).send({message: "Error al cargar documento"})    //Error si no carga projecto
                        })
    },

    //Función para actualizar datos de la db Project
    updateProject: function(req, res){
        var projectId = req.params.id      //Recoger parámetro por la URL, por el post, captura dato en la url
        var update = req.body              //Captura del POST el el objeto ya acutalizado, los datos nuevos

        Project.findByIdAndUpdate(projectId, update)               //Recibe parametro del id para buscar, hace update
                .then((projectUpdated) => {
                    if(!projectUpdated) return res.status(404).send({mesagge: "No hay projecto para actualizar"})  //No hay proyectos
                    return res.status(200).send({project: projectUpdated})              //Sobre escribe los valores para actualizar
                })
                .catch(() => {
                    return res.status(500).send({message: "Error al actualizar"})    //Error al actualizar
                })
    },

    //Función para borrar datos
    deleteProject:function (req,res){
        var projectId = req.params.id

        Project.findByIdAndDelete(projectId)                    //Elimina el id introducido
                .then((projectDeleted) => {
                    if(!projectDeleted) return res.status(404).send({mesagge: "No hay projecto para eliminar"})  //No hay proyectos
                    return res.status(200).send({project: projectDeleted})              //Sobre escribe los valores para actualizar
                })
                .catch((err) => {
                    return res.status(500).send({message: "Error al borrar", err})    //Error al actualizar
                })
    },

    uploadImage: function (req, res){
        var projectId = req.params.id                 //Obtiene el id de la página
        var fileName = 'Imagen no subida...'          //Mensaje de imagen no subida

        if(req.files){
            var filePath = req.files.image.path       //Esta es la ruta del archivo
            var fileSplit = filePath.split("\\")      //Divide el nombre path por \\  para solamente sacar el nombre del archivo
            var fileName = fileSplit[1]               //Tomamos el nombre de la imagen para subirla a la db

            //Obtener extension del archivo
            var extSplit = fileName.split('\.')       //Divide del file name desde el punto y tener la extensión
            var fileExt = extSplit[1]                 //tomar solo la extensión

            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){   //Compara que sean exentiones válidas
                Project.findByIdAndUpdate(projectId, {image: fileName}, {new: true})     //Hace el update a la db para subir la imagen
                .then((projectUpdated) => {
                    if(!projectUpdated) return res.status(404).send({mesagge: "No hay upload"})   //Revisa que exista
                    return res.status(200).send({img: fileName, project: projectUpdated})     //Muestra en JSON el nombre del archivo
                })
                .catch(() => {
                    return res.status(404).send({ mesagge: 'Error'})                  //Captura el error
                })
            } else {
                fs.unlink(filePath, (err) =>{                                         //Elimina el archivo y no lo sube
                    return res.status(200).send({message: "La extensión no es válida"})
                })
            }
           
        } else {
            return res.status(200).send({ message: fileName})
        }
    },

    getImage: function(req, res){
        var file = req.params.img     //Se pasa el archivo imagen por url y se obtiene
        var path_file = './uploads/' + file     //El path con el archivo file seleccionado

        fs.exists(path_file, (exists) => {     //Revisa que exista en el filesystem el path introducido
                    if(exists){
                        return res.sendFile(path.resolve(path_file))   //regresa la imagen si existe
                    }else {
                        return res.status(200).send({message: 'There is no image'})
                    }
            })
    }

}


module.exports = controller              //exporta el controlador