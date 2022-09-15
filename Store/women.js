

// Toogle Cart

$(document).ready(function () {
    $('#cart').click(function () {
        $('#myCart').slideToggle('slow');
        if (tbody.children.length > 0) {
            emptyTable.classList.add('d-none')
            orderBtn.classList.remove('d-none')
        } else {
            emptyTable.classList.remove('d-none')
            orderBtn.classList.add('d-none')
        }
    });
});



// Create Data


const clothRow = document.getElementById('cloth-row');
const sortName = document.getElementById('sortName');
const tbody = document.getElementById('tbody');
const emptyTable = document.getElementById('emptyTable');
const orderBtn = document.getElementById('orderBtn');
const placeOrder = document.getElementById('placeOrder');
const clearCart = document.getElementById('clearCart');

let count = 0;

// fetch Function for the json server
fetch("http://localhost:3000/womens-section")
    .then(response => response.json())
    .then(json => {
        json.map(data => {
            // console.log(data)
            clothRow.append(addRow(data.image, data.title, data.price));
        })
    })
    .catch(error => console.log(error));


// Fetch Cart Data from json Server
fetch("http://localhost:3000/women-cart")
    .then(response => response.json())
    .then(json => {
        json.map(data => {
            // console.log(data)
            tbody.append(getFromCart(data.id, data.image, data.title, data.price))
        })
    })
    .catch(err => console.log("Error: " + err));

function getFromCart(id, image, title, price) {
    const tr = document.createElement('tr');
    tr.classList.add('my-4', 'py-2')
    tr.innerHTML =
        `<td><p>${id}</p></td>
        <td><img width="70" src=${image}></td>
        <td><p>${title}</p></td>
        <td><p>${price}</p></td>
        <td><input type="number" style="outline: none; background: transparent; border: 1px solid white; color: white;"></td>
        <td><button id="liveToastBtn" onmouseover="this.style.backgroundColor = 'red'"
        onmouseout="this.style.backgroundColor = '#d62828'"
        class="cartRem btn btn-danger text-white" style="background-color: #d62828;">
            Remove From Cart
        </button>
    </td>
    `
    return tr;
}

function addRow(image, brand, price) {
    row = document.createElement('div');
    row.classList.add('col-lg-3', 'mt-4');
    row.style.height = '300px';

    row.innerHTML =
        `

    <div class="p-3 rounded-3 mt-4" style="border: 2px solid #003049; box-sizing: border-box; height: 300px;">
        <div class="w-100 text-center bg-white pb-0" style="height: 150px;">
            <img width="150" height="10"
                src="${image}"
                alt="Product Image" class="h-100 w-750">
        </div>

        <div class="d-flex flex-column">
            <p class="fw-bold fs-5 text-truncate">${brand}</p>
            <p class="fw-bold fs-6">Price: ₦${price}</span></p>
        </div>

        <div class="button">
            <button onmouseover="this.style.backgroundColor = 'red'" onmouseout="this.style.backgroundColor = '#d62828'" class="button btn btn-danger text-white" style="background-color: #d62828;"> Add To Cart</button>
        </div>
    </div>

    `

    // =============================== ADD TO CART ==================================================



    const cartBtn = document.querySelectorAll('button.button');
    const cartAdd = document.getElementById('cartAdd');
    cartAdd.innerText = tbody.children.length;

    // console.log(cartBtn)

    cartBtn.forEach((el, i) => {
        el.addEventListener('click', cartClick)
    })

    return row;
}


function cartClick(e) {
    e.preventDefault;
    emptyTable.classList.add('d-none')
    //  .classList.remove('d-none')
    let target = e.target;
    Swal.fire(
        'Nice!',
        'Your Order has been added to your cart!',
        'success'
    )
    count++;
    cartAdd.innerText = count;

    let cartItem = target.parentElement.parentElement.parentElement;
    console.log(cartItem)
    let title = cartItem.getElementsByClassName('fs-5')[0].innerText;
    let price = cartItem.getElementsByClassName('fs-6')[0].innerText;
    let image = cartItem.getElementsByTagName('img')[0].src;
    addToCart(title, price, image);
}

// Post Data To cart in JSON Server
function addToCart(title, price, image) {
    fetch("http://localhost:3000/women-cart", {
        method: "POST",
        body: JSON.stringify({
            title: title,
            price: price,
            image: image
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log("Error: " + err));

    console.log(tbody.childNodes)

}

let delCart = {
    apiUrl: "http://localhost:3000/women-cart/{id}",
    fetchStore: function (id) {
        let url = this.apiUrl.replace("{id}", id);
        fetch(url, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(res => {
                if (res.ok) {
                    Swal.fire(
                        'Successful!',
                        'The Item has been deleted from your cart!',
                        'success'
                    )
                }
                else {
                    Swal.fire(
                        'Sorry!',
                        'Something Went Wrong!',
                        'error'
                    )
                }
                return res
            })
            .catch(error => console.log(error));
    },

    searchbar: function (e) {
        let target = e.target;
        let idNum = target.parentElement.parentElement.firstElementChild.firstElementChild.innerText;
        this.fetchStore(idNum);
    }
}

tbody.addEventListener('click', (e) => {
    let target = e.target;
    if (target.tagName === 'BUTTON') {
        delCart.searchbar(e)
        target.parentElement.parentElement.remove();
        count--;
        cartAdd.innerText = count;
        console.log(count)
    }
});

placeOrder.addEventListener('click', () => {
    Swal.fire(
        'Congratulations!',
        'Your Order has been Placed!',
        'success'
    )
});


clearCart.addEventListener('click', () => {
    // fetch('http://localhost:3000/women-cart/1,2', {
    //     method: "DELETE",
    //     headers: {
    //         "Content-type": "application/json; charset=UTF-8"
    //     }
    // })
    //     .then(res => {
    //         if (res.ok) { alert("Delete request successful") }
    //         else { alert("Delete request unsuccessful") }
    //         return res
    //     })
    //     // .then(res => res.json())
    //     // .then(data => console.log(data))
    //     .catch(error => console.log(error));

    tbody.innerHTML = '';
    emptyTable.classList.remove('d-none');
    orderBtn.classList.add('d-none');
    count = 0;
    cartAdd.innerText = count;
});


// Search inputs

sortPrice = document.getElementById('sortPrice');
sortCat = document.getElementById('sortCat');


let store = {
    apiUrl: "http://localhost:3000/womens-section?q={search}",
    fetchStore: function (search) {
        let url = this.apiUrl.replace("{search}", search);
        fetch(url)
            .then(response => response.json())
            .then(json => {
                json.map(data => {
                    console.log(data)
                    clothRow.append(this.addRows(data.image, data.title, data.price))
                })
                    .catch(error => console.log(error));
            })
    },

    searchbar: function () {
        this.fetchStore(sortName.value)
    },

    addRows: function (image, brand, price) {
        row = document.createElement('div');
        row.classList.add('col-lg-3', 'mt-4');
        row.style.height = '300px';

        row.innerHTML =
            `
    
            <div class="p-3 rounded-3 mt-4" style="border: 2px solid #003049; box-sizing: border-box; height: 300px;">
                <div class="w-100 text-center bg-white pb-0" style="height: 150px;">
                    <img width="150" height="10"
                        src="${image}"
                        alt="Product Image" class="image h-100 w-750">
                </div>
    
                <div class="d-flex flex-column">
                    <p class="fw-bold fs-5 text-truncate">${brand}</p>
                    <p class="price fw-bold fs-6">Price: ₦${price}</span></p>
                </div>
    
                <div class="button">
                    <button onmouseover="this.style.backgroundColor = 'red'" onmouseout="this.style.backgroundColor = '#d62828'" class="button btn btn-danger text-white" style="background-color: #d62828;"> Add To Cart</button>
                </div>
            </div>
    
            `
        return row;
    }
}

sortName.addEventListener('keydown', (e) => {
    clothRow.innerHTML = '';
    setTimeout(() => {
        if (sortName.value == '') {
            clothRow.innerHTML = '';
            fetch("http://localhost:3000/womens-section")
                .then(response => response.json())
                .then(json => {
                    json.map(data => {
                        // console.log(data)
                        clothRow.append(addRow(data.image, data.title, data.price));
                    })
                })
                .catch(error => console.log(error));
        } else {
            store.searchbar()
        }
    }, 500)

});





// Search for Category
let catStore = {
    apiUrl: "http://localhost:3000/womens-section?category={category}",
    fetchStore: function (category) {
        let url = this.apiUrl.replace("{category}", category);
        fetch(url)
            .then(response => response.json())
            .then(json => {
                json.map(data => {
                    console.log(data)
                    clothRow.append(this.addRows(data.image, data.title, data.price))
                })
                    .catch(error => console.log(error));
            })
    },

    searchbar: function () {
        this.fetchStore(sortCat.value)
    },

    addRows: function (image, brand, price) {
        row = document.createElement('div');
        row.classList.add('col-lg-3', 'mt-4');
        row.style.height = '300px';

        row.innerHTML =
            `
    
            <div class="p-3 rounded-3 mt-4" style="border: 2px solid #003049; box-sizing: border-box; height: 300px;">
                <div class="w-100 text-center bg-white pb-0" style="height: 150px;">
                    <img width="150" height="10"
                        src="${image}"
                        alt="Product Image" class="image h-100 w-750">
                </div>
    
                <div class="d-flex flex-column">
                    <p class="brand fw-bold fs-5 text-truncate">${brand}</p>
                    <p class="price fw-bold fs-6">Price: ₦${price}</span></p>
                </div>
    
                <div class="button">
                    <button onmouseover="this.style.backgroundColor = 'red'" onmouseout="this.style.backgroundColor = '#d62828'" class="button btn btn-danger text-white" style="background-color: #d62828;"> Add To Cart</button>
                </div>
            </div>
    
            `
        return row;
    }
}

sortCat.addEventListener('keydown', (e) => {
    setTimeout(() => {
        clothRow.innerHTML = '';
        if (sortCat.value == '') {
            clothRow.innerHTML = '';
            fetch("http://localhost:3000/womens-section")
                .then(response => response.json())
                .then(json => {
                    json.map(data => {
                        // console.log(data)
                        clothRow.append(addRow(data.image, data.title, data.price));
                    })
                })
                .catch(error => console.log(error));
        } else {
            catStore.searchbar()
        }
    }, 500)

});



