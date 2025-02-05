import dotenv from 'dotenv';
import https from "https";
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}
// TODO: Define a class for the Weather object
class Weather {
  city: string;
  temperature: number;
  windSpeed: number;
  humidity: number;
  description: string;
  icon: string;
  forecast: any[]; // 

  constructor(
    city: string,
    temperature: number,
    windSpeed: number,
    humidity: number,
    description: string,
    icon: string,
    forecast: any[] // 
  ) {
    this.city = city;
    this.temperature = temperature;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
    this.description = description;
    this.icon = icon;
    this.forecast = forecast; // ✅ Store forecast data
  }
}
// TODO: Complete the WeatherService class
class WeatherService {
    private baseURL = "https://api.openweathermap.org";
    private apiKey = process.env.OPENWEATHER_API_KEY || "";

  // TODO: Create fetchLocationData method private async fetchLocationData(query: string) {}
  private async fetchLocationData(query: string): Promise<Coordinates> {
    const url = this.buildGeocodeQuery(query);
    return new Promise((resolve, reject) => {
      https.get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          const response = JSON.parse(data);
          if (!response.length) return reject("City not found");
          resolve(this.destructureLocationData(response[0]));
        });
      }).on("error", (err) => reject(err));
    });
  }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: any): Coordinates {
    return {
      lat: locationData.lat,
      lon: locationData.lon,
    };
  }
    // TODO: Create buildGeocodeQuery method
private buildGeocodeQuery(city: string): string {
  return `${this.baseURL}/geo/1.0/direct?q=${city}&limit=1&appid=${this.apiKey}`;
}
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=imperial`;
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(city: string): Promise<Coordinates> {
    const locationData = await this.fetchLocationData(city);
    return this.destructureLocationData(locationData);
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const url = this.buildWeatherQuery(coordinates);
    return new Promise((resolve, reject) => {
      https.get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(JSON.parse(data)));
      }).on("error", (err) => reject(err));
    });
  }

  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any, city: string): Weather {
    const current = response.list[0];
    return new Weather(
      city,
      current.main.temp,
      current.wind.speed,
      current.main.humidity,
      current.weather[0].description,
      current.weather[0].icon,
      this.buildForecastArray(response.list)
    );
  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(weatherData: any[]): any[] {
    return weatherData.filter((_entry: any, index: number) => index % 8 === 0).slice(1, 6);
  }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string): Promise<Weather> {
    const coordinates = await this.fetchAndDestructureLocationData(city);
    const weatherData = await this.fetchWeatherData(coordinates);
    return this.parseCurrentWeather(weatherData, city);
  }
}

export default new WeatherService();
