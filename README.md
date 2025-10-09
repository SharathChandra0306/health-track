# HealthTrack - Full Stack Application

A comprehensive healthcare tracking system with complete frontend-backend integration. Built with React + Tailwind CSS frontend and Spring Boot + PostgreSQL backend.

## 🚀 Quick Start

### Backend Setup
1. Navigate to backend:
   ```bash
   cd backend/Evernorth
   ```
2. Start Spring Boot server:
   ```bash
   ./mvnw spring-boot:run
   ```
   Server runs on: `http://localhost:8080`

### Frontend Setup
1. Navigate to frontend:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm start
   ```
   Application runs on: `http://localhost:3000`

## 🏗️ Architecture

### Backend (Spring Boot)
- **Framework**: Spring Boot 3.5.5 with Java 21
- **Database**: PostgreSQL (cloud-hosted via Railway)
- **Authentication**: JWT-based security
- **API**: RESTful endpoints with CORS configuration
- **Features**: User management, hospital tracking, medical records

### Frontend (React)
- **Framework**: React 18 with modern hooks
- **Styling**: Tailwind CSS with responsive design
- **Authentication**: JWT token management with Context API
- **Animations**: GSAP with ScrollTrigger effects
- **API Integration**: Real HTTP calls (no mocks)

## 📁 Project Structure

```
backend/Evernorth/          Spring Boot application
├── src/main/java/com/Evernorth/Evernorth/
│   ├── controller/         REST API controllers
│   ├── entity/            JPA entities
│   ├── repository/        Data repositories
│   ├── service/           Business logic
│   ├── security/          JWT security configuration
│   └── config/            Application configuration
└── src/main/resources/
    └── application.properties

frontend/                   React application
├── src/
│   ├── components/        Reusable UI components
│   ├── pages/            Application pages
│   ├── context/          AuthContext provider
│   ├── hooks/            Custom React hooks
│   └── mock/             Mock data (legacy)
└── public/
```

## ✨ Features

### 🔐 Authentication System
- **User Registration**: Create new accounts with validation
- **Login/Logout**: Secure JWT-based authentication
- **Profile Management**: Update user information
- **Session Persistence**: Automatic token management

### 🏥 Healthcare Features
- **Hospital Search**: Find healthcare facilities
- **Medical Records**: Manage patient information
- **Appointment Booking**: Schedule medical appointments
- **Emergency Contacts**: Quick access to emergency services
- **Dashboard**: Personalized health tracking interface

### 🎨 User Experience
- **Responsive Design**: Works on all device sizes
- **Modern UI**: Clean, professional healthcare interface
- **Smooth Animations**: GSAP-powered interactions
- **Form Validation**: Comprehensive input validation
- **Error Handling**: User-friendly error messages

## 🔗 API Integration

The application uses real backend APIs through `apiClient.js`:

### Authentication Endpoints
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User authentication  
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile

### Application Endpoints
- `GET /api/hospitals` - List hospitals
- `GET /api/hospitals/:id` - Get hospital details
- `POST /api/appointments` - Book appointments
- `GET /api/medical-records` - Get medical records

## 🛠️ Technical Stack

### Backend Technologies
- **Java 21** - Latest LTS version
- **Spring Boot 3.5.5** - Framework
- **Spring Security** - JWT authentication
- **Spring Data JPA** - Database operations
- **PostgreSQL** - Primary database
- **Maven** - Dependency management

### Frontend Technologies
- **React 18** - UI framework
- **Tailwind CSS** - Styling framework
- **React Hook Form** - Form management
- **GSAP** - Animations library
- **React Router** - Navigation
- **Axios** - HTTP client

## 🚀 Development

### Prerequisites
- **Java 21+** - Required for Spring Boot backend
- **Node.js 16+** - Required for React frontend
- **PostgreSQL** - Database (or use provided cloud instance)
- **Maven** - For Java dependency management
- **Git** - Version control

### Environment Configuration
1. **Backend Configuration** (`backend/Evernorth/src/main/resources/application.properties`):
   ```properties
   spring.datasource.url=jdbc:postgresql://your-db-host:5432/your-db-name
   spring.datasource.username=your-username
   spring.datasource.password=your-password
   jwt.secret=your-jwt-secret-key
   ```

2. **Frontend Configuration**: No additional configuration needed - connects to `localhost:8080` by default.

### Running in Production
1. **Backend**: Build with `./mvnw clean package` and run the generated JAR
2. **Frontend**: Build with `npm run build` and serve the `build/` directory

## 📊 Current Status

✅ **Fully Integrated** - Backend and frontend are completely connected  
✅ **Database Connected** - PostgreSQL database operational  
✅ **Authentication Working** - JWT-based login/signup functional  
✅ **API Endpoints Active** - All REST APIs responding  
✅ **UI/UX Complete** - Modern, responsive interface with animations  
✅ **Form Validation** - Comprehensive input validation implemented  
✅ **Error Handling** - Proper error management throughout the application  

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---
**HealthTrack** - Your comprehensive healthcare management solution 🏥✨

- All data currently comes from `src/mock/data.json` via hooks. Replace with real APIs when ready.
