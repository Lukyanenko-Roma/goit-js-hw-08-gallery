import images from "./gallery-items.js";

const galleryList = document.querySelector('.js-gallery');
const lightboxRef = document.querySelector('.lightbox');
const closeBtnRef = document.querySelector('button[data-action="close-lightbox"]');
const modalRef = document.querySelector('.lightbox__overlay');
const lightboxImgRef = document.querySelector('.lightbox__image');
const imageRef = document.querySelector('img');

const galleryItem = ({ preview, description,original }) =>
    `<li class ='gallery__item'>
  <a class="gallery__link" href="${original}">
  <img
  class = 'gallery__image'
  src= '${preview}'
   alt ='${description}'
   data-source='${original}'/>
  </a></li>`

const galleryMarkup = images.reduce(
  (acc, item) => acc + galleryItem(item), ''
);

galleryList.insertAdjacentHTML('afterbegin', galleryMarkup);
imageRef.classList.add('gallery__image');


galleryList.addEventListener("click", onGalleryClick);

function onGalleryClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  if (event.target.nodeName === 'IMG') {
    lightboxImgRef.src = event.target.dataset.source
    lightboxImgRef.alt = event.target.alt;
    lightboxRef.classList.add('is-open');
    window.addEventListener("keyup", clikKey);
  }
};

closeBtnRef.addEventListener("click", onClickHandlerClose);
modalRef.addEventListener("click", closeModalRef);

function onClickHandlerClose() {
  lightboxRef.classList.remove("is-open");
  lightboxImgRef.src = "";
  lightboxImgRef.alt = "";
  window.removeEventListener("keyup", clikKey);
}

function closeModalRef(event) {
  if (event.target === event.currentTarget) {
    onClickHandlerClose();
  }
}

function clikKey(event) {
  event.preventDefault();
  if (event.code === "Escape") {
    onClickHandlerClose();
  }
}



