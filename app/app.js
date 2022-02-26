const items = document.getElementById('items');
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment()
let carrito = {}


document.addEventListener('DOMContentLoaded', () => {

    console.log('es una de las pruebas');
    fetchData()

});

items.addEventListener('click', e => {
    addCarrito(e);
})

const fetchData = async() => {

    try {
        const res = await fetch('api.json')
        const data = await res.json()
        pintarcards(data);



    } catch (error) {

    }


}

const pintarcards = data => {
    //console.log('fsd')
    data.forEach(element => {

        templateCard.querySelector('h5').textContent = element.title
        templateCard.querySelector('p').textContent = element.precio
        templateCard.querySelector('img').setAttribute('src', element.thumbnailUrl)
        templateCard.querySelector('.btn-dark').dataset.id = element.id
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    });

    items.appendChild(fragment)

}

const addCarrito = e => {
    console.log(e.target);
    console.log(e.target.classList.contains('btn-dark'));
    if (e.target.classList.contains('btn-dark')) {

        //console.log()
        setCarrito(e.target.parentElement)

    }
    e.stopPropagation()
}

const setCarrito = obj => {

    const producto = {

        id: obj.querySelector('.btn-dark').dataset.id,
        title: obj.querySelector('h5').textContent,
        precio: obj.querySelector('p').textContent,
        cantidad: 1
    }

    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = {...producto }

    console.log(carrito);

}