import  express from 'express';
import routerProductos from './src/routerProductos.js';

//NECESARIO PARA USAR __dirname 
import path from 'path';
import { fileURLToPath } from 'url';

//IMPORT PARA HANDLEBARS
import { engine } from 'express-handlebars';

//NECESARIO PARA USAR __dirname 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.port || 8080;

app.use(express.json());
app.use(express.urlencoded( { extended:true }) );
app.use(express.static('public'));
app.use('/productos', routerProductos);

//EJS
app.set('views', './views/ejs')
app.set('view engine', 'ejs');

// HANDLEBARS
// app.engine('hbs', engine({
//     extname: '.hbs',
//     defaultLayout: 'productos.hbs',
//     layoutsDir: __dirname + '/views/hbs',
// }));
// app.set('views', './views/hbs');
// app.set('view engine', 'hbs');

// PUG
// app.set('views', './views/pug');
// app.set('view engine', 'pug');

const server = app.listen(port, () => console.log(`Server escuchando en el puerto: ${port}`));
server.on('error', (error) => console.log(`Error: ${error}`));