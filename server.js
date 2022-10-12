import  express from 'express';
import routerProductos from './src/routerProductos.js';
import { createRequire } from 'module';

import Contenedor from './Contenedor.js';
let contenedor = new Contenedor('./productos.txt');
let productos = await contenedor.manejarArchivo();

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
app.use('/productos', routerProductos);

app.set('views', './views/pug');
app.set('view engine', 'pug');

let mensajes = [];

io.on('connection', socket => {
    console.log('Usuario conectado')
    socket.emit('productos', productos)
    socket.on('nuevoProducto', (nuevoProducto) => {
        (async () => await contenedor.save(nuevoProducto))();
        io.sockets.emit('productos', nuevoProducto);
    })
    socket.emit('mensajes', mensajes);
    socket.on('nuevoMensaje', mensaje =>{
        mensajes.push(mensaje);
        io.socket.emit('mensajes', mensajes)
    })
})

const server = httpServer.listen(port, () => console.log(`Server escuchando en el puerto: http://localhost:${port}`));
server.on('error', (error) => console.log(`Error: ${error}`));

