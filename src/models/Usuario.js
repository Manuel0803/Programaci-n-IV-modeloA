// src/models/Usuario.js
// Objetivo: Definir la entidad Usuario con funciones constructoras / prototipos o clases.
// Validar datos críticos (ej. nombre, email, estructura de address: calle, ciudad, zip).

function Usuario(datos = {}) {
    if (!datos.id || !datos.name || !datos.email) {
        throw new Error("Usuario inválido: faltan campos críticos.");
    };
    this.id = datos.id;
    this.name = datos.name;
    this.email = datos.email;
    this.address = datos.address || {};
    this.company = datos.company || {};
};

    Usuario.prototype.tieneDireccionCompleta = function () {
        return Boolean(
            this.address.street &&
            this.address.city &&
            this.address.zipcode
        );
    };

    module.exports = Usuario;
