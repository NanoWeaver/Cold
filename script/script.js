const carousel = document.querySelector('.project-crousel');
const carouselItems = document.querySelectorAll('.carousel-item-shell');
const spans = document.querySelectorAll('.dots');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const select = document.querySelector('.feedback-form-select')
const phoneInput = document.querySelector('.feedback-form-tel');

let currentSlide = 0; // Текущий индекс
const slideWidth = carousel.offsetWidth; // Ширина видимой области карусели

nextButton.addEventListener('click', () => {
    const maxSlides = carousel.children.length - 1; // Количество блоков - 1
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