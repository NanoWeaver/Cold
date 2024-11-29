const carousel = document.querySelector('.project-crousel');
const carouselItems = document.querySelectorAll('.carousel-item-shell');
const spans = document.querySelectorAll('.dots');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const select = document.querySelector('.feedback-form-select')
const phoneInput = document.querySelector('.feedback-form-tel');
const sortingItems = document.querySelectorAll('.sorting-item')
const carouselItemShells = document.querySelectorAll('.carousel-item-shell');
const placeTabs = document.querySelector('.dots-shell');
const lazyImages = document.querySelectorAll('.lazy');

let currentSlide = 0; // Текущий индекс
const slideWidth = carousel.offsetWidth; // Ширина видимой области карусели

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src; // Загружаем изображение
            img.classList.remove('lazy'); // Удаляем класс для стилей
            
            observer.unobserve(img); // Прекращаем наблюдение
        }
    });
}, {
    root: document.querySelector('.carousel'), // Наблюдаем только внутри карусели
    rootMargin: '300px', // Задаём отступы
    threshold: 0.1// Полностью видимая область
});

lazyImages.forEach(img => observer.observe(img));


nextButton.addEventListener('click', () => {
    let spans = document.querySelectorAll('.dots');
    let carousel = document.querySelector('.project-crousel');
    let carouselItems = document.querySelectorAll('.carousel-item-shell');
    const maxSlides = spans.length - 1; // Количество блоков - 1
    if (currentSlide < maxSlides) {
        currentSlide++;
        for (let item of carouselItems) {
            item.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        }
        for (let span of spans) {
            span.classList.remove('dots-active')
        }
        spans[currentSlide].classList.add('dots-active');
    }
});

prevButton.addEventListener('click', () => {
    let spans = document.querySelectorAll('.dots');
    let carouselItems = document.querySelectorAll('.carousel-item-shell');
    if (currentSlide > 0) {
        currentSlide--;
        for (let item of carouselItems) {
            item.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        }
        for (let span of spans) {
            span.classList.remove('dots-active')
        }
        spans[currentSlide].classList.add('dots-active');
    }
});

select.addEventListener('change', () => {
    select.classList.remove('select-placeholder');
})

phoneInput.addEventListener('input', () => {
    let rawValue = phoneInput.value.replace(/\D/g, '');

    if (!rawValue.startsWith('7')) {
        rawValue = '7' + rawValue;
    }

    const formattedValue = rawValue.replace(
        /^7(\d{3})(\d{3})(\d{4})$/,
        '+7-$1-$2-$3'
    );


    phoneInput.value = formattedValue;
});

function carouselFilter(item, arr) {
    let itemData = item.getAttribute('data-project').split(' '); // Разделяем значения на массив
    let counter = 0;

    for (let index of arr) {
        index.style.transform = `translateX(0px)`;
        let indexData = index.getAttribute('data-project').split(' '); // Разделяем значения на массив
        // Проверяем, есть ли пересечение значений
        if (!itemData.some(value => indexData.includes(value))) {
            index.classList.add('none');
        } else {
            index.classList.remove('none');
            counter++;
        };
    };
    return counter;
}

function creatinTabPoints(numberSlides,locationPlacement) {
    while (locationPlacement.firstChild) {
        locationPlacement.removeChild(locationPlacement.firstChild);
    }
    for (let i = 0; i < numberSlides; i++) {
        let span = document.createElement('span');
        span.classList.add('dots');
        if (i === 0) {
            span.classList.add('dots-active');
        }
        locationPlacement.append(span);
    }
}



for (let sortingItem of sortingItems) {
    sortingItem.addEventListener('click', () => {
        if(!sortingItem.classList.contains('sorting-item-selected')) {
            let sortingItemSelect = document.querySelector('.sorting-item-selected');
            sortingItemSelect.classList.remove('sorting-item-selected')
            sortingItem.classList.add('sorting-item-selected');
            let numberSlides = carouselFilter(sortingItem,carouselItemShells);
            creatinTabPoints(numberSlides,placeTabs);
            currentSlide = 0;
        };
        
    })
}