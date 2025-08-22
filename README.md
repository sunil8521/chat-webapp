# 💬 Real-Time Chat WebApp

A modern, real-time chat application built with WebSocket technology, featuring a responsive UI and secure authentication.

## ✨ Features

- **Real-time messaging** with WebSocket connections
- **User authentication** with JWT tokens
- **Responsive design** optimized for all devices
- **Profile management** with avatar upload
- **Multiple chat rooms** support
- **Message history** with pagination
- **Online status** indicators
- **Secure password management**

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd cohotWS
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**

   ```bash
   # Backend (.env)
   MONGODB_URI=mongodb://localhost:27017/chatapp
   JWT_SECRET=your-secret-key
   PORT=5000

   # Frontend (.env)
   VITE_API_URL=http://localhost:5000
   VITE_WS_URL=ws://localhost:5000
   ```

5. **Start the development servers**

   ```bash
   # Backend (Terminal 1)
   cd backend
   npm run dev

   # Frontend (Terminal 2)
   cd frontend
   npm run dev
   ```

## 📦 Tech Stack

### Backend Dependencies

| Package        | Version | Purpose                         |
| -------------- | ------- | ------------------------------- |
| `express`      | ^4.18.0 | Web framework for Node.js       |
| `mongoose`     | ^7.0.0  | MongoDB object modeling         |
| `ws`           | ^8.13.0 | WebSocket server implementation |
| `jsonwebtoken` | ^9.0.0  | JWT authentication              |
| `bcryptjs`     | ^2.4.3  | Password hashing                |
| `cors`         | ^2.8.5  | Cross-origin resource sharing   |
| `multer`       | ^1.4.5  | File upload handling            |
| `dotenv`       | ^16.0.3 | Environment variable management |

### Frontend Dependencies

| Package               | Version | Purpose                       |
| --------------------- | ------- | ----------------------------- |
| `react`               | ^18.2.0 | UI library                    |
| `vite`                | ^4.3.0  | Build tool and dev server     |
| `@mui/joy`            | ^5.0.0  | Modern Material-UI components |
| `@mui/icons-material` | ^5.11.0 | Material Design icons         |
| `react-router-dom`    | ^6.10.0 | Client-side routing           |
| `react-hook-form`     | ^7.43.0 | Form validation               |
| `@reduxjs/toolkit`    | ^1.9.0  | State management              |
| `react-redux`         | ^8.0.0  | React-Redux bindings          |
| `axios`               | ^1.4.0  | HTTP client                   |
| `react-hot-toast`     | ^2.4.0  | Toast notifications           |

## 🏗️ Project Structure

```
cohotWS/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── models/         # MongoDB schemas
│   │   ├── middleware/     # Auth & validation
│   │   ├── routes/         # API routes
│   │   └── utils/          # Helper functions
│   ├── uploads/            # File storage
│   └── server.js           # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── redux/          # State management
│   │   ├── context/        # React context
│   │   └── shared/         # Shared utilities
│   └── public/             # Static assets
└── README.md
```

## 🔧 Available Scripts

### Backend

```bash
npm run dev          # Start development server with nodemon
npm start           # Start production server
npm run test        # Run tests
```

### Frontend

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint
```

## 🌐 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### User Management

- `GET /api/user/profile` - Get user profile
- `PATCH /api/user/updateProfile` - Update profile
- `PATCH /api/user/updateBio` - Update bio
- `PATCH /api/user/updatePassword` - Change password

### Chat Operations

- `GET /api/chat/members/:id` - Get chat members
- `GET /api/chat/messages/:id` - Get chat messages
- `POST /api/chat/send` - Send message

## 🔐 Environment Variables

### Backend (.env)

```env
MONGODB_URI=mongodb://localhost:27017/chatapp
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
NODE_ENV=development
UPLOAD_PATH=./uploads
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000
VITE_WS_URL=ws://localhost:5000
VITE_APP_NAME=ChatApp
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Known Issues

- File upload size limit: 5MB
- WebSocket reconnection handling in progress
- Mobile optimization ongoing

## 🔮 Future Enhancements

- [ ] Voice messages
- [ ] File sharing
- [ ] Message reactions
- [ ] Dark/Light theme toggle
- [ ] Push notifications
- [ ] Group chat admin features

## 📞 Support

For support or questions, please open an issue on GitHub or contact the development team.
