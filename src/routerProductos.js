import Contenedor from '../Contenedor.js';
//NECESARIO PARA USAR REQUIRE EN ECS6
import { createRequire } from 'module';
const require = createRequire(import.meta.url);


const Router = require('router') 
const routerProductos = Router();

let contenedor = new Contenedor('./productos.txt'); // constructor de la clase contenedor que maneja el archivo productos.txt
let productos = await contenedor.manejarArchivo();  // lee el json de productos y lo convierte en un objeto javascript

routerProductos.get('/', ( req, res ) => { //devuelve todos los productos
    res.render('productos', {productos})
})

routerProductos.get('/:id', ( req, res )=>{ //devuelve un producto según su id 
    const pos = parseInt(req.params.id)
    let filtro = productos[pos - 1];
    res.render('productos', {filtro})
})

routerProductos.post('/', ( req, res ) => { //recibe y agrega un producto y lo devuelve con el id asignado
    const productoBody = req.body;
    (async () => await contenedor.save(productoBody))()
    res.redirect('../')
})

// routerProductos.put('/:id', ( req, res ) => { //recibe y actualiza un producto segun su id
//     const pos = parseInt(req.params.id);
// })

// routerProductos.delete('/:id', ( req, res ) => { // elimina un producto segun su id
//     const pos = parseInt(req.params.id)
// })

export default routerProductos;

