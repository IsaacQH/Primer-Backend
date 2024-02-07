'use strict'

var Project = require('../models/projects')       //Tenemos que importar el modelo para crear métodos con el modelo

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
    }

}


module.exports = controller              //exporta el controlador