import { fetchImageData, currentPage } from "./fetch-image-data";

const returnData = {
  data: [
    {
      id: 135299,
      title: "Adeline Ravoux",
      images: {
        web: {
          url:
            "https://openaccess-cdn.clevelandart.org/1958.31/1958.31_web.jpg",
        },
      },
    },
    {
      id: 125249,
      title: "The Large Plane Trees (Road Menders at Saint-Rémy)",
      images: {
        web: {
          url:
            "https://openaccess-cdn.clevelandart.org/1947.209/1947.209_web.jpg",
        },
      },
    },
    {
      id: 135310,
      title: "Two Poplars in the Alpilles near Saint-Rémy",
      images: {
        web: {
          url:
            "https://openaccess-cdn.clevelandart.org/1958.32/1958.32_web.jpg",
        },
      },
    },
    {
      id: 135286,
      title: "Landscape with Wheelbarrow",
      images: {
        web: {
          url:
            "https://openaccess-cdn.clevelandart.org/1958.30/1958.30_web.jpg",
        },
      },
    },
  ],
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(returnData),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

describe("Fetch image data utility", () => {
  it("fetches data from server and returns a formatted object", async () => {
    const apiUrl =
      "https://openaccess-api.clevelandart.org/api/artworks/?q=van%20gogh&has_image=1&limit=10&skip=0&artist=van%20gogh";

    const formattedData = await fetchImageData();

    expect(formattedData[0]).toHaveProperty("image");
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(apiUrl);
    expect(currentPage).toBe(10);
  });

  it("Returns null when an exception occurs", async () => {
    fetch.mockImplementationOnce(() => Promise.reject(null));
    const formattedData = await fetchImageData();

    expect(formattedData).toEqual(null);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
