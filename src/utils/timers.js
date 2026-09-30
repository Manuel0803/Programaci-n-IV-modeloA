// src/utils/timers.js
// Objetivo: Implementar utilidades que demuestren el manejo de Timers y Event Loop.
// Ejemplos útiles: delays basados en Promesas con setTimeout, simulación de tiempos de espera en reportes, etc.

/**
 * @param {number} ms - milisegundos a esperar
 * @returns {Promise<void>}
 */
function esperar(ms) {
    return new Promise(function(resolve) {
        setTimeout(resolve, ms);
    });
}

module.exports = {
    esperar
};