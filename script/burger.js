const burgerMenuCheckbox = document.querySelector('.burger-checkbox');

burgerMenuCheckbox.addEventListener('click', () => {
    document.body.classList.toggle('blackout')
})

const burgerItems = document.querySelectorAll('.menu-list .nav-list-item');
const burgerMenu = document.querySelector('.menu-list');

for (let burgerItem of burgerItems) {
    burgerItem.addEventListener('click', () => {
        document.body.classList.toggle('blackout');
        burgerMenuCheckbox.checked = false;
    })
}