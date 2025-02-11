

# 📅 Days Calendar Project  

### 🚀 Collaborators: [Rihanna](https://github.com/RihannaP) & [Donara](https://github.com/donarbl)  

## 📌 Project Overview  
Some commemorative days occur annually but on a variable date each year (e.g., **Ada Lovelace Day** falls on the second Tuesday of October). This project dynamically generates a **calendar interface** that displays these special days based on a JSON dataset.  

The goal is to present this data **usefully and interactively** for users, allowing them to navigate through months, select a specific year, and view special commemorative days dynamically.

---

## 🏗 Features  

✔️ **Dynamic Calendar UI** - Displays the days of the current month in a structured weekly grid.  
✔️ **Previous/Next Month Navigation** - Users can navigate through months using buttons.  
✔️ **Month & Year Selection** - Users can jump directly to a specific month and year.  
✔️ **Automatic Commemorative Days Calculation** - Special days are calculated dynamically from the JSON file.  
✔️ **Persistent Date Logic** - Works across different years (e.g., 1900, 2050, etc.).  
✔️ **No Hardcoded Dates** - Events are dynamically generated.  
✔️ **Unit Tests** - Ensures code reliability.  
✔️ **iCal Export (for groups of 2+)** - Generates an `.ics` file for Google Calendar imports.  
✔️ **Event Descriptions (for groups of 3+)** - Clicking on an event fetches more details.  



## 🎯 Usage  

### 1️⃣ **Clone the Repository**  
```sh
git clone https://github.com/RihannaP/Piscine-Project-Days-Calendar.git
cd days-calendar
```

### 2️⃣ **Install Dependencies**  
```sh
npm install
```

### 3️⃣ **Run a Local Server**  
Since the project uses ES modules, you need an HTTP server to run it:  
```sh
npx http-server
```
Then, open `http://localhost:8080` in your browser.


---

## 🔍 Testing  

Run unit tests using:  
```sh
npm test
```

For **Google Calendar Import Testing**, follow the steps:  
1. Generate the `.ics` file:
   ```sh
   node generate-ical.js > events.ics
   ```
2. Import the `.ics` file into Google Calendar.
3. Verify events appear on the correct dates.

---




🚀 **Happy Coding!** Let us know if you have any questions! 😊  
```  

