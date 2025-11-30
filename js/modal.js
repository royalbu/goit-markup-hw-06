(() => {
    // Належна робота навіть якщо кнопок декілька або якихось немає
    const openBtns = document.querySelectorAll('[data-modal-open]');
    const closeBtns = document.querySelectorAll('[data-modal-close]');
    const backdrop = document.querySelector('[data-modal]');
    const popup = backdrop ? backdrop.querySelector('.popup-review') : null;

    // Захист: якщо бекдропа немає — нічого не робимо
    if (!backdrop) {
        console.warn('modal.js: [data-modal] not found in DOM');
        return;
    }

    // Toggle функція
    function toggleModal() {
        backdrop.classList.toggle('is-open');
    }

    // Відкриваємо модалку (якщо є кнопки)
    if (openBtns.length) {
        openBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                toggleModal();
            });
        });
    }

    // Закриваємо модалку по кнопках закриття
    if (closeBtns.length) {
        closeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                toggleModal();
            });
        });
    }

    // Закриття по ESC
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.key === 'Esc') {
            if (backdrop.classList.contains('is-open')) {
                toggleModal();
            }
        }
    });

    // Закриття по кліку на бекдроп (але не при кліку всередині popup)
    backdrop.addEventListener('click', (e) => {
        // якщо клікнули саме по бекдропу — закриваємо
        if (e.target === backdrop) {
            toggleModal();
        }
    });

    // Якщо клік всередині popup — не дозволяємо події "всплинути" до бекдропу
    if (popup) {
        popup.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
})();
