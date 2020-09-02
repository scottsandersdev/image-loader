import { fetchImageData, currentPage } from "./fetch-image-data";
import { thumbnail } from "./thumbnail";

/** Class representing a gallery application. */
export class App {
  /**
   * Initialize variables
   */
  constructor() {
    this.loadMoreBtn = document.querySelector(".load-more-btn");
    this.listEl = document.querySelector(".thumbnail__list");
    this.thumbnails = null;
    this.modalEl = document.querySelector(".modal");
    this.modalImage = this.modalEl.querySelector(".modal__image");
    this.init();
  }

  /**
   * Initial rendering of app
   */
  init() {
    this.loadMoreBtn.addEventListener("click", () => {
      this.addNewThumbnails();
    });
    this.addModalCloseEvent();
    this.addNewThumbnails();
  }

  /**
   * Appends thumbnail images to dom once loaded
   */
  async addNewThumbnails() {
    this.toggleLoadingState();
    const data = await fetchImageData();
    const markup = data.map((thumb) => thumbnail(thumb)).join("");
    this.listEl.insertAdjacentHTML("beforeend", markup);
    await this.waitForImageLoad();
    this.addModalOpenEvents();
    this.toggleLoadingState();
  }

  /**
   * Listens for all new images to load
   */
  waitForImageLoad() {
    this.thumbnails = document.querySelectorAll(
      `.thumbnail[data-page="${currentPage}"]`
    );

    return new Promise((resolve, reject) => {
      const totalImages = 10;
      let imagesLoaded = 0;
      this.thumbnails.forEach((thumb) => {
        const image = thumb.querySelector(".thumbnail__image");
        image.addEventListener("load", () => {
          if (++imagesLoaded === totalImages) {
            resolve("loaded");
          }
        });
      });
    });
  }

  /**
   * Reveals new thumbnails and attaches event listeners to
   * toggle its corresponding modal
   */
  addModalOpenEvents() {
    this.thumbnails.forEach((thumb) => {
      thumb.classList.remove("hidden");
      thumb.addEventListener("click", () => {
        const imgUrl = thumb.getAttribute("data-image");
        this.modalImage.src = imgUrl;
        this.modalEl.classList.add("open");
      });
    });
  }

  /**
   * Attaches event listener to close modal if user clicks
   * outside the image
   */
  addModalCloseEvent() {
    this.modalEl.addEventListener("click", (e) => {
      const isClickOutside = !this.modalImage.contains(e.target);

      if (isClickOutside) {
        this.modalImage.src = "";
        this.modalEl.classList.remove("open");
      }
    });
  }

  /**
   * Toggles visibility and disabled property of load more
   * button during fetch.
   */
  toggleLoadingState() {
    this.loadMoreBtn.disabled = !this.loadMoreBtn.disabled;
    if (currentPage < 50) {
      this.loadMoreBtn.classList.toggle("loading");
    } else {
      this.loadMoreBtn.classList.toggle("hidden");
    }
    if (currentPage === 10) {
      document.querySelector(".loading-spinner").classList.add("hidden");
    }
  }
}

export default App;
