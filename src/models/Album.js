// src/models/Album.js
// Objetivo: Definir la entidad Album y sus validaciones (userId, title, etc.).

function Album(datos = {}){
    if(!datos.id || !datos.userId || !datos.title){
        throw new Error("Error datos criticos faltantes.")
    }

    this.id = datos.id
    this.userId = datos.userId
    this.title = datos.title
};

module.exports = Album;