//Forecast slider
function setupForecastSlider(sliderSelector, itemSelector, buttonLeftSelector, buttonRightSelector, indexSlideScale) {
    let currentSlide = 0;
    let initialX = 0;
    let dragging = false;

    const carousel = document.querySelector(sliderSelector);
    const slides = document.querySelectorAll(itemSelector);
    const totalSlides = slides.length;

    function refreshCarousel() {
        slides.forEach((slide, index) => {
            const offset = index - currentSlide;
            let slideTranslate = 50
            // if (window.innerWidth <= 1100){
            //     slideTranslate = 47
            // }
            let newPosition = offset * slideTranslate;


            if (offset > totalSlides / 2) {
                newPosition -= totalSlides * slideTranslate;
            } else if (offset < -totalSlides / 2) {
                newPosition += totalSlides * slideTranslate;
            }

            const scale = index === currentSlide ? 1 : indexSlideScale;

            slide.style.transform = `translateX(${newPosition}%) scale(${scale})`;
            slide.style.zIndex = index === currentSlide ? 3 : 1;

            const isVisible = Math.abs(offset) <= 1 || (index === 0 && currentSlide === totalSlides - 1) || (index === totalSlides - 1 && currentSlide === 0);
            slide.classList.toggle('hidden', !isVisible);
            slide.classList.toggle('active', index === currentSlide);

            slide.classList.remove('left-slide', 'right-slide');
            if (offset === 1 || (currentSlide === totalSlides - 1 && index === 0)) {
                slide.classList.add('right-slide');
            } else if (offset === -1 || (currentSlide === 0 && index === totalSlides - 1)) {
                slide.classList.add('left-slide');
            }
        });
    }

    function shiftSlide(direction) {
        currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
        refreshCarousel();
    }

    function handleDragStart(event) {
        dragging = true;
        initialX = event.clientX || event.touches[0].clientX;
    }

    function handleDragMove(event) {
        if (!dragging) return;

        const currentX = event.clientX || event.touches[0].clientX;
        const diffX = currentX - initialX;

        if (Math.abs(diffX) > 50) {
            shiftSlide(diffX > 0 ? -1 : 1);
            dragging = false;
        }
    }

    function handleDragEnd() {
        dragging = false;
    }

    const leftButtons = document.querySelectorAll(buttonLeftSelector)
    const rightButtons = document.querySelectorAll(buttonRightSelector)
    leftButtons.forEach(btn  => {
        btn.addEventListener('click', () => {
            shiftSlide(-1);
        })
    })
    rightButtons.forEach(btn  => {
        btn.addEventListener('click', () => {
            shiftSlide(1);
        })
    })

    carousel.addEventListener('mousedown', handleDragStart);
    carousel.addEventListener('touchstart', handleDragStart);


    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('touchmove', handleDragMove);

    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchend', handleDragEnd);

    refreshCarousel();
}

setupForecastSlider('.videos__slider', '.videos__item', '.videos__control-left', '.videos__control-right', 0.56);


const sliderItems = document.querySelectorAll(".videos__item");
sliderItems.forEach((item, i) =>{
    const videoIframe = item.querySelector(".videoIframe")
    const videoPlayBtn = item.querySelector(".videoPlayBtn")
    const parentElement = videoIframe.parentElement
    videoPlayBtn.addEventListener("click", () =>{
        videoIframe.src = videoIframe.src + '&autoplay=1&mute=1&controls=1';
        videoIframe.style.display = "block"
        videoPlayBtn.style.display = "none"
        parentElement.style.border = "none"

    })
})



const blackBtn = document.querySelector(".dark-btn")

blackBtn.addEventListener("click", () =>{
    document.body.classList.toggle("dark")
    document.body.classList.toggle("light")

})