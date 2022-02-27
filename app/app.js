const cards = document.getElementById('cards')
const items = document.getElementById('items')
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment()
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
let carrito = {}


document.addEventListener('DOMContentLoaded', () => {

    // console.log('es una de las pruebas');
    fetchData()
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
    }

});


items.addEventListener('click', e => {
    btnAccion(e)
})


cards.addEventListener('click', e => {
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

    cards.appendChild(fragment)

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

    pintarCarrito();

    console.log(carrito);

}

const pintarCarrito = () => {

    items.innerHTML = ''

    Object.values(carrito).forEach(producto => {

        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })

    items.appendChild(fragment)
    pintarFooter()
    localStorage.setItem('carrito', JSON.stringify(carrito));

}

const pintarFooter = () => {


    footer.innerHTML = ''
    if (Object.keys(carrito).length === 0) {

        footer.innerHTML = `<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>`
        return
    }

    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)

    const nPrecio = Object.values(carrito).reduce((acc, { cantidad, precio }) => acc + cantidad * precio, 0)
    console.log(nPrecio);
    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciar = document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
    })





    //console.log(nCantidad)




}

const btnAccion = e => {

    console.log(e.target);
    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad = carrito[e.target.dataset.id].cantidad + 1
        carrito[e.target.dataset.id] = {...producto }
        pintarCarrito()
    }
    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
            if (producto.cantidad === 0) {
                delete carrito[e.target.dataset.id]
            }
        pintarCarrito()


    }

    e.stopPropagation()

}