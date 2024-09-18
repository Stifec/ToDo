

const imain =document.querySelector('.index-main')
const btn = document.querySelector('.btn-singIn');
btn.addEventListener("click", (e) => {
    // mod.style.background = "blue";
    // imain.style.background = "blue";
    toggleModal()
});


// ================== MODAL ==============

const modal = document.querySelector('.backdrop');

const modalClose = document.querySelector('.btn-modal-close');
const mod = document.querySelector(".body");

const toggleModal = () => {
    modal.classList.toggle('is-hidden')
    mod.classList.toggle('body-mod')
};

modalClose.addEventListener('click', toggleModal);

