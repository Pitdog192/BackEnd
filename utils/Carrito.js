import fs from 'fs'; 

class Carrito {
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo;
    }

    async manejarArchivo () { // LEE TODOS LOS CARRITOS
        let contenido = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
        let objetoContenido = JSON.parse(contenido);
        return objetoContenido;
    }

    async save (producto) { // CREA UN CARRITO 
        let contenido = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
        let objetoContenido = JSON.parse(contenido);
        let fecha = new Date();
        let fechaCreacion = `${fecha.getDate()} ${fecha.getMonth()} ${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`;
        producto.fecha = fechaCreacion;
        let id = objetoContenido.length + 1;
        producto.id = id;
        producto.price = parseInt(producto.price);
        objetoContenido.push(producto);
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(objetoContenido));
    }

    async deleteById (id){ // BORRARIA UN CARRITO POR ID
        let contenido = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
        let objetoContenido = JSON.parse(contenido);
        let borradoObjeto = objetoContenido.filter(producto => producto.id != id);
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(borradoObjeto));
    }

    async deleteAll (){ //BORRARIA TODOS LOS CARRITOS
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify([]));
    }
}

export default Carrito;