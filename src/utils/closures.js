// src/utils/closures.js
// Objetivo: Implementar lógica que aproveche Closures (funciones que recuerdan su ámbito léxico).
// Ejemplos útiles: generadores de filtros con criterios precargados, contadores acumulativos privados, etc.

function crearFiltro(propiedad, valorEsperado){
    return function(elemento){
        return elemento[propiedad] === valorEsperado;
    };
};

function crearContador(valorInicial = 0) {
    let cuenta = valorInicial;
    return {
        incrementar: function() {
            cuenta++;
            return cuenta;
        },
        obtenerTotal: function() {
            return cuenta;
        }
    };
}

module.exports = {
    crearFiltro,
    crearContador
};