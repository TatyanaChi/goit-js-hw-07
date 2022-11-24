import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const galleryContainer = document.querySelector(".gallery");
const cardsMarkUp = createGalleryCardsMarkUp(galleryItems);

galleryContainer.insertAdjacentHTML("beforeend", cardsMarkUp);

galleryContainer.addEventListener("click", onGalleryContainerClick);

console.log(createGalleryCardsMarkUp(galleryItems));

function createGalleryCardsMarkUp(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <div class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </div> 
        `;
    })
    .join("");
}

function onGalleryContainerClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }

  const imgOriginal = event.target.dataset.source;

  const instance = basicLightbox.create(
    `
      <div class="modal">
          <img src = "${imgOriginal}">
          <a></a>
      </div>
  `,
    {
      onShow: (instance) => {
        instance.element().querySelector("a").onclick = instance.close;
        instance.element().querySelector("img").onclick = instance.close;
        window.addEventListener("keyup", onEscClose);
      },
      onClose: () => {
        window.removeEventListener("keyup", onEscClose);
      },
    }
  );

  function onEscClose(event) {
    if (event.key === "Escape") {
      instance.close();
    }
  }
  instance.show();
}
