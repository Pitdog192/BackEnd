import Contenedor from '../../utils/Carrito.js';
//NECESARIO PARA USAR REQUIRE EN ECS6
import { createRequire } from 'module';
const require = createRequire(import.meta.url);


const Router = require('router') ;
const routerCarrito = Router();

let contenedor = new Contenedor('./utils/carrito.txt'); // constructor de la clase contenedor que maneja el archivo productos.txt
let carrito = await contenedor.manejarArchivo();  // lee el json de productos y lo convierte en un objeto javascript

routerCarrito.post('/', (req, res) => { //CREA UN CARRITO Y DEVUELVE SU ID
    res.json({

    })
})

routerCarrito.delete('/:id', (req, res)=> { //VACIA UN CARRITO Y LO ELIMINA
    res.json({

    })
})

routerCarrito.get('/:id/productos', (req, res) => { //me permite listar los productos del carrito
    res.json({

    })
})

routerCarrito.post('/:id/productos', (req, res) => { //para incorporar productos al carrito por su id de producto
    res.json({

    })
})

routerCarrito.delete('/:id/productos/:id_prod', (req, res) => { //eliminar un producto del carrito por su id de carrito y de producto
    res.json({

    })
})


export default routerCarrito;