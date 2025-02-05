import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url"; // ✅ Import required for ES module path handling

// ✅ Fix for `__dirname` in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// TODO: Define a City class with name and id properties
class City {
  id: string;
  name: string;

  constructor(name: string) {
    this.id = uuidv4(); //  unique ID FE city 
    this.name = name;
  }
}
// TODO: Complete the HistoryService class
class HistoryService {
  private historyFile: string;

  constructor() {
    this.historyFile = path.join(__dirname, "../../db/db.json"); // search your jscon file
  }// TODO: Define a read method that reads from the searchHistory.json file--idk if this works need to go back and check
  
  private async read(): Promise<City[]> {
    try {
      if (!fs.existsSync(this.historyFile)) return [];
      const data = fs.readFileSync(this.historyFile, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading search history:", error);
      return [];
    }
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]): Promise<void> {
    try {
      fs.writeFileSync(this.historyFile, JSON.stringify(cities, null, 2), "utf-8");
    } catch (error) {
      console.error("Error writing search history:", error);
    }
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  // async getCities() {}
  async getCities(): Promise<City[]> {
    return await this.read();
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // async addCity(city: string) {}
  async addCity(cityName: string): Promise<City> {
    const cities = await this.read();
    const newCity = new City(cityName);
    cities.push(newCity);
    await this.write(cities);
    return newCity;
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // need to check if I'm going to keep this or not
  async removeCity(id: string): Promise<boolean> {
    let cities = await this.read();
    const filteredCities = cities.filter((city) => city.id !== id);
    if (cities.length === filteredCities.length) return false; // City not found
    await this.write(filteredCities);
    return true;
  }
}

export default new HistoryService();
