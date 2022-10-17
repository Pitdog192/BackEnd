import fs from 'fs';

class Contenedor {
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo;
    };

    async manejarArchivo () {
        let contenido = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
        let objetoContenido = JSON.parse(contenido);
        return objetoContenido;
    }

    async save (producto) {
        let contenido = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
        let objetoContenido = JSON.parse(contenido);
        let fecha = new Date();
        let fechaCreacion = `${fecha.getDate()} ${fecha.getMonth()} ${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`;
        producto.fecha = fechaCreacion;
        let id = objetoContenido.length + 1;
        producto.id = parseInt(id);
        producto.precio = parseInt(producto.precio);
        objetoContenido.push(producto);
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(objetoContenido));
    }
    
    async getById (id){
        let contenido = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
        let objetoContenido = JSON.parse(contenido);
        let objetoFiltrado = objetoContenido.filter(objeto => objeto.id == id);
        return objetoFiltrado;
    }

    async getAll () {
        let contenido = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
        let objetoContenido = JSON.parse(contenido);
        return objetoContenido;
    }

    async deleteById (id){
        let contenido = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
        let objetoContenido = JSON.parse(contenido);
        let borradoObjeto = objetoContenido.filter(producto => producto.id != id);
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(borradoObjeto));
    }

    async deleteAll (){
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify([]));
    }

    async modificarById (idParams, productoModificado) {
        let contenido = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
        let objetoContenido = JSON.parse(contenido);
        let filtro = objetoContenido.some(producto => producto.id == idParams);
        let fecha = new Date();
        let fechaCreacion = `${fecha.getDate()} ${fecha.getMonth()} ${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`;
        productoModificado.fecha = fechaCreacion;
        let modificacionArrayProductos = [];
        if(filtro){
            productoModificado.id = idParams;
            let idModificado = idParams - 1;
            modificacionArrayProductos = objetoContenido.fill(productoModificado, idModificado, idParams);
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(modificacionArrayProductos));
        }
    }
};

export default Contenedor
