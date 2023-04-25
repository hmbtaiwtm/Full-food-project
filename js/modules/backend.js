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

export default backend