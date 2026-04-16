# 🦷 DentalCare SaaS - Frontend

Modern, responsive React application for dental practice management.

## ✨ Features

### 👤 Patient Portal
- Book, reschedule, and cancel appointments
- View appointment history
- Write and manage reviews
- View invoices and payment history
- Update profile information

### 👨‍⚕️ Admin Dashboard
- Manage doctors and treatments (CRUD)
- View all appointments across the clinic
- Approve or reject patient reviews
- Generate and manage invoices
- Set doctor availability
- View revenue analytics

### 🎨 General Features
- Responsive design (mobile, tablet, desktop)
- Interactive animations with Framer Motion
- Real-time form validation
- Toast notifications for user actions

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| React Router DOM | Navigation |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Axios | HTTP Client |
| React Icons | Icons |
| Vite | Build Tool |

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/Usama112222/dental-saas.git
cd dental-saas/frontend

# Install dependencies
npm install

📁 Project Structure
text
frontend/
├── src/
│   ├── api/              # API configuration
│   ├── components/       # Reusable components
│   │   ├── dashboard/    # Admin & Patient dashboards
│   │   └── home/         # Landing page components
│   ├── context/          # AuthContext provider
│   ├── pages/            # Page components
│   ├── styles/           # Global styles & theme
│   ├── App.jsx
│   └── main.jsx
├── public/               # Static assets
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js

📄 Pages

Route	Description
/	Landing page
/login	User login
/register	User registration
/dashboard	User dashboard (role-based)
/admin/dashboard	Admin management panel
/patient/dashboard	Patient portal


🔌 API Integration
The frontend connects to the backend API at VITE_API_URL. All API requests are handled through Axios with automatic token authentication.

Key Endpoints Used
Method	Endpoint	Description
POST	/auth/login	User login
POST	/auth/register	User registration
GET	/doctors	Fetch all doctors
GET	/treatments	Fetch all treatments
GET	/appointments	Fetch appointments
POST	/appointments	Create appointment
POST	/reviews	Submit review
GET	/invoices	Fetch invoices
🧪 Available Scripts
Command	Description
npm run dev	Start development server
npm run build	Build for production
npm run preview	Preview production build
npm run lint	Run ESLint

🎨 Styling
The project uses Tailwind CSS with a custom theme defined in src/styles/theme.js, providing consistent colors, gradients, and reusable component classes.

📸 Screenshots
(Add screenshots of your application here)

🤝 Contributing
Fork the repository

Create feature branch (git checkout -b feature/amazing-feature)

Commit changes (git commit -m 'Add amazing feature')

Push to branch (git push origin feature/amazing-feature)

Open a Pull Request

📄 License
MIT © Usama Liaqat

👨‍💻 Author
Usama Liaqat

GitHub: @Usama112222

⭐ Star this repository if you find it useful!

text

## How to Add This README

```powershell
# Navigate to frontend folder
cd C:\Users\Usama\Desktop\dental-saas\frontend

# Create README.md
notepad README.md

# Paste the content above, save and close

# Add to git
git add README.md
git commit -m "Add frontend README documentation"
git push origin master
