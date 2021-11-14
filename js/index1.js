// { // Модальное окно
//     const presentOrderBtn = document.querySelector('.present__order-btn');
//     const pageOverlayModal = document.querySelector('.page__overlay_modal');
//     const modalClosed = document.querySelector('.modal__closed');

//     // pageOverlayModal.classList.add('page__overlay_modal_open')  открыть окно
//     // pageOverlayModal.classList.remove('page__overlay_modal_open') закрыть окно

//     const handlerModal = (openBtn, modalWin, openSelector, closeTrigger, sk = 'medium') => {

//         let opacity = 0;   //работа с таймером, появление и скрытие модального окна плавным изменением opacity

//         const speed = {
//             slow: 15,
//             medium: 10,
//             fast: 1,
//         };


//         openBtn.addEventListener('click', () => {
//             modalWin.style.opacity = opacity;   // обращаемся к объекту style к свойству opacity 

//             modalWin.classList.add(openSelector);

//             const timer = setInterval(() => {
//                 opacity += 0.02;
//                 modalWin.style.opacity = opacity;
//                 if (opacity >= 1) clearInterval(timer)
//             }, speed[sk]) 
//         });

//         closeTrigger.addEventListener('click', () => {
//             const timer = setInterval(() => {
//                 opacity -= 0.02;
//                 modalWin.style.opacity = opacity;
//                 if (opacity <= 0) {
//                     clearInterval(timer)
//                     modalWin.classList.remove(openSelector);
//                 }
//             }, 15) 
            
//         });
// };

// handlerModal(
//     presentOrderBtn,  
//     pageOverlayModal,  
//     'page__overlay_modal_open', 
//     modalClosed,
//     'fast'
//     );
// }

/* Убрать скролл
для  некоторых моделей тел(ihpone) не рабтает overflow = 'hidden' поэтому можно сделать по другому
через свойства cssText через него можно передать строки со всеми св-ми css. пощицию, высоту и тд*/
// const disabletScroll = () => {
//     document.body.style.overflow = 'hidden';
// }
const disabletScroll = () => {
const widthScroll = window.innerWidth - document.body.offsetWidth;  // убираю дергание страница при открытии модального окна, из-за появления и исчезания скролла страницы

    document.body.scrollPosition = window.scrollY;  // добавляем новое свойства в body scrollPosition 

    document.body.style.cssText = `
    oveflow: hidden;
    position: fixed;
    top: -${document.body.scrollPosition}px;    
    left: 0;
    height: 100wh;
    width: 100vw;
    padding-right: ${widthScroll}px;
    background: tomato`;
};

const enableScroll = () => {
    document.body.style.cssText = 'position: relative';  // передаю пустую строку, что приведет к обнудению свойств заданых в disabletScroll
    window.scroll({top:  document.body.scrollPosition})
};



{ // Модальное окно
    const presentOrderBtn = document.querySelector('.present__order-btn');
    const pageOverlayModal = document.querySelector('.page__overlay_modal');
    const modalClosed = document.querySelector('.modal__closed');

    // pageOverlayModal.classList.add('page__overlay_modal_open')  открыть окно
    // pageOverlayModal.classList.remove('page__overlay_modal_open') закрыть окно

    const handlerModal = (openBtn, modalWin, openSelector, closeTrigger, sk) => {

        let opacity = 0;   //работа с таймером, появление и скрытие модального окна плавным изменением opacity

        const speed = {  //Меняем не скорость анимации, а на сколько меняем значение
            slow: 0.02,
            medium: 0.05,
            fast: 0.1,
        };


        // перенес функцию в отдельную переменную openModal для переиспользования
            const openModal =  () => {
                disabletScroll();
                modalWin.style.opacity = opacity;   // обращаемся к объекту style к свойству opacity 
                modalWin.classList.add(openSelector);

                const anim = () => {
                    opacity += speed[sk];
                    modalWin.style.opacity = opacity;
                    if (opacity < 1) requestAnimationFrame(anim)
                };
                requestAnimationFrame(anim);
            };


        // перенес функцию в отдельную переменную closeModal для переиспользования
        const closeModal = () => {
            enableScroll();
            const anim = () => {
                opacity -= speed[sk];
                modalWin.style.opacity = opacity;
                if (opacity  > 0) {
                    requestAnimationFrame(anim)        
                } else {
                    modalWin.classList.remove(openSelector);
                }
            };
            requestAnimationFrame(anim);             
        };

        openBtn.addEventListener('click', openModal);

        closeTrigger.addEventListener('click', closeModal);

        // закрытие модального окна по клику мимо модального окна
        modalWin.addEventListener('click', (event) => {
            if(event.target === modalWin) {     // получаем 1 элемент по которому произошел клик обащаемся к event, условие если мы кликаем по .page__overlay_moda у меня это modalWin, то закрываем окно
                closeModal()
            }
            // console.log(event.target)
            // closeModal()
        });
};

handlerModal(
    presentOrderBtn,  
    pageOverlayModal,  
    'page__overlay_modal_open', 
    modalClosed,
    'medium'
    );
}


/* убираю сколл со страницы если открыто что то поверх страницы, например мольное окно
        */


{ // Бургер меню
    const headerContactBurger = document.querySelector('.header__contact-burger');
    const headerContacts = document.querySelector('.header__contacts');
    
    const handlerBurger = (openBtn, menu, openSelector) => {
        openBtn.addEventListener('click', () => {
            // console.log(menu.classList.contains(openSelector));
            if (menu.classList.contains(openSelector)) {
                menu.style.height = '';
                menu.classList.remove(openSelector);
            } else {
                menu.style.height =menu.scrollHeight + 'px';
                menu.classList.add(openSelector);
            }
        })
    };
    handlerBurger(headerContactBurger, headerContacts, 'header__contacts_open');
}