cartRem = document.querySelectorAll('.cartRem')

cartRem.forEach(el => {
    el.addEventListener('click', () => {
        el.parentElement.parentElement.parentElement.remove()
    })
});

addToCart() {
    
}