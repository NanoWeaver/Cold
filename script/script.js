const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const select = document.querySelector('.feedback-form-select')
const phoneInput = document.querySelector('.feedback-form-tel');
const sortingItems = document.querySelectorAll('.sorting-item')
const carouselItemShells = document.querySelectorAll('.carousel-item-shell');
const placeTabs = document.querySelector('.dots-shell');
const lazyImages = document.querySelectorAll('.lazy');
const projectCrousel = document.querySelector('.project-crousel')

let currentSlide = 0; // Текущий индекс


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
    const slideWidth = carousel.offsetWidth; // Ширина видимой области карусели
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
    let carousel = document.querySelector('.project-crousel');
    const slideWidth = carousel.offsetWidth; // Ширина видимой области карусели
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


const carouselItems = document.querySelectorAll('.carousel-item-shell'); // Слайды
const dots = document.querySelectorAll('.dots'); // Точки для управления

const maxSlides = dots.length * 2 - 1; // Максимальное количество слайдов

let startX = 0; // Начальная позиция касания
let isDragging = false; // Флаг для отслеживания движения

projectCrousel.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
    isDragging = true;
});

projectCrousel.addEventListener('touchmove', (event) => {
    if (!isDragging) return;

    const currentX = event.touches[0].clientX;
    const deltaX = currentX - startX;

    // Ограничиваем движение слайдов в пределах 50px
    if (deltaX >= -50 && deltaX <= 50) {
        for (let item of carouselItems) {
            const offsetX = -currentSlide * (projectCrousel.offsetWidth + 50) + deltaX ;
            item.style.transform = `translateX(${offsetX}px)`;
        }
    }
});

projectCrousel.addEventListener('touchend', (event) => {
    isDragging = false;
    let spans = document.querySelectorAll('.dots');

    const endX = event.changedTouches[0].clientX;
    const deltaX = endX - startX;

    // Если движение было больше 50px, переключаем слайд
    if (deltaX <= -50 && currentSlide < maxSlides) {
        currentSlide++;
    } else if (deltaX >= 50 && currentSlide > 0) {
        currentSlide--;
    }

    if (currentSlide % 2 === 0) {
        for (let span of spans) {
            span.classList.remove('dots-active')
        }
        spans[currentSlide / 2].classList.add('dots-active');
    }

    // Переключаем слайд
    for (let item of carouselItems) {
        const offsetX = -currentSlide * (projectCrousel.offsetWidth + 50);
        item.style.transform = `translateX(${offsetX}px)`;
    }
});

const burgerMenuCheckbox = document.querySelector('.burger-checkbox');

burgerMenuCheckbox.addEventListener('click', () => {
    document.body.classList.toggle('blackout')
    console.log(burgerMenuCheckbox.checked)
})

const burgerItems = document.querySelectorAll('.menu-list .nav-list-item');
const burgerMenu = document.querySelector('.menu-list');

for (let burgerItem of burgerItems) {
    burgerItem.addEventListener('click', () => {
        document.body.classList.toggle('blackout');
        burgerMenuCheckbox.checked = false;
        console.log(burgerMenuCheckbox.checked)
    })
}

// projectCrousel.addEventListener('touchstart', (event) => {
//     let currentSlide = 1;
//     let spans = document.querySelectorAll('.dots');
//     const maxSlides = spans.length - 1; // Количество блоков - 1
//     let carouselItems = document.querySelectorAll('.carousel-item-shell');
//     event.preventDefault();
//     let startX = event.touches[0].clientX;
//     console.log(startX)
//     let isDragging = true;
//     const transformValue = carouselItems[currentSlide].style.transform; // "translateX(-300px)"
//     const currentTranslateX = parseFloat(transformValue.replace('translateX(', '').replace('px)', ''));


//     projectCrousel.addEventListener('touchmove', (event) => {
//         if (!isDragging) return;

//         let currentX = event.touches[0].clientX;
//         const deltaX = currentX - startX;
//         console.log(currentTranslateX); // -300
        
//         if (-50 <= deltaX  && deltaX <= 50) {
//             console.log('Сдвигаем на ' + deltaX);
//             for (let item of carouselItems) {
//                 item.style.transform = `translateX(${deltaX}px)`;
//             }
//         }

//         if ( deltaX <= -50 || deltaX >= 50) {


//             projectCrousel.addEventListener('touchend', () => {
//                 for (let item of carouselItems) {
//                     item.style.transform = `translateX(-${projectCrousel.offsetWidth * currentSlide}px)`;
//                 }
//                 currentSlide +=;
//             })

            
//         }
//     })
// })

