/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/backend.js":
/*!*******************************!*\
  !*** ./js/modules/backend.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function backend () {
    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        }, 
        body: data 
      });

      return await res.json()
    }

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.appendChild(statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                statusMessage.textContent = message.success;
                setTimeout(() => {
                    statusMessage.remove();
                }, 2000); 
            }).catch(() => {
              statusMessage.textContent = message.failure
            }).finally(() => {
              form.reset();
            })
        });
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (backend);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards () {
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector) {
          this.src = src;
          this.alt = alt;
          this.title = title;
          this.descr = descr;
          this.price = price; 
          this.parent = document.querySelector(parentSelector)
          this.transfer = 27;
          this.changeToUah();
        }
  
        changeToUah() {
          this.price = this.price * this.transfer;
        };
  
        render() {
          const element = document.createElement('div');
          element.innerHTML = `
            <div class="menu__item">
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            </div>
          `;
          this.parent.append(element); 
        }
      }
  
      const getResource = async (url) => {
        const res = await fetch(url)
  
        if (!res.ok) {
          throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
  
        return await res.json()
      };
  
      getResource('http://localhost:3000/menu')
        .then(data => {
          data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
          })
        }); 
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/hardSlide.js":
/*!*********************************!*\
  !*** ./js/modules/hardSlide.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (hardSlide);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function modal () {
    const btnOpenModal = document.querySelectorAll('[data-modal]'),
        btnClose = document.querySelector('[data-close]'),
        modal = document.querySelector('.modal');

    // открытие окна
    function OpenModal () {
      modal.classList.toggle('show');
      document.body.style.overflow = 'hidden';
      clearInterval(modalTimerId)
    }

    btnOpenModal.forEach( btn => {
      btn.addEventListener('click', () => {
        // modal.classList.add('show');
        // modal.classList.remove('hide');
        OpenModal()
      });
    });

    // закрытие окна
    function CloseModal () { // если код повторяеться лучше помещать его в функцию
      // modal.classList.add('hide');
      // modal.classList.remove('show');
      modal.classList.toggle('show');
      document.body.style.overflow = ''
    }

    btnClose.addEventListener('click', CloseModal)

    modal.addEventListener('click', (e) => {
       if (e.target == modal) {
          CloseModal()
       }
    });

    document.addEventListener('keydown', (e) => {  //keydown отслеживает нажатие клавиши на клавеатуре
      if (e.code == "Escape") { // e.code code- код клавиши
        CloseModal()
      }
    });

    const modalTimerId = setTimeout(OpenModal, 5000);

    //высвечивание модального окна
    function showModalByScroll () {
      if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1){
        OpenModal()
        window.removeEventListener('scroll', showModalByScroll)
       }
    }

    window.addEventListener('scroll', showModalByScroll,)
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);

/***/ }),

/***/ "./js/modules/simpleSlide.js":
/*!***********************************!*\
  !*** ./js/modules/simpleSlide.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function simpleSlide () {
                                //простой вариаент создания слайда
    // showSlides(slideIndex);
    
    // if (slides.length < 10 ) {
    //   total.textContent = `0${slides.length}`
    // } else {
    //   total.textContent = slides.length
    // }

    // function showSlides(n) {
    //   if (n > slides.length) {
    //     slideIndex = 1
    //   }

    //   if (n < 1) {
    //     slideIndex = slides.length;
    //   }

    //   slides.forEach(item => item.style.display = 'none');

    //   slides[slideIndex - 1].style.display = 'block';

    //   if (slides.length < 10 ) {
    //     current.textContent = `0${slideIndex}`
    //   } else {
    //     current.textContent = slideIndex;
    //   }
    // }

    // function plusSlides (n) {
    //   showSlides(slideIndex += n)
    // }

    // prev.addEventListener('click', () => {
    //   plusSlides(-1)
    // });
    // next.addEventListener('click', () => {
    //   plusSlides(1)
    // })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (simpleSlide);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs () {
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabcontent() {
        tabsContent.forEach(item => {
        item.classList.add('hide')
        item.classList.remove('show')
        });

    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active')
    });
  };

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active')
    };

    hideTabcontent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;
        
        if (target && target.classList.contains('tabheader__item')) {
        tabs.forEach((item, i) => {
            if (target == item) {
            hideTabcontent();
            showTabContent(i);
            } 
        });
        };
    });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_hardSlide__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/hardSlide */ "./js/modules/hardSlide.js");
/* harmony import */ var _modules_simpleSlide__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/simpleSlide */ "./js/modules/simpleSlide.js");
/* harmony import */ var _modules_backend__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/backend */ "./js/modules/backend.js");







window.addEventListener('DOMContentLoaded', () => {
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_hardSlide__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_simpleSlide__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_modules_backend__WEBPACK_IMPORTED_MODULE_5__["default"])();
});






})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map