// src/services/apiService.js
// Objetivo: Manejar las peticiones asincrónicas a JSONPlaceholder (fetch, async/await, try/catch).
// Endpoints:
// - https://jsonplaceholder.typicode.com/users
// - https://jsonplaceholder.typicode.com/comments
// - https://jsonplaceholder.typicode.com/albums


const URL_BASE = "https://jsonplaceholder.typicode.com";

async function pedirDatos(endpoint) {
    const url = `${URL_BASE}${endpoint}`;

    try {
        const respuesta = await fetch(url);

        if (!respuesta.ok){
            throw new Error(`Error HTTP en ${endpoint}: Código ${respuesta.status}`)
        };

        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error(`[Error en servicio API - ${endpoint}]:`, error.message);
        throw error;
    }
}

    async function obtenerUsuarios() {
    return await pedirDatos("/users");
};
    async function obtenerComentarios() {
    return await pedirDatos("/comments");
};
    async function obtenerAlbumes() {
    return await pedirDatos("/albums");
};

module.exports = {
    obtenerUsuarios,
    obtenerComentarios,
    obtenerAlbumes
};
