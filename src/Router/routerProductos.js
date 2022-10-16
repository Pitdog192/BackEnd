import Contenedor from '../../utils/Contenedor.js';
import sesionMiddleware from '../Middlewares/sesionMiddle.js';
//NECESARIO PARA USAR REQUIRE EN ECS6
import { createRequire } from 'module';
const require = createRequire(import.meta.url);


const Router = require('router') ;
const routerProductos = Router();

let contenedor = new Contenedor('./utils/productos.txt'); // constructor de la clase contenedor que maneja el archivo productos.txt
let productos = await contenedor.manejarArchivo();  // lee el json de productos y lo convierte en un objeto javascript

routerProductos.get('/', ( req, res ) => { //devuelve todos los productos
    res.json(productos);
})

routerProductos.get('/:id', ( req, res )=>{ //devuelve un producto según su id 
    const pos = parseInt(req.params.id);
    const filtro = productos.some(producto => producto.id == pos);
    if(filtro){
        let busquedaProducto = productos.filter(producto => producto.id == pos)
        res.json({
            producto: busquedaProducto
        });
    } else {
        res.json({
            respuesta: "El producto no existe"
        })
    }
})

routerProductos.post('/', sesionMiddleware, ( req, res ) => { //recibe y agrega un producto y lo devuelve con el id asignado
    const productoBody = req.body;
    const {otorgado} = req;
    if(otorgado){
    let idAsignado = productos.length + 1;
    productoBody.id = idAsignado;
    (async () => await contenedor.save(productoBody))();
    res.json({
        idAsignado: idAsignado,
        productoGuardado: productoBody
    });
    } else {
        res.json({
            denied: "No tiene permisos"
        })
    }
})

routerProductos.put('/:id',sesionMiddleware, ( req, res ) => { //recibe y actualiza un producto segun su id
    const pos = parseInt(req.params.id);
    const modificacionProducto = req.body;
    const {otorgado} = req;
    const filtro = productos.some(producto => producto.id == pos);
    if(filtro && otorgado){
        (async () => await contenedor.modificarById(pos, modificacionProducto))();
        res.json({
            exito: "Producto modificado con éxito"
        })
    } else {
        res.json({
            error: "Producto no encontrado o no tiene permisos"
        })
    }
})

routerProductos.delete('/:id',sesionMiddleware, ( req, res ) => { // elimina un producto segun su id
    const pos = parseInt(req.params.id);
    const filtro = productos.some(producto => producto.id == pos);
    const {otorgado} = req;
    if(filtro && otorgado){
        (async () => await contenedor.deleteById(pos))();
        res.json({
            respuestaPos: "Producto eliminado con éxito"
        })
    } else {
        res.json({
            respuesta: `No se encontró el producto seleccionado con el id: ${pos} o no tiene permisos`
        })
    }
    

})

export default routerProductos;

