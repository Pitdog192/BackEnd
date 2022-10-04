import fs from 'fs';

class Contenedor {
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo
    };

    async manejarArchivo () {
        let contenido = await fs.promises.readFile(this.nombreArchivo, 'utf-8')
        let objetoContenido = JSON.parse(contenido)
        return objetoContenido
    }

    async save (producto) {
        let contenido = await fs.promises.readFile(this.nombreArchivo, 'utf-8')
        let objetoContenido = JSON.parse(contenido)
        let id = objetoContenido.length + 1;
        producto.id = id;
        console.log(`Id asignado: ${id}`)
        objetoContenido.push(producto)
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(objetoContenido))
    }
    
    async getById (id){
        let contenido = await fs.promises.readFile(this.nombreArchivo, 'utf-8')
        let objetoContenido = JSON.parse(contenido)
        let objetoFiltrado = objetoContenido.filter(objeto => objeto.id == id)
        return objetoFiltrado
    }

    async getAll () {
        let contenido = await fs.promises.readFile(this.nombreArchivo, 'utf-8')
        let objetoContenido = JSON.parse(contenido)
        return objetoContenido
    }

    async deleteById (id){
        let contenido = await fs.promises.readFile(this.nombreArchivo, 'utf-8')
        let objetoContenido = JSON.parse(contenido)
        let borradoObjeto = objetoContenido.filter(producto => producto.id != id)
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(borradoObjeto))
    }

    async deleteAll (){
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify([]))
    }
};

export default Contenedor
