/**
 * Template for a thumbnail item.
 * @param {} thumb
 */
export const thumbnail = (thumb) => {
  return `
    <li class="thumbnail hidden" data-image=${thumb.image} data-page=${thumb.page}>
      <img class="thumbnail__image" src=${thumb.image} />
      <div class="thumbnail__content">
        <p class="thumbnail__title">${thumb.title}</p>
      </div>
    </li>
  `;
};

export default thumbnail;
