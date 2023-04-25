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

export default modal