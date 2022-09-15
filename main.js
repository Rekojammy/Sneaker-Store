

// Toogle Cart

$(document).ready(function () {

    $('.more').click(function (e) {
        e.preventDefault();
        $(this).text(function (i, t) {
            return t == 'See Less Collection' ? 'See All Collection' : 'See Less Collection';
        })

        if (clothRow.style.height == '350px')
            $('#clothRow').animate({
                height: "100%"
            }, 'slow');
        else
            $('#clothRow').animate({
                height: "350px"
            }, 'slow');
    });

    $('#modClose').click(function () {
        $(this).parent().parent().parent().parent().animate({
            opacity: '0'
        }, 'slow');
        $(this).parent().parent().parent().parent().hide();
    });



});






// Create Data


const clothRow = document.getElementById('clothRow');
const sortName = document.getElementById('sortName');
const favBody = document.getElementById('favBody');
const emptyTable = document.getElementById('emptyTable');
const orderBtn = document.getElementById('orderBtn');
const placeOrder = document.getElementById('placeOrder');
const clearCart = document.getElementById('clearCart');

let count = 0;
// document.body.style.background = 'red'

// fetch Function for the json server

fetch("http://localhost:3000/sneakers")
    .then(response => response.json())
    .then(json => {
        json.map(data => {
            // console.log(data)
            clothRow.append(addRow(data.image, data.brand, data.price, data.description));
        })
    })
    .catch(error => console.log(error));


function addRow(image, brand, price, description) {
    row = document.createElement('div');
    row.classList.add('col-lg-3', 'mt-4');
    row.style.height = '300px';

    row.innerHTML =
        `
            <div class="p-3" style="box-sizing: border-box; height: 300px;">
                <div class="border rounded-3 bg-white p-1 w-100" style="width: 300px;">
                    <div class="d-flex justify-content-center align-items-center bg-light rounded-2" style="height: 150px;">
                        <img width="150" height="100" src="${image}" alt="Snicker">
                    </div>
    
                    <div class="p-1">
                        <p class="description text-muted text-truncate" onclick="this.classList.remove('text-truncate')" onmouseout="this.classList.add('text-truncate')">${description}</p>
                    </div>
    
                    <div class="d-flex justify-content-between">
                        <div class="d-flex flex-column" style="width: 100px;">
                            <h5 class="brand mb-3">${brand}</h5>
                            <button class="btn btn-dark viewBtn">View</button>
                        </div>
                        <div class="d-flex flex-column">
                                <div class="d-none position-relative">
                                    <div class="position-relative">
                                        <div class="bubble text-center d-flex justify-content-center align-items-center w-100 px-1">
                                            <p class="text-white fw-bold w-50 cursor" style="font-size: 12px;">Add To Favourites</p>
                                        </div>
                                        <div class="pointer"></div>
                                    </div>
                                </div>
                                <button onclick="this.parentElement.firstElementChild.classList.remove('d-none')" onmouseleave="setTimeout(() => {this.parentElement.firstElementChild.classList.add('d-none')},5000)" class="3-dot mb-3 border-0 bg-white">
                                    <i class="bi bi-three-dots"></i>
                                </button>
                                <p class="price">₦${price}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
        `

    // =============================== ADD TO CART ==================================================

    const favBtn = document.querySelectorAll('.bubble p');
    const viewBtn = document.querySelectorAll('.viewBtn');

    favBtn.forEach((el, i) => {
        el.addEventListener('click', cartClick)
    })

    $('.viewBtn').click(function (e) {

        $('#viewMod').animate({
            opacity: '1'
        }, 'slow');
        $('#viewMod').show()
    });

    viewBtn.forEach((el, i) => {
        el.addEventListener('click', viewModal);
    })



    return row;

}

function viewModal(e) {
    let target = e.target;
    let viewItem = target.parentElement.parentElement.parentElement.parentElement;
    console.log(viewItem)
    let brand = viewItem.getElementsByClassName('brand')[0].innerText;
    let price = viewItem.getElementsByClassName('price')[0].innerText;
    let image = viewItem.getElementsByTagName('img')[0].src;
    let description = viewItem.getElementsByClassName('description')[0].innerText;

    // console.log(image + " ," + brand + " ," + price + ", " + description);

    viewMod(brand, price, image, description)
}

const modimg = document.getElementById('modImage');
function viewMod(brand, price, image, description) {
    $('#modImage').attr('src', image);
    var x = description;
    var y = x.split(' ').slice(0,3).join(' ');
    $('#modHead').text(y);
    $('#modBrand').text(brand);
    $('#modDescript').text(description);
    $('#modPrice').text(price);
    $('#modBrand2').text(brand);

    console.log(y);

}

function cartClick(e) {
    e.preventDefault;
    let target = e.target;
    console.log(target)
    swal.fire(
        'Nice!',
        'Your Order has been added to your cart!',
        'success'
    )
    // count++;
    // cartAdd.innerText = count;

    let favItem = target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
    console.log(favItem)
    let brand = favItem.getElementsByClassName('brand')[0].innerText;
    let price = favItem.getElementsByClassName('price')[0].innerText;
    let image = favItem.getElementsByTagName('img')[0].src;
    let description = favItem.getElementsByClassName('description')[0].innerText;


    addToFav(brand, price, image, description);
}


// Fetch Cart Data from json Server
fetch("http://localhost:3000/favourites")
    .then(response => response.json())
    .then(json => {
        json.map(data => {
            // console.log(data)
            favBody.append(getFromCart(data.id, data.image, data.brand, data.price, data.description))
        })
    })
    .catch(err => console.log("Error: " + err));

function getFromCart(id, image, brand, price, description) {
    const stack = document.createElement('div');
    stack.classList.add('d-flex', 'flex-column')
    stack.innerHTML =
        `
        <div class="d-flex justify-content-between my-5">
            <div class="bg-light rounded-3 d-flex justify-content-center me-3" style="height: 90px; width: 150px;">
                <img width="80" src=${image} alt="Sneakers">
            </div>
            <div class="d-flex flex-column">
                <h5>${brand}</h5>
                <p class="text-muted">${description}</p>
                <div class="d-flex justify-content-between">
                    <p>${id}</p>
                    <p>${price}</p>
                </div>
            </div>
            <div>
                <button type="button" class="btn-close"></button>
            </div>
        </div>
    `
    return stack;
}

// Post Data To cart in JSON Server
function addToFav(brand, price, image, description) {
    fetch("http://localhost:3000/favourites", {
        method: "POST",
        body: JSON.stringify({
            brand: brand,
            price: price,
            image: image,
            description: description
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log("Error: " + err));

    console.log(favBody.childNodes)

}

let delFav = {
    apiUrl: "http://localhost:3000/favourites/{id}",
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
        let idNum = target.parentElement.parentElement.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.innerText;
        console.log(idNum)
        this.fetchStore(idNum);
    }
}

favBody.addEventListener('click', (e) => {
    let target = e.target;
    if (target.tagName === 'BUTTON' && target.classList.contains('btn-close')) {
        delFav.searchbar(e)
        target.parentElement.parentElement.remove();
        count--;
        // cartAdd.innerText = count;
        // console.log(count)
    }
});

placeOrder.addEventListener('click', () => {
    Swal.fire(
        'Congratulations!',
        'Your Order has been Placed!',
        'success'
    )
});


// clearCart.addEventListener('click', () => {
//     // fetch('http://localhost:3000/favourites/1,2', {
//     //     method: "DELETE",
//     //     headers: {
//     //         "Content-type": "application/json; charset=UTF-8"
//     //     }
//     // })
//     //     .then(res => {
//     //         if (res.ok) { alert("Delete request successful") }
//     //         else { alert("Delete request unsuccessful") }
//     //         return res
//     //     })
//     //     // .then(res => res.json())
//     //     // .then(data => console.log(data))
//     //     .catch(error => console.log(error));

//     favBody.innerHTML = '';
//     emptyTable.classList.remove('d-none');
//     orderBtn.classList.add('d-none');
//     count = 0;
//     cartAdd.innerText = count;
// });


// Search inputs

sortPrice = document.getElementById('sortPrice');
sortCat = document.getElementById('sortCat');


let store = {
    apiUrl: "http://localhost:3000/sneakers?q={search}",
    fetchStore: function (search) {
        let url = this.apiUrl.replace("{search}", search);
        fetch(url)
            .then(response => response.json())
            .then(json => {
                json.map(data => {
                    console.log(data)
                    clothRow.append(this.addRows(data.image, data.brand, data.price))
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
            fetch("http://localhost:3000/sneakers")
                .then(response => response.json())
                .then(json => {
                    json.map(data => {
                        // console.log(data)
                        clothRow.append(addRow(data.image, data.brand, data.price));
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
    apiUrl: "http://localhost:3000/sneakers?category={category}",
    fetchStore: function (category) {
        let url = this.apiUrl.replace("{category}", category);
        fetch(url)
            .then(response => response.json())
            .then(json => {
                json.map(data => {
                    console.log(data)
                    clothRow.append(this.addRows(data.image, data.brand, data.price))
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
            fetch("http://localhost:3000/sneakers")
                .then(response => response.json())
                .then(json => {
                    json.map(data => {
                        // console.log(data)
                        clothRow.append(addRow(data.image, data.brand, data.price));
                    })
                })
                .catch(error => console.log(error));
        } else {
            catStore.searchbar()
        }
    }, 500)

});


