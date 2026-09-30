// 1. Modelos (Constructores y Prototipos)
const Usuario = require("./src/models/Usuario");
const Album = require("./src/models/Album");
const Comentario = require("./src/models/Comentario");

// 2. Módulos de Métricas
const metricasUsuarios = require("./src/modules/metricasUsuarios");
const metricasAlbumes = require("./src/modules/metricasAlbumes");
const metricasComentarios = require("./src/modules/metricasComentarios");
const metricasCombinadas = require("./src/modules/metricasCombinadas");

// 3. Servicio de API (Asincronía y Fetch)
const apiService = require("./src/services/apiService");

// 4. Utilidades (Timers, Event Loop y Closures)
const { esperar } = require("./src/utils/timers");
const { crearContador, crearFiltro } = require("./src/utils/closures");

async function IniciarAplicacion() {
    console.log("==================================================");
    console.log("       INICIANDO SISTEMA DE ANÁLISIS DE DATOS      ");
    console.log("==================================================\n");

    const contadorMetricas = crearContador();

    try{
        console.log("Conectando con JSONPlaceholder...")
        await esperar(500);

        const datosUsuarios = await apiService.obtenerUsuarios();
        const datosAlbumes = await apiService.obtenerAlbumes();
        const datosComentarios = await apiService.obtenerComentarios();

        const usuarios = datosUsuarios.map(u => new Usuario(u));
        const albumes = datosAlbumes.map(a => new Album(a));
        const comentarios = datosComentarios.map(c => new Comentario(c));

        console.log(`    Datos cargados correctamente:`);
        console.log(`   - Usuarios:    ${usuarios.length}`);
        console.log(`   - Álbumes:     ${albumes.length}`);
        console.log(`   - Comentarios: ${comentarios.length}\n`);

        //----------------------------------------------------------------------------------------------------
        console.log(" 1. ANÁLISIS DE USUARIOS");
        console.log("--------------------------------------------------");

        const direccionesIncompletas = metricasUsuarios.detectarDireccionesIncompletas(usuarios);
        contadorMetricas.incrementar();
        console.log(`• Usuarios con dirección incompleta: ${direccionesIncompletas.length}`);

        const topCompania = metricasUsuarios.companiaConMasUsuarios(usuarios);
        contadorMetricas.incrementar();
        console.log(`• Compañía con más usuarios: ${topCompania.compania} (${topCompania.cantidad} empleados)`);

        const filtroRosario = crearFiltro("id", 1);
        const usuarioUno = usuarios.filter(filtroRosario);
        console.log(`• Filtro por Closure (Usuario ID 1): ${usuarioUno[0]?.name}`);
        console.log("");


        //----------------------------------------------------------------------------------------------------
        console.log(" 2. ANÁLISIS DE ÁLBUMES");
        console.log("--------------------------------------------------");
        const topAlbumes = metricasAlbumes.usuarioConMasAlbumes(albumes, usuarios);
        contadorMetricas.incrementar();
        console.log(`• Usuario con más álbumes: ${topAlbumes.usuario} (${topAlbumes.album} álbumes)`);

        const promedioAlbumes = metricasAlbumes.PromedioAlbumesPorUsuario(albumes, usuarios);
        contadorMetricas.incrementar();
        console.log(`• Promedio de álbumes por usuario: ${promedioAlbumes.promedio} (Total: ${promedioAlbumes.totalAlbumes} álbumes)`);
        console.log("");


        // ------------------------------------------------------------------------------------------------
        console.log(" 3. ANÁLISIS DE COMENTARIOS");
        console.log("--------------------------------------------------");
        const topComentadores = metricasComentarios.usuariosConMasComentarios(comentarios);
        contadorMetricas.incrementar();
        console.log("• Top 5 usuarios que más comentan:");
        topComentadores.forEach((item, index) => {
            console.log(`   ${index + 1}. ${item.email} -> ${item.cantidad} comentarios`);
        });
        const duplicados = metricasComentarios.detectarComentariosDuplicados(comentarios);
        contadorMetricas.incrementar();
        console.log(`• Comentarios duplicados detectados: ${duplicados.length}`);
        console.log("");


        // ---------------------------------------------------------------------------------------------
        console.log(" 4. ANÁLISIS COMBINADO (CRUCE DE ENTIDADES)");
        console.log("--------------------------------------------------");
        const inactivos = metricasCombinadas.usuariosInactivos(usuarios, albumes, comentarios);
        contadorMetricas.incrementar();
        console.log(`• Usuarios inactivos (sin álbumes ni comentarios): ${inactivos.length}`);
        const topCiudad = metricasCombinadas.ciudadConMasComments ? metricasCombinadas.ciudadConMasComments(usuarios, comentarios) : metricasCombinadas.ciudadConMasComentarios(usuarios, comentarios);
        contadorMetricas.incrementar();
        console.log(`• Ciudad con mayor actividad de comentarios: ${topCiudad.ciudad} (${topCiudad.totalComentarios} comentarios)`);
        console.log("");

        
        // -------------------------------------------------------------------------------------------
        console.log("==================================================");
        console.log(` TOTAL DE MÉTRICAS AUDITADAS (VÍA CLOSURE): ${contadorMetricas.obtenerTotal()}`);
        console.log("==================================================\n");



    }catch(error){
        console.error("Ocurrió un error crítico en la aplicación:", error.message);
    };
}

IniciarAplicacion();

