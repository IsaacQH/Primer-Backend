'use strict'

var controller = {                         //Creamos el controlador

    home: function(req, res){              //Creamos las funciones que reciban o envien datos
        return res.status(200).send({
            message:'Soy HOME'
        })
    },
    test: function(req, res){
        return res.status(200).send({
            message:'Soy TEST'
        })
    }
}


module.exports = controller              //exporta el controlador