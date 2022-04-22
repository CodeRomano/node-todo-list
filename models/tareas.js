const Tarea = require("./tarea");

class Tareas {

    _listado = {};

    get listadoArr() {
        const listado = [];

        Object.keys(this._listado).forEach( key => {
            // console.log(key);
            const tarea = this._listado[key];
            listado.push(tarea);
        } )

        return listado;
    }

    constructor() {
        this._listado = {}
    }

    borrarTarea ( id='' ) {
        if (this._listado[id]){
            delete this._listado[id];
        }else{
            console.log('La Tarea no existe');
        }
    }
 
    cargarTareasFromArr( tareas = [] ){
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        } )
    }

    crearTarea( desc = '' ){
        const tarea =  new Tarea(desc);
        this._listado[tarea.id]=tarea;
    }

    listadoCompleto(){
        this.listadoArr.forEach( (tarea, i) => {
            const idx = `${ i + 1 }.`.green;
            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn )
                            ? 'Completada'.green
                            : 'Pendiente'.red;
            const fecha = ( completadoEn )
                            ? '- '+completadoEn
                            : '';                
            
            console.log( `${idx} ${ desc} :: ${estado} ${fecha}`);

        } )
    }

    listaTareasCompletadas( completadas = true ){
        let contador = 0;
        this.listadoArr.forEach( (tarea) => {
            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn )
                            ? 'Completada'.green
                            : 'Pendiente'.red;
            const fecha = ( completadoEn )
                            ? completadoEn
                            : '';

            if(completadoEn !== null && completadas){
                contador += 1;
                console.log( `${(contador + '.').green} ${ desc} :: ${estado} - ${fecha}`);
            }else if(completadoEn === null && completadas == false){
                contador += 1;
                console.log( `${(contador + '.').green} ${ desc} :: ${estado}`);
            }    
    })}

    toogleCompletadas ( ids = [] ) {

        ids.forEach( id => {
            const tarea = this._listado[id];
            if( !tarea.completadoEn ){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach( tarea => {
            if( !ids.includes(tarea.id) ){
                this._listado[tarea.id].completadoEn = null;
            }
        } )

    }
}

module.exports = Tareas;