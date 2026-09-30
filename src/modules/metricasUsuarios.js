// src/modules/metricasUsuarios.js
// Problemática Usuarios:
// 1. Buscar usuarios según criterios (ej: nombre de compañía o ciudad).
// 2. Detectar usuarios con direcciones incompletas (calle, ciudad, código postal).
// 3. Analizar y reportar qué compañía tiene más usuarios asociados.

function buscarPorCiudad(usuarios, ciudadBuscada){
    return usuarios.filter(usuario => usuario.address.city === ciudadBuscada);
};

function buscarPorCompania(usuarios, companiaBuscada){
    return usuarios.filter(usuario => usuario.company.name === companiaBuscada);
};

function detectarDireccionesIncompletas(usuarios){
    return usuarios.filter(usuario => !usuario.tieneDireccionCompleta())
};

function contarUsuariosPorCompania(usuarios){
    return usuarios.reduce((acc, usuario)=>{
        const compania = usuario.company?.name || "Sin compañia";

        if(acc[compania]){
            acc[compania] += 1;
        } else {
            acc[compania] = 1;
        };

        return acc;
    },{});
};

function companiaConMasUsuarios(usuarios){
    const conteo = contarUsuariosPorCompania(usuarios);
    
    let companiaMayor = "";
    let maximo = 0;

    for (const compania in conteo){
        const cantidad = conteo[compania];

        if(cantidad > maximo){
            maximo = cantidad;
            companiaMayor = compania;

        };
    };
    return {
        compania: companiaMayor,
        cantidad: maximo
    };
};

module.exports  = {
    buscarPorCiudad,
    buscarPorCompania,
    detectarDireccionesIncompletas,
    contarUsuariosPorCompania,
    companiaConMasUsuarios
};

