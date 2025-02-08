# 🌦️ Weather-API-Dashboard

## **Description**

The **Weather API Dashboard** is a full-stack web application that allows users to check **real-time weather conditions** and a **5-day forecast** for any city worldwide. Users can search for a location, view current weather conditions, and revisit past searches from their history.  

This project integrates the **OpenWeather API** to fetch accurate weather data, stores user searches, and provides an attractive application for easy navigation and clean formatting for UX.

- **Motivation:** [Your motivation]
- **Why build this project:** [Your reason for choosing this project]
- **Problem solved:** [Describe what problem this project addresses]
- **What I learned:** [Key takeaways from this project]

---

## **📌 Table of Contents**
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Tests](#tests)
- [Questions](#questions)
- [Features](#features)

---

## **Installation**

To install and run this project locally, follow these steps:

### 1️⃣ Clone the Repository & Install Dependencies  
- Open your terminal and run:  
  ```bash
  git clone [YOUR_GITHUB_REPO_URL]
  cd Weather-API-Dashboard

- Move into the server directory and install dependencies:

cd develop/server
npm install

### 2️⃣ Set up enviroment & API key
Create an account at https://home.openweathermap.org/ and create your own API key
In VS code Create a .env file in the server/ folder and add your API information

### 3️⃣ In terminal build the TypeScript files:
Navigate to the server/ directory and run:
npx tsc

###  4️⃣ Start the development server
npm start

### 5️⃣ Launch application and start seeing the weather ⛅
Once server is started launch application using your Google Chrome browser and navigate to http://localhost:3001/

## Usage  

### 1️⃣ Enter a City Name  
- Type a city name in the search bar and submit the request.  

---

### 2️⃣ View Current Weather Conditions  
- The dashboard will display:  
  - **City name & date**  
  - **Temperature (°F)**  
  - **Humidity (%)**  
  - **Wind speed (MPH)**  
  - **Weather condition with an icon**  

---

### 3️⃣ Check the 5-Day Forecast  
- View daily weather details, including:  
  - **Temperature, humidity, and wind speed**  
  - **Weather condition for each day**  

---

### 4️⃣ Access Search History  
- Previous searches are saved for quick access.  

---

### 5️⃣ Reload Weather Data  
- Click on any previously searched city to instantly view its latest weather conditions. 

## Features  

- 🌦️ **Real-time weather updates** using the OpenWeather API 
- ☀️ **5-day forecast** for any location using search by city functionality 
- 🌨 **Search history** is saved for quick access & delete functionality provided
- 🌩 **User-friendly, responsive design with search history management.**  
- ☔ **Developed with TypeScript, Node.js, Express, and Vite.**  

## Contributing  

This project was completed using a combination of **tutoring sessions, office hours, and TA guidance**.  
Additionally, the following resources were utilized:  

- 💡 **[r/learnprogramming](https://www.reddit.com/r/learnprogramming/)** – Was referenced for setting up API applications
- 🤖 **GitHub Copilot** – AI-powered code suggestions for efficiency for debudding / fixes on code
- 🧠 **XpertAI** – Assisted in debugging and formatting errors

## License  

This project is licensed under the **MIT License**. 

## Tests  
All functionality in this application was tested manually and debugging was completed through VS code and Google Developer Tools.

## Questions  

If you have any questions, feel free to reach out:  

- **GitHub:** [CDavis126](https://github.com/cdavis126)  
- **Email:** CherieDavis126@gmail.com