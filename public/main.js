const socket = io.connect();

socket.on('productos', producto => {
    console.log(producto)
    renderProductos(producto)
});

const enviarProducto = () => {
    let nuevoProducto = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumnail: document.getElementById('thumnail').value
    }
    socket.emit('nuevoProducto', nuevoProducto)
    document.getElementById('title').value = '';
    document.getElementById('price').value = '';
    document.getElementById('thumnail').value = '';
    return false;
}

function renderProductos(productos){
    let html = productos.map((producto) => {
        return(
            `<tr>
                <th scope="row"> ${producto.id}</th>
                <td> ${producto.title}</td>
                <td> ${producto.price}</td>
                <td><img src=${producto.thumnail}></td>
            </tr>`
        )
    }).join(" ");
    document.getElementById('productos').innerHTML = html;
}
