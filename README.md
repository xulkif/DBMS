# WKU DBMS (Wolkite University Dormitory Management System)

A comprehensive Dormitory Management System for Wolkite University, built with the MERN stack. This system streamlines dorm allocation, block and dorm management, student activity control, maintenance issue handling, and real-time communication between users. It supports multiple user roles, each with tailored functionalities.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Actors / User Roles](#actors--user-roles)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Screenshots / Demo](#screenshots--demo)

---

## Features
- Student dorm allocation and management
- Block and dormitory administration
- Student activity monitoring and control
- Maintenance issue reporting and tracking
- Real-time user communication (chat)
- Role-based dashboards and access control
- Feedback and reporting system
- Attendance management
- Account and profile management

## Tech Stack
- **Frontend:** React, Vite, Redux Toolkit, Tailwind CSS, Bootstrap, Socket.io-client, Radix UI, Framer Motion, Axios, React Router, and more
- **Backend:** Node.js, Express, MongoDB, Mongoose, Socket.io, JWT, Multer, Cloudinary, Nodemailer
- **Other:** ESLint, PostCSS, PapaParse, XLSX, jsPDF, and more

## Actors / User Roles
- **Admin:** Full system management, user and dorm control, communication
- **Student Dean:** Student oversight, reporting, dorm allocation, maintenance
- **Proctor Manager:** Proctor oversight, block management, reporting
- **Proctor:** Block-level management, student activity control, reporting
- **Student:** Dorm information, maintenance requests, feedback, communication

## Project Structure
```
/ (root)
├── client/           # Frontend (React + Vite)
│   ├── src/
│   │   ├── pages/    # Main pages for each actor (Admin, Student, Dean, Proctor, etc.)
│   │   ├── components/
│   │   ├── store/    # Redux store
│   │   ├── context/  # React context
│   │   ├── utils/    # Utility functions
│   │   └── ...
│   └── ...
├── server/           # Backend (Node.js + Express)
│   ├── controllers/  # Main business logic
│   ├── routes/       # API endpoints
│   ├── models/       # Mongoose models
│   ├── middleware/   # Express middleware
│   ├── uploads/      # File uploads
│   └── ...
└── README.md         # Project documentation
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### Installation
1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd MERN-Stack-DMS
   ```
2. **Install dependencies:**
   - Frontend:
     ```bash
     cd client
     npm install
     # or yarn
     ```
   - Backend:
     ```bash
     cd ../server
     npm install
     # or yarn
     ```

### Environment Variables
Create a `.env` file in the `server` directory with the following (example):
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
```
Adjust/add variables as needed for your deployment.

### Running the App
- **Start the backend:**
  ```bash
  cd server
  npm run dev
  ```
- **Start the frontend:**
  ```bash
  cd client
  npm run dev
  ```
- The frontend will typically run on [http://localhost:5173](http://localhost:5173) and the backend on [http://localhost:5000](http://localhost:5000) (or as configured).

## Scripts
### Frontend (client)
- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build
- `npm run lint` – Lint code

### Backend (server)
- `npm run dev` – Start backend with nodemon
- `npm start` – Start backend

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request. For major changes, open an issue first to discuss what you would like to change.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License
This project is licensed under the MIT License.

## Contact
For questions, suggestions, or support, please contact: [your-email@example.com]

## Screenshots / Demo
> _Add screenshots or a link to a live demo here_

---

**WKU DBMS** – Dormitory Management System for Wolkite University 