/**
 * Current api pagination.
 * @type {number}
 */
export let currentPage = 0;

/**
 * Api page limit.
 * @type {number}
 */
const PAGE_LIMIT = 10;

/**
 * Api url.
 * @type {string}
 */
const API_URL =
  "https://openaccess-api.clevelandart.org/api/artworks/?q=van%20gogh&has_image=1&artist=van%20gogh";

/**
 * Formats fetched data with only the data we need.
 * @param  Object[] els
 * @returns {Object[]}
 */
const formatObjects = (els) => {
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
export const fetchImageData = () => {
  /**
   * Api url.
   * @type {string}
   */
  let url = `${API_URL}&limit=${PAGE_LIMIT}&skip=${currentPage}`;

  return fetch(url)
    .then((res) => res.json())
    .then((json) => {
      currentPage += 10;
      return formatObjects(json.data);
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export default { fetchImageData, currentPage };
