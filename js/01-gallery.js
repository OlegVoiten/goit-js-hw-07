import { galleryItems } from "./gallery-items.js";
// Change code below this line
console.log(galleryItems);

const gallery = document.querySelector(".gallery");
const galleryMarkup = createGallery(galleryItems);

gallery.insertAdjacentHTML("beforeend", galleryMarkup);

gallery.addEventListener("click", handleClick);

// Створення і рендер розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї.
function createGallery(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}" />
          </a>
        </li>
      `;
    })
    .join("");
}

// Реалізація делегування на ul.gallery і отримання url великого зображення

function handleClick(event) {
  event.preventDefault();

  if (event.target.classList.contains("gallery__image")) {
    const image = event.target;
    const originalUrl = image.dataset.source;
    const desc = image.alt;

    console.log(originalUrl);
    //  URL великого зображення
    const instance = basicLightbox.create(
      `<img src="${originalUrl}" alt="${desc}" />`,
      {
        onShow: (instance) => {
          window.addEventListener("keydown", handleKeyDown);
        },
        onClose: (instance) => {
          window.removeEventListener("keydown", handleKeyDown);
        },
      }
    );
    instance.show();

    // закриття модального вікна клавішою 'esc'
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        instance.close();
      }
    }
  }
}


