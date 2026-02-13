# 📊 EMPAI – AI-Powered Dashboard for Solopreneurs

EMPAI is an intelligent dashboard platform designed for **solopreneurs, startups, and analysts** to transform raw data into **actionable insights, predictions, and visual analytics** using AI.

It allows users to upload datasets and automatically generates **interactive charts, KPIs, and predictions** for better decision-making.

---

## 🚀 Live Demo

🔗 https://empai.vercel.app

---

## 📌 Features

- 📈 **Automated Data Visualization**
  - Generates charts like bar, line, pie charts automatically

- 🤖 **AI-Based Insights**
  - Extracts meaningful patterns from uploaded data

- 🔮 **Predictive Analytics**
  - Forecasts trends using machine learning models

- 📊 **Interactive Dashboard**
  - Dynamic UI for exploring insights visually

- ⚡ **Real-Time Processing**
  - Fast response using backend APIs

- 🌐 **Web-Based Application**
  - Accessible from any device

---

## 🛠️ Tech Stack

### 🔹 Frontend
- React.js / Next.js
- Tailwind CSS
- Chart Libraries (Recharts / Chart.js)

### 🔹 Backend
- Flask (Python)
- REST APIs

### 🔹 AI / ML
- Pandas
- NumPy
- Scikit-learn

### 🔹 Deployment
- Frontend: Vercel
- Backend: Local / Ngrok / Cloud

---

## 📂 Project Structure

empai/
│
├── frontend/ # React / Next.js UI
│ ├── components/ # UI Components
│ ├── pages/ # Routing
│ ├── hooks/ # Custom Hooks
│ └── styles/
│
├── backend/ # Flask API
│ ├── app.py # Main Server
│ ├── routes/ # API Endpoints
│ ├── models/ # ML Models
│ └── utils/ # Helper Functions
│
├── public/ # Static Files
├── .env # Environment Variables
├── package.json
└── README.md


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Sridhar1431S/empai.git
cd empai

**Setup Frontend**
cd frontend
npm install
npm run dev

**SetUp Backend**
cd backend
pip install -r requirements.txt
python app.py

## **API Configuration**
http://localhost:5000

## **API Endpoints**
| Method | Endpoint  | Description          |
| ------ | --------- | -------------------- |
| POST   | /upload   | Upload dataset       |
| GET    | /charts   | Get generated charts |
| GET    | /insights | AI-based insights    |
| GET    | /predict  | Prediction results   |

**Screenshots**

**Use Cases**

📊 Business Analytics
📈 Sales Forecasting
📉 Trend Analysis
🚀 Startup Decision Making
📚 Academic Projects

**How It Works**

User uploads dataset (CSV / Excel)
Backend processes data using Pandas
Machine learning models analyze patterns
Charts and insights are generated
Dashboard displays results interactively

**Future Enhancements**

✅ User Authentication
✅ Real-time Data Streaming
✅ Advanced ML Models
✅ Export Reports (PDF)
✅ Multi-user Dashboards

**Author
Sridhar Reddy**

💼 AI & Full Stack Developer
🌐 GitHub: https://github.com/Sridhar1431S

📜 **License**

This project is licensed under the MIT License.
