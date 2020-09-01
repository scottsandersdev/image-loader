/**
 * Current api pagination.
 * @type {number}
 */
export let currentPage = 0;

/**
 * Api page limit.
 * @type {number}
 */
let pageLimit = 10;

/**
 * Formats fetched data with only the data we need.
 * @param  Object[] els
 * @returns {Object[]}
 */
const createObjects = (els) => {
  return els.map((el) => ({
    image: el.images.web.url,
    title: el.title,
    page: currentPage,
  }));
};

/**
 * Fetches new thumbnail data from api.
 * @returns {Object[]}
 */
export const loadImages = () => {
  /**
   * Api url.
   * @type {string}
   */
  let url = `https://openaccess-api.clevelandart.org/api/artworks/?q=van%20gogh&has_image=1&limit=${pageLimit}&skip=${currentPage}`;

  return fetch(url)
    .then((res) => res.json())
    .then((json) => {
      currentPage += 10;
      return createObjects(json.data);
    })
    .catch((err) => err);
};

export default { loadImages, currentPage };
