// src/modules/metricasAlbumes.js
// Problemática Álbumes:
// 1. Listar álbumes de un usuario específico.
// 2. Detectar cuál es el usuario con más álbumes creados.
// 3. Generar informe de promedio de álbumes por usuario.

function listarAlbumsDeUsuario(albumes, userId){
    return albumes.filter(album => album.userId === userId);
};

function contarAlbumesPorUsuario(albumes){
    return albumes.reduce((acc, album)=>{
        const userId = album.userId;

        if(acc[userId]){
            acc[userId] +=1;
        } else {
            acc[userId] = 1;
        };

        return acc;
    },{});
};

function usuarioConMasAlbumes(albumes, usuarios){
    const conteo = contarAlbumesPorUsuario(albumes)

    let usuarioGanadorId = null;
    let maximo = 0;

    for (const userId in conteo){
        const cantidad = conteo[userId]

        if(cantidad > maximo){
            maximo = cantidad;
            usuarioGanadorId = userId;
        };
    };
    const usuarioEncontrado = usuarios ? usuarios.find(u => u.id === Number(usuarioGanadorId)) : null;

    return {
        album: maximo,
        usuario: usuarioEncontrado ? usuarioEncontrado.name : `Usuario ID ${usuarioGanadorId}`
    }
};

function PromedioAlbumesPorUsuario(albumes, usuarios){
    const cantAlbumes = albumes.length;
    const cantUsuarios = usuarios.length;

    if (cantUsuarios === 0) {
        return 0;
    }

    const promedio = cantAlbumes / cantUsuarios;

    return {
        totalAlbumes: cantAlbumes,
        totalUsuarios: cantUsuarios,
        promedio: Number(promedio.toFixed(2))
    };

};

module.exports = {
    listarAlbumsDeUsuario,
    contarAlbumesPorUsuario,
    usuarioConMasAlbumes,
    PromedioAlbumesPorUsuario
};