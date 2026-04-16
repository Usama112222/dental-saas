# 🦷 DentalCare SaaS

**Complete Dental Practice Management System**

## 📋 Overview

DentalCare SaaS is a comprehensive dental practice management platform that streamlines appointment scheduling, patient management, billing, and clinic operations. Built with modern technologies, it provides role-based dashboards for administrators, doctors, and patients.

## ✨ Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin, Doctor, Patient, Staff)
- Secure password hashing with Bcrypt

### 📅 Appointment Management
- Book, reschedule, and cancel appointments
- Real-time availability checking
- Email/SMS notifications
- Appointment status tracking

### 👥 Patient Management
- Complete patient profiles
- Medical history tracking
- Treatment records
- Digital documents storage

### 👨‍⚕️ Doctor Management
- Profile management with images
- Specialization and experience tracking
- Availability scheduling
- Performance ratings

### 💊 Treatment Management
- Service catalog with pricing
- Treatment duration tracking
- Popular treatments highlighting
- Category organization

### ⭐ Review System
- Rate doctors (1-5 stars)
- Write detailed reviews
- Admin approval workflow
- Doctor rating aggregation

### 💰 Billing & Invoices
- Automatic invoice generation
- Multiple payment methods
- Payment tracking
- Revenue analytics
- PDF invoice export

### 📊 Dashboards
- **Admin Dashboard**: Complete clinic overview
- **Patient Dashboard**: Personal appointments and history
- **Doctor Dashboard**: Schedule and patient view

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| React Router DOM | Navigation |
| Axios | API Calls |
| React Icons | Icons |
| Vite | Build Tool |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express.js | Web Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| Bcrypt | Password Hashing |
| Multer | File Upload |

## 📁 Project Structure
dental-saas/
├── backend/
│ ├── controllers/ # Business logic
│ ├── models/ # Database schemas
│ ├── routes/ # API endpoints
│ ├── middleware/ # Auth & upload middleware
│ ├── uploads/ # Image uploads
│ └── server.js # Entry point
├── frontend/
│ ├── src/
│ │ ├── components/ # React components
│ │ ├── pages/ # Page components
│ │ ├── context/ # Auth context
│ │ ├── api/ # API configuration
│ │ └── styles/ # Global styles
│ └── public/ # Static assets
└── README.md

text

## 🚀 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn

### Step 1: Clone Repository

```bash
git clone https://github.com/Usama112222/dental-saas.git
cd dental-saas
Step 2: Backend Setup
bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm start
Step 3: Frontend Setup
bash
cd frontend
npm install
cp .env.example .env
# Edit .env with API URL
npm run dev
Step 4: Environment Variables
Backend (.env)

env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dental-saas
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
NODE_ENV=development
Frontend (.env)

env
VITE_API_URL=http://localhost:5000/api
🔐 Test Credentials
Role	Email	Password
Admin	admin@test.com	admin123
Patient	usama@gmail.com	123456
Doctor	david.kim@dentalcare.com	123456
Staff	staff@test.com	staff123
📡 API Endpoints
Authentication
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login user
GET	/api/auth/me	Get current user
Doctors
Method	Endpoint	Description
GET	/api/doctors	Get all doctors
GET	/api/doctors/:id	Get single doctor
POST	/api/doctors	Create doctor (Admin)
PUT	/api/doctors/:id	Update doctor (Admin)
Treatments
Method	Endpoint	Description
GET	/api/treatments	Get all treatments
GET	/api/treatments/:id	Get single treatment
POST	/api/treatments	Create treatment (Admin)
Appointments
Method	Endpoint	Description
GET	/api/appointments	Get appointments
POST	/api/appointments	Create appointment
PUT	/api/appointments/:id	Update appointment
PUT	/api/appointments/:id/cancel	Cancel appointment
Reviews
Method	Endpoint	Description
GET	/api/reviews/doctor/:doctorId	Get doctor reviews
POST	/api/reviews	Create review
PUT	/api/reviews/:id/status	Update status (Admin)
Invoices
Method	Endpoint	Description
GET	/api/invoices	Get invoices
POST	/api/invoices	Create invoice
PUT	/api/invoices/:id/pay	Process payment


📸 Screenshots
Homepage
https://via.placeholder.com/800x400?text=Homepage+Screenshot

Admin Dashboard
https://via.placeholder.com/800x400?text=Admin+Dashboard

Patient Dashboard
https://via.placeholder.com/800x400?text=Patient+Dashboard

Appointment Booking
https://via.placeholder.com/800x400?text=Appointment+Booking

(Add your actual screenshots here)

🚀 Deployment
Backend Deployment (Render/Cycle)
Push code to GitHub

Connect repository to Render

Add environment variables

Deploy

Frontend Deployment (Vercel/Netlify)
bash
cd frontend
npm run build
# Deploy the dist folder to Vercel or Netlify
📱 Responsive Design
The application is fully responsive and works on:

Desktop (1920x1080)

Laptop (1366x768)

Tablet (768x1024)

Mobile (375x667)

🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the repository

Create a feature branch (git checkout -b feature/amazing-feature)

Commit changes (git commit -m 'Add amazing feature')

Push to branch (git push origin feature/amazing-feature)

Open a Pull Request

📄 License
MIT License - see LICENSE file for details

👨‍💻 Author
Usama Liaqat

GitHub: @Usama112222

Email: ukiyani318@gmail.com

🙏 Acknowledgments
Unsplash for images

React Icons for icon library

Tailwind CSS for styling framework

📞 Support
For support, please open an issue on GitHub or contact via email.

⭐ Show Your Support
If you find this project useful, please give it a star! ⭐

Live Demo: (Coming soon)

Repository: https://github.com/Usama112222/dental-saas
