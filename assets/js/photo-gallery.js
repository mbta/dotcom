// galleries is global to this function and keeps track of 1 or more galleries on a single page
let galleries = {};
const PAGE_SIZE = 10;

export default function photoGallery($) {
  $ = $ || window.jQuery;
  window.addEventListener("load", () => handlePageLoad($), {
    passive: true
  });

  // event handler for changing image
  $(document).on("click", '[data-image="gallery"]', handleClickImage);

  // event handler for previous / next page
  $(document).on("click", '[data-image="navigation"]', handleClickNavigation);
}

/* DATA FUNCTIONS */
function initializeData($) {
  const output = {};
  let $galleryEl;
  let galleryId;
  let images;

  $('[data-component="photo-gallery"]').each((_offset, el) => {
    $galleryEl = $(el);

    // create a unique id for each gallery on a page
    galleryId = guid();
    $galleryEl.attr("data-gallery-id", galleryId);

    // find all images/captions that belong to a gallery
    images = $galleryEl.find("figure").get();

    // create an object to keep track of image gallery parameters
    output[galleryId] = makeGallery($galleryEl, images);
  });

  return output;
}

// In IE11, images get overwritten with empty content, so as backup we also save the HTML content inside the <figure>'s in 'figures':
const makeGallery = ($el, images) => ({
  el: $el,
  images,
  figures: images.map(img => img.innerHTML),
  imageOffset: 0,
  pageOffset: 0,
  lastPage: calculateLastPage(images.length)
});

const calculateLastPage = photoCount =>
  Math.max(0, Math.ceil(photoCount / PAGE_SIZE) - 1);

const getGalleryImageByOffset = (id, offset) => {
  const imageByOffset = galleries[id].images[offset];

  // empty content will likely happen for IE11
  if (!imageByOffset.innerHTML) {
    imageByOffset.innerHTML = galleries[id].figures[offset];
  }

  return imageByOffset;
};

function setGalleryImageOffset(id, offset) {
  const lastOffset = galleries[id].images.length - 1;
  if (offset === -1) {
    offset = lastOffset;
  } else if (offset > lastOffset) {
    offset = 0;
  }
  galleries[id].imageOffset = offset;
  return offset;
}

function setGalleryPageOffset(id, increment) {
  let page = galleries[id].pageOffset + increment;
  if (page === -1) {
    page = galleries[id].lastPage;
  } else if (page > galleries[id].lastPage) {
    page = 0;
  }
  galleries[id].pageOffset = page;
  return page;
}

/* EVENT HANDLERS */
export function handlePageLoad($) {
  galleries = initializeData($);
  Object.keys(galleries).forEach(galleryId => render(galleryId));
}

function handleClickImage(ev) {
  ev.preventDefault();
  const id = ev.currentTarget.getAttribute("data-gallery");
  const offset = ev.currentTarget.getAttribute("data-offset");
  const actualOffset = setGalleryImageOffset(id, offset);
  replaceActiveImage(id, getGalleryImageByOffset(id, actualOffset));
}

function handleClickNavigation(ev) {
  ev.preventDefault();
  const id = ev.currentTarget.getAttribute("data-gallery");
  const increment = parseInt(ev.currentTarget.getAttribute("data-increment"));
  const focusEl = increment === 1 ? "next" : "prev";
  const isDesktop = isVisible(`${id}images`);

  // when on desktop: navigate between sets of images
  // when on mobile: navigate between images
  if (isDesktop) {
    // change the page and set the image to the first one on the page
    const page = setGalleryPageOffset(id, increment);
    setGalleryImageOffset(id, page * PAGE_SIZE);
  } else {
    // set the image to the next or previous
    setGalleryImageOffset(id, galleries[id].imageOffset + increment);
  }
  render(id, id.concat(focusEl));
}

/* UTILITY FUNCTIONS */
const isVisible = id => document.getElementById(id).offsetLeft > 0;
const guid = () =>
  new Date().getTime().toString() + Math.floor(Math.random() * 1000000);

/* RENDERING FUNCTIONS */
function render(id, focusId) {
  // get main image
  const main = galleries[id].images
    .filter((_el, offset) => offset == galleries[id].imageOffset)
    .pop();

  const mainImage = main.querySelectorAll("img").item(0);

  const mainCaption = main.querySelectorAll("figcaption").item(0);

  // get pages of images
  const totalImages = galleries[id].images.length;
  const firstImage = galleries[id].pageOffset * PAGE_SIZE;
  const lastImage = firstImage + PAGE_SIZE;
  const pagination = galleries[id].images.length > PAGE_SIZE;
  const images = galleries[id].images.filter(
    (_el, offset) => offset >= firstImage && offset < lastImage
  );

  // IE returns null for getAttribute(...) whereas other browsers do return a value --> using .nodeValue as fallback for these specific cases
  const imgSource =
    mainImage.getAttribute("src") || mainImage.attributes.src.nodeValue;
  const imgAlt =
    mainImage.getAttribute("alt") || mainImage.attributes.alt.nodeValue;

  // render group of images
  const markUp = `
    <div class="c-photo-gallery__main-container">
      <figure>
        <div class="c-photo-gallery__main-window">
          <img class="c-photo-gallery__main-image"
            id="${`${id}primary`}"
            alt="${imgAlt}"
            src="${imgSource}">
        </div>
        <figcaption id="${`${id}name`}" class="c-photo-gallery__main-title">${
    mainCaption.innerHTML
  }</figcaption>
      </figure>
    </div>
    <div id="${`${id}images`}" class="c-photo-gallery__thumbnails c-thumbnail-count--${
    images.length
  } c-thumbnail-total--${totalImages}">
      ${renderImages(images, firstImage, id)}
    </div>
    ${renderNavigation(id, pagination)}
  `;

  // replace HTML in the page
  galleries[id].el.html(markUp);

  // if an element was passed in to focus on, set focus
  focusId ? document.getElementById(focusId).focus() : null;
}

function renderNavigation(id, pagination) {
  const hideOnDesktop = pagination ? "" : " hidden-md-up";
  return `<div class="c-photo-gallery__nav-btns${hideOnDesktop}">
      <a href="#gallery-previous"
        title="previous photos"
        role="navigation"
        id="${`${id}prev`}"
        data-gallery="${id}"
        data-image="navigation"
        data-increment="-1"><i class="fa fa-caret-left" aria-hidden="true"></i> Previous</a>
      <a href="#gallery-next"
        title="next photos"
        role="navigation"
        id="${`${id}next`}"
        data-gallery="${id}"
        data-image="navigation"
        data-increment="1">Next <i class="fa fa-caret-right" aria-hidden="true"></i></a>
    </div>`;
}

function renderImages(images, firstImage, id) {
  return images
    .map((image, offset) => {
      const firstImg = image.querySelectorAll("img").item(0);

      // IE returns null for getAttribute(...) whereas other browsers do return a value --> using .nodeValue as fallback for these specific cases
      const imgSource =
        firstImg.getAttribute("src") || firstImg.attributes.src.nodeValue;

      const imgAlt =
        firstImg.getAttribute("alt") || firstImg.attributes.alt.nodeValue;

      return `<a href="#gallery-image"
        data-image="gallery"
        data-gallery="${id}"
        id="${id + (firstImage + offset)}"
        role="navigation"
        title="change photo to '${imgAlt}'"
        data-offset="${firstImage + offset}">
          <img
            class="c-photo-gallery__thumbnail"
            alt="${imgAlt}"
            src="${imgSource}"></a>`;
    })
    .join("");
}

function replaceActiveImage(id, image) {
  const activeImage = document.getElementById(`${id}primary`);
  const activeImageName = document.getElementById(`${id}name`);

  const firstImage = image.querySelectorAll("img").item(0);

  activeImage.setAttribute("src", firstImage.getAttribute("src"));
  activeImage.setAttribute("alt", firstImage.getAttribute("alt"));
  activeImageName.innerHTML = image
    .querySelectorAll("figcaption")
    .item(0).innerHTML;
}
