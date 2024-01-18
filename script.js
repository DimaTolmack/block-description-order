const modal = ({triggerSelector, modalSelector, modalSelectorDisplay = 'block', closeSelector, timeSelector, timeSelectorDisplay = 'block', timeShowModal = 60000, scrollSelector, scrollSelectorDisplay = 'block'}) => {
    let btnPressed = false;

    const triggerBtn = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector),
        closeBtn = modal.querySelector(closeSelector),
        windows = document.querySelectorAll('[data-modal]'),
        scroll = calcScroll();

    function showModal() {
        modal.style.display = modalSelectorDisplay;
        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = `${scroll}px`;
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        document.body.style.marginRight = '0px';
    }

    triggerBtn.forEach(item => {
        item.addEventListener('click', (event) => {
            if (event.target) {
                event.preventDefault();
            }

            windows.forEach(item => {
                item.style.display = 'none';
            });

            btnPressed = true;

            showModal();
        });
    });

    closeBtn.addEventListener('click', () => {
        closeModal();

        windows.forEach(item => {
            item.style.display = 'none';
        });
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();

            windows.forEach(item => {
                item.style.display = 'none';
            });
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal) {
            closeModal();

            windows.forEach(item => {
                item.style.display = 'none';
            });
        }
    });

    function showModalByTime(selector, time) {
        setTimeout(() => {
            let display;

            document.querySelectorAll('[data-modal]').forEach(item => {
                if (getComputedStyle(item).display !== 'none') {
                    display = 'block';
                }
            });

            if (!display && !btnPressed) {
                document.querySelector(selector).style.display = timeSelectorDisplay;
                document.body.style.overflow = 'hidden';

                let scroll = calcScroll();
                document.body.style.marginRight = `${scroll}px`;
            }
        }, time);
    }

    showModalByTime(timeSelector, timeShowModal);

    function showModalByScroll() {
        if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight)) {
            document.querySelector(scrollSelector).style.display = scrollSelectorDisplay;
            document.body.style.overflow = 'hidden';

            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);

        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }
};


modal({
    modalSelector: '.modal',
    triggerSelector: '.column__link',
    closeSelector: '.modal__button-closed',
    /*Последние 4 аргумента идут по умолчанию их нужно удалить*/

});