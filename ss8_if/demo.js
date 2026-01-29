import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = 3000;
const API_KEY = "V9VudphCWAnw6SAUI9S16x0hHDwt3Rfl";

app.get("/api/webcams", async (req, res) => {

  const lat = 16.0471;
  const lon = 108.2068;
  const radius  = 20;

  try {
    const url = `https://openwebcamdb.com/api/v1/countries/vn`;

    const response = await fetch(url, {
      headers: {
        "Authorization": "Bearer 47|R7uTgQhThCj6G9IIwawMd3dGNgdob1AFSTRiJOdHef85babc"
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () =>
  console.log(`Proxy running at http://localhost:${PORT}`)
);

app.get("/api/webcams/detail", async (req, res) => {
    const id  = 1690982954;
  
    try {
      const response = await fetch(
        `https://api.windy.com/webcams/api/v3/webcams/${id}`,
        {
          headers: {
            "x-windy-api-key": API_KEY
          }
        }
      );
  
      if (!response.ok) {
        const text = await response.text();
        console.error("API Error response:", text);
        return res.status(response.status).send(text);
      }
  
      const data = await response.json();
  
      console.log("API Response data:");
      console.log(JSON.stringify(data, null, 2));
  
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
