const { guardaDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, listarTareasPorCompletar } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

require('colors');

console.clear();

const main = async() => {

    let opt = '';
    const tareas =  new Tareas();

    const tareasDB = leerDB();

    if(tareasDB){ // cargar tareas
        tareas.cargarTareasFromArr(tareasDB);
    }

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1': // Crear nueva tarea
                const desc = await leerInput('Descripción:');
                tareas.crearTarea(desc);
            break;

            case '2': // Listar todas las tareas
                tareas.listadoCompleto();
            break;

            case '3': // Listar tareas completadas
                tareas.listaTareasCompletadas();
            break;

            case '4': // Listar tareas pendientes
                tareas.listaTareasCompletadas(false);
            break;

            case '5': // Complentar|Pendiente Tareas
                const ids = await listarTareasPorCompletar( tareas.listadoArr );
                tareas.toogleCompletadas(ids);
            break;

            case '6': // Borrar Tareas
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if( id !== '0' ){
                    const ok = await confirmar('¿Estas seguro de Borrar?');
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada correctamente');
                    }
                }
            break;
        }

         guardaDB( tareas.listadoArr );
        await pausa();

    } while (opt !== '0');
}

main();