'use strict'

var Comment = require('../models/comment')       //Tenemos que importar el modelo para crear métodos con el modelo

var controller = {

    //Guarda datos en la colección de projecto
    saveComment: function(req, res){            //Mérodo de saveProject
        var comment = new Comment()             //Creamos un objeto Projecto para darle propiedades

        var params = req.body                  //Captura de datos introducidos en el POST

        //Captura de datos en modelo
        comment.text = params.text
        //console.log(comment)
        comment.save()                         //Gurda datos en la db
                //Esto es solo para tener una retro de lo obenido
                .then((commentStored) =>{             
                    
                    if(!commentStored) return res.status(404).send({mesagge: "No se ha guardado nada"})
                    return res.status(200).send({comment: commentStored})
                })
                .catch((err) => {
                    return res.status(500).send({mesagge: "Error al guardar comentario"})
                }) 
    }
}

module.exports = controller              //exporta el controlador