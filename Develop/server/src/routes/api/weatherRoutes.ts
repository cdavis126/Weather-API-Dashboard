import { Router, type Request, type Response } from "express";
import dotenv from "dotenv";
import { fetchWeather } from "../../service/weatherService";
import { readHistory, saveCity, deleteCity } from "../../service/historyService";

dotenv.config();
const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { city } = req.body;
  if (!city) return res.status(400).json({ error: "City name required" });

  try {
    const weatherData = await fetchWeather(city);
    const savedCity = saveCity(weatherData.city, weatherData.lat, weatherData.lon);
    res.json({ ...savedCity, weather: weatherData.weather });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather" });
  }
});

// TODO: GET search history
router.delete("/history/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  if (deleteCity(id)) {
    res.json({ message: "City deleted successfully" });
  } else {
    res.status(404).json({ error: "City not found" });
  }
});

// * BONUS TODO: DELETE city from search history
router.delete("/history/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  if (deleteCity(id)) {
    res.json({ message: "City deleted successfully" });
  } else {
    res.status(404).json({ error: "City not found" });
  }
});

export default router;
