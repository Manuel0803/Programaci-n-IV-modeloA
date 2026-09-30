// src/modules/metricasCombinadas.js
// Problemática Lógica con datos combinados:
// 1. Usuarios inactivos: no tienen álbumes ni comentarios.
// 2. Proporción de comentarios de cada usuario sobre el total (ranking porcentual).
// 3. Ciudad que concentra más comentarios en total (cruzando usuarios y comentarios).

const { contarComentariosPorUsuario } = require("./metricasComentarios");


function usuariosInactivos(usuarios, albumes, comentarios) {
    return usuarios.filter(usuario => {
        const tieneAlbum = albumes.some(album => album.userId === usuario.id);
        const tieneComentario = comentarios.some(comentario => comentario.email === usuario.email);
        return !tieneAlbum && !tieneComentario;
    });
}

function proporcionComentarios(usuarios, comentarios) {
    const totalGeneral = comentarios.length;
    if (totalGeneral === 0) return [];
    const conteo = contarComentariosPorUsuario(comentarios);

    const ranking = usuarios.map(usuario => {
        const cantidad = conteo[usuario.email] || 0;
        const porcentaje = ((cantidad / totalGeneral) * 100).toFixed(2);

        return {
            usuario: usuario.name,
            email: usuario.email,
            comentarios: cantidad,
            porcentaje: `${porcentaje}%`
        };
    }); 

    return ranking.sort((a, b) => b.comentarios - a.comentarios);
}

function comentariosPorCiudad(usuarios, comentarios) {
    const conteoUsuario = contarComentariosPorUsuario(comentarios);

    return usuarios.reduce((acc, usuario)=>{
        const ciudad = usuario.address?.city || "Sin ciudad";
        const cantidadDeEsteUsuario = conteoUsuario[usuario.email] || 0;
        
        if (acc[ciudad]) {
            acc[ciudad] += cantidadDeEsteUsuario; 
        } else {
            acc[ciudad] = cantidadDeEsteUsuario;  
        }

        return acc;
    },{});
};


function ciudadConMasComentarios(usuarios, comentarios) {
    const conteo = comentariosPorCiudad(usuarios, comentarios);
    const ciudades = Object.keys(conteo);
    let ciudadGanadora = ciudades.length > 0 ? ciudades[0] : "Ninguna";
    let maximo = 0;

    for (const ciudad in conteo) {
        const cantidad = conteo[ciudad];
        if (cantidad > maximo) {
            maximo = cantidad;
            ciudadGanadora = ciudad;
        }
    }
    return {
        ciudad: ciudadGanadora,
        totalComentarios: maximo
    };
}

module.exports = {
    usuariosInactivos,
    proporcionComentarios,
    ciudadConMasComentarios
};