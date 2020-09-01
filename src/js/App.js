import { loadImages, currentPage } from "./load-images";
import { thumbnail } from "./thumbnail";

/** Class representing a gallery application. */
export class App {
  /**
   * Initialize variables
   */
  constructor() {
    this.loadMoreBtn = null;
    this.listEl = null;
    this.modalEl = document.querySelector(".modal");
    this.modalImage = this.modalEl.querySelector(".modal__image");
    this.init();
  }

  /**
   * Assignment of variables and initial rendering of app
   */
  init() {
    this.listEl = document.querySelector(".thumbnail__list");
    this.loadMoreBtn = document.querySelector(".load-more-btn");
    this.loadMoreBtn.addEventListener("click", () => {
      this.addNewThumbnails();
    });
    this.attachModalCloseEvent();
    this.addNewThumbnails();
  }

  /**
   * Appends thumbnail images to dom
   */
  async addNewThumbnails() {
    this.toggleLoadMoreBtn();
    const data = await loadImages();
    const markup = `${data.map((thumb) => thumbnail(thumb)).join("")}`;
    this.listEl.insertAdjacentHTML("beforeend", markup);
    if (currentPage < 50) {
      this.toggleLoadMoreBtn();
    }
    this.attachModalOpenEvents();
  }

  /**
   * Attaches event listeners to new thumbnails to toggle
   * its corresponding modal
   */
  attachModalOpenEvents() {
    const thumbItems = document.querySelectorAll(
      `.thumbnail__item[data-page="${currentPage}"]`
    );

    thumbItems.forEach((thumb) => {
      thumb.addEventListener("click", () => {
        console.log(thumb);
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
  attachModalCloseEvent() {
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
   * button during fetch
   */
  toggleLoadMoreBtn() {
    this.loadMoreBtn.disabled = !!this.loadMoreBtn.disabled;
    this.loadMoreBtn.classList.toggle("hidden");
  }
}

export default App;
