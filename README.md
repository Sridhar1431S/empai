# 📊 EMPAI – AI-Powered Dashboard for HR's

EMPAI is an intelligent dashboard platform designed for **HR's, solopreneurs, startups, and analysts** to transform raw data into **actionable insights, predictions, and visual analytics** using AI.

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

   <img width="1910" height="929" alt="Screenshot 2026-02-13 112500" src="https://github.com/user-attachments/assets/feaf054f-aea3-4a5c-aebc-85543d5893fc" />
     
<img width="1915" height="932" alt="Screenshot 2026-02-13 112530" src="https://github.com/user-attachments/assets/553ecb6a-f51e-4ea9-bacb-5b21e880f448" />

<img width="1912" height="927" alt="Screenshot 2026-02-13 112601" src="https://github.com/user-attachments/assets/afa20560-62ad-43c0-81b0-e36d92b990d3" />

<img width="1919" height="934" alt="Screenshot 2026-02-13 112619" src="https://github.com/user-attachments/assets/ace03c4b-8540-4443-ad92-00b33680ed9b" />

<img width="1912" height="926" alt="Screenshot 2026-02-13 112735" src="https://github.com/user-attachments/assets/d6b0251a-d810-4a05-9f96-c5282011bbfe" />

<img width="1915" height="928" alt="Screenshot 2026-02-13 112803" src="https://github.com/user-attachments/assets/e0c7db9a-6a69-4e6f-8fb4-d2099fae53e3" />

<img width="1919" height="933" alt="Screenshot 2026-02-13 112845" src="https://github.com/user-attachments/assets/0e8ea002-b948-40ce-859c-0563df83c210" />

<img width="1906" height="927" alt="Screenshot 2026-02-13 112950" src="https://github.com/user-attachments/assets/c43e6c4e-c12d-449c-b395-94867431586a" />

<img width="1919" height="932" alt="Screenshot 2026-02-13 113029" src="https://github.com/user-attachments/assets/49f65b9e-b603-460e-bc51-094c00f8d53e" />

<img width="1919" height="928" alt="Screenshot 2026-02-13 113103" src="https://github.com/user-attachments/assets/08100aa1-d52a-40a9-958f-30f51aabf185" />

<img width="1897" height="924" alt="Screenshot 2026-02-13 113148" src="https://github.com/user-attachments/assets/f280350b-77f2-4d0a-bf1f-e2d2d7b8f635" />


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
