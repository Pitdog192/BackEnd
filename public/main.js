const socket = io.connect();

socket.on('productos', producto => {
    renderProductos(producto);
});

socket.on('mensajes', mensaje => {
    renderMensajes(mensaje);
})

function renderMensajes(mensajes){
    let html = mensajes.map((mensaje) => {
        return(
            `<tr>
                <th scope="row"> ${mensaje.id}</th>
                <td class="fontFecha"> ${mensaje.fecha}</td>
                <td class="fontEmail"> ${mensaje.email}</td>
                <td class="fontTexto">${mensaje.texto}</td>
            </tr>`
        );
    }).join(" ");
    document.getElementById('mensajes').innerHTML = html;
}

function renderProductos(productos){
    let html = productos.map((producto) => {
        return(
            `<tr>
                <th scope="row"> ${producto.id}</th>
                <td> ${producto.title}</td>
                <td> $${producto.price}</td>
                <td><img src=${producto.thumnail}></td>
            </tr>`
        );
    }).join(" ");
    document.getElementById('productos').innerHTML = html;
}


const enviarMensaje = () => {
    let f = new Date();
    let fecha = `${f.getDate()}/${f.getMonth()}/${f.getFullYear()} ${f.getHours()}:${f.getMinutes()}:${f.getSeconds()}`;
    let mensajeNuevo = {
        email: document.getElementById('email').value,
        fecha: fecha,
        texto: document.getElementById('mensaje').value
    };
    socket.emit('nuevoMensaje', mensajeNuevo);
    document.getElementById('email').value = '';
    document.getElementById('mensaje').value = '';    
    return false;
}

const enviarProducto = () => {
    let nuevoProducto = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumnail: document.getElementById('thumnail').value
    };
    socket.emit('nuevoProducto', nuevoProducto)
    document.getElementById('title').value = '';
    document.getElementById('price').value = '';
    document.getElementById('thumnail').value = '';
    return false;
}