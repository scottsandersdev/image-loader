import { loadImages, currentPage } from "./load-images";

const returnData = {
  data: [
    {
      id: 135299,
      title: "Adeline Ravoux",
      fun_fact:
        "Adeline Ravoux, at age 13, was not pleased with her portrait and did not think the image resembled her. Today, a photograph exists of Adeline in her late seventies and the resemblance is truly remarkable.",
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
      fun_fact:
        "During his Saint-Rémy period, Van Gogh painted 150 canvases and some 100 drawings. He painted nature as he saw it without enhancement and felt that painting would help cure him of his illness.",
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
      fun_fact:
        "Vincent van Gogh made this watercolor just over a year after beginning to work professionally as an artist.",
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

describe("Image loader - api fetching", () => {
  it("fetches data from server and returns a formatted object", async (done) => {
    const apiUrl =
      "https://openaccess-api.clevelandart.org/api/artworks/?q=van%20gogh&has_image=1&limit=10&skip=0";

    const cleanedData = await loadImages();

    expect(cleanedData[0]).toHaveProperty("image");
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(apiUrl);
    expect(currentPage).toBe(10);

    process.nextTick(() => {
      global.fetch.mockClear();
      done();
    });
  });
});
