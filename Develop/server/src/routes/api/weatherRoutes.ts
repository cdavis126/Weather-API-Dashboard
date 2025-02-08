import { Router, type Request, type Response } from "express";
import dotenv from "dotenv";
import WeatherService from "../../service/weatherService.js";
import HistoryService from "../../service/historyService.js";

dotenv.config();
const router = Router();

// POST Request: Fetch weather & save to history
router.post("/", async (req: Request, res: Response) => {
  const { cityName } = req.body;
  
  if (!cityName) {
    return res.status(400).json({ error: "City name required" }); // ✅ Ensure this returns
  }

  try {
    const weatherData = await WeatherService.getWeatherForCity(cityName);
    await HistoryService.addCity(cityName);
    return res.json( weatherData ); // ✅ Ensure this returns
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch weather" }); // ✅ Ensure this returns
  }
});
// GET Request: Retrieve search history
router.get("/history", async (_req: Request, res: Response) => {
  const history = await HistoryService.getCities();
  res.json(history);
});

// DELETE Request: Remove city from search history
router.delete("/history/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = await HistoryService.removeCity(id);

  if (deleted) {
    res.json({ message: "City deleted successfully" });
  } else {
    res.status(404).json({ error: "City not found" });
  }
});

export default router;