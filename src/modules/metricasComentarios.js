// src/modules/metricasComentarios.js
// Problemática Comentarios:
// 1. Identificar usuarios que más comentan y generar ranking Top 5.
// 2. Detectar comentarios duplicados (mismo email y contenido).
// 3. Encontrar comentarios que contengan palabra clave (ej: "dolor").

function contarComentariosPorUsuario(comentarios){
    return comentarios.reduce((acc, comentario) =>{
        const userEmail = comentario.email

        if(acc[userEmail]){
            acc[userEmail] += 1;
        }else {
            acc[userEmail] = 1;
        };
        return  acc;
    },{});
}

function usuariosConMasComentarios(comentarios){
    const conteo = contarComentariosPorUsuario(comentarios)

    const lista = Object.keys(conteo).map(email => ({
        email: email,
        cantidad: conteo[email]
    }));

    
    return lista
    .sort((a, b) => b.cantidad - a.cantidad) 
    .slice(0,5);
};

function detectarComentariosDuplicados(comentarios) {
    const libreta = new Set();
    const duplicados = [];

    for (const comentario of comentarios) {
        const huella = `${comentario.email}|${comentario.body}`;
        if (libreta.has(huella)) {
            duplicados.push(comentario); 
        } else {
            libreta.add(huella); 
        }
    }

    return duplicados;
}


function contienePalabra(comentarios, palabra){
    return comentarios.filter(comentario => comentario.contienePalabra(palabra));
}

module.exports = {
    contarComentariosPorUsuario,
    usuariosConMasComentarios,
    detectarComentariosDuplicados,
    contienePalabra
}