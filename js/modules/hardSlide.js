function hardSlide () {
    const prev = document.querySelector('.offer__slider-prev'),
          slider = document.querySelector('.offer__slider'),
          next = document.querySelector('.offer__slider-next'),
          slides = document.querySelectorAll('.offer__slide'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slideFiled = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width;
          
    let slideIndex = 1;
    let offset = 0;

                          // сложный вариант создания слайда

    if (slides.length < 10 ) {
      total.textContent = `0${slides.length}`
      current.textContent = `0${slideIndex}`;
    } else {
      total.textContent = slides.length;
      current.textContent = slideIndex;
    }

    slideFiled.style.width = 100 * slides.length + '%';
    slideFiled.style.display = 'flex';
    slideFiled.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
      slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('li');
      dot.setAttribute('data-slide-to', i + 1);
      dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
      `;
      if (i == 0) {
        dot.style.opacity = 1;
      }
      indicators.append(dot);

      dots.push(dot);
    };


    function replace(str) {
       return +str.replace(/\D/g, '')
    }

    next.addEventListener('click', () => {
      // условие на пролистывание
      if (offset == replace(width) * (slides.length - 1)) {
        offset = 0;
      } else {
        offset += replace(width)
      }
      slideFiled.style.transform = `translateX(-${offset}px)`;

      // условие на отоброжение текущий номер слайда
      if (slideIndex == slides.length) {
        slideIndex = 1;
      } else {
        slideIndex++; 
      }

      // условие на правленье написание значение (02 а не 2) - отображалось
      if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
      } else {
        current.textContent = slideIndex;
      }

      // чтобы светились точки орентация по слайду
      dots.forEach(dot => dot.style.opacity = '.5');
      dots[slideIndex - 1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {
      if (offset == 0) {
        offset = replace(width) * (slides.length - 1)
      } else {
        offset -= replace(width)
      }
      slideFiled.style.transform = `translateX(-${offset}px)`;

      // переход отоброжение слайда
      if (slideIndex == 1) {
        slideIndex = slides.length;
      } else {
        slideIndex--; 
      }

      // отоброжение
      if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
      } else {
        current.textContent = slideIndex;
      } 


      dots.forEach(dot => dot.style.opacity = '.5');
      dots[slideIndex - 1].style.opacity = 1;
    })

    // ссылатся на слайд
    dots.forEach(dot =>  {
      dot.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');

        slideIndex = slideTo;
        offset = replace(width)* (slideTo - 1);

        slideFiled.style.transform = `translateX(-${offset}px)`;

        if (slides.length < 10) {
          current.textContent = `0${slideIndex}`;
        } else {
          current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
      } )
    })
}

export default hardSlide