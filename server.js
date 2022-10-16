import  express from 'express';
import routerProductos from './src/Router/routerProductos.js';
import routerCarrito from './src/Router/routerCarrito.js';
import { createRequire } from 'module';

import Contenedor from './utils/Contenedor.js';
let contenedor = new Contenedor('./utils/productos.txt');
let contenedorProductos = await contenedor.manejarArchivo();

let contenedorMensaje = new Contenedor('./utils/mensajes.txt');
let lecturaMensajes = await contenedorMensaje.manejarArchivo();

const require = createRequire(import.meta.url);
const { Server: HttpServer}  = require('http');
const { Server: IOServer} = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const port = process.env.port || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static('public'));
app.use('/productos', routerProductos); //RUTA DE PRODUCTOS
app.use('/carrito', routerCarrito); // RUTA DE CARRITO
// app.set('views', './views/pug');
// app.set('view engine', 'pug');

let mensajes = [];
lecturaMensajes.forEach(mensaje => {
    mensajes.push(mensaje)
});

let productos = [];
contenedorProductos.forEach(producto => {
    productos.push(producto)
});

// SOCKETS-------------------------------
io.on('connection', socket => {
    console.log('Usuario conectado');

    socket.emit('productos', productos);
    socket.emit('mensajes', mensajes);

    socket.on('nuevoProducto', nuevoProducto => {
        nuevoProducto.id = productos.length + 1;
        productos.push(nuevoProducto);
        (async () => await contenedor.save(nuevoProducto))();
        io.sockets.emit('productos', productos);
    })
    
    socket.on('nuevoMensaje', mensaje =>{
        mensaje.id = mensajes.length + 1;
        mensajes.push(mensaje);
        (async () => await contenedorMensaje.save(mensaje))();
        io.sockets.emit('mensajes', mensajes);
    })
})
// FIN DE SOCKETS-------------------------

const server = httpServer.listen(port, () => console.log(`Server escuchando, http://localhost:${port}`));
server.on('error', (error) => console.log(`Error: ${error}`));




