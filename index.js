import express from "express";
import cors from "cors";
import playwright from 'playwright';

const app = new express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const DOMElements = {
  acceptGoogleCookies: "text='Aceptar todo'",
  searchInput: "#searchboxinput",
  thumbnail: 'div[role=main] img[decoding="async"]',
  placeName: "h1",
  placeAddress: "button[data-item-id='address'] > div > div:nth-child(2) > div:nth-child(1)",
  // placeRating: 'div[role=main] > div:nth-child(2) > div > div > div:nth-child(2) >div > div > div:nth-child(2) > span > span[aria-hidden=true]',
  shareButton: 'button[data-value="Compartir"]',
  shareURL: 'input[readonly]',
}

app.post("/api/places", async ({body}, res) => {
  const { city, places } = body;
  const formatedPlaces = places.split("\n").map((place) => place.trim());
  console.log(formatedPlaces);

  const placesData = [];
  for (const place of formatedPlaces) {
    const placeData = await getPlace({name: place, city});
    placesData.push(placeData);
  }

  res.json(placesData.filter((place) => place.placeFound).map((place) => ({
    name: place.name,
    address: place.address,
    thumbnail: place.thumbnail,
    url: place.url,
    visited: place.visited
  })));
});

const getPlace = async ({name, city}) => {
  
  const browser = await playwright["chromium"].launch({
    headless: false,
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://www.google.com/maps");

  // await page.waitForTimeout(3000);

  await page.waitForSelector(DOMElements.acceptGoogleCookies);
  await page.click(DOMElements.acceptGoogleCookies);
  
  // await page.waitForTimeout(1000);

  await page.waitForSelector(DOMElements.searchInput);
  await page.type(DOMElements.searchInput, `${name} ${city}`)


  await page.press(DOMElements.searchInput, "Enter");

  try {
    await page.waitForSelector(DOMElements.shareButton, {timeout: 5000});
    await page.click(DOMElements.shareButton);

    const data = {
      name: await page.textContent(DOMElements.placeName),
      address: await page.textContent(DOMElements.placeAddress),
      thumbnail: await page.getAttribute(DOMElements.thumbnail, "src"),
      url: await page.getAttribute(DOMElements.shareURL, "value"),
      placeFound: true,
      visited: false
    }

    console.log(data.name + " encontrado");
  
    return data

  } catch (error) {
    console.log("Había más de un sitio");
  } finally {
    browser.close();
  }

  return {
    name,
    placeFound: false
  }
}

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});