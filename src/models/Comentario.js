// src/models/Comentario.js
// Objetivo: Definir la entidad Comentario y sus validaciones (postId, email, body, etc.).

function Comentario(datos = {}){
    if(!datos.postId || !datos.id || !datos.name || !datos.email || !datos.body){
        throw new Error("Datos criticos faltantes.")
    };
    this.postId = datos.postId
    this.id = datos.id
    this.name = datos.name
    this.email = datos.email
    this.body = datos.body



};

    Comentario.prototype.contienePalabra = function(palabra){
        return this.body.toLowerCase().includes(palabra.toLowerCase());
    };

module.exports = Comentario;