# Homely Meals – Full Stack Food Ordering & Subscription Platform

Homely Meals is a full-stack MERN application that provides affordable, home-style meals with subscription plans. The platform is designed to solve real-world problems such as high food delivery costs, unhealthy eating habits, and lack of flexible meal options.

---

## Live Demo

Frontend: https://homely-meals-2-0.vercel.app/  
Backend API: https://homelymeals-2-0.onrender.com/

---

## Features

### Authentication & Authorization
- User registration and login
- JWT-based authentication
- Role-based access (User / Admin)
- Protected routes

### Meal Management
- Create, update, delete meals (Admin)
- View meals (User)
- Category-based filtering
- Search functionality

### Cart & Orders
- Add to cart
- Dynamic cart management
- Checkout flow
- Order history
- Order status tracking (Pending to Delivered)

### Payment Integration
- Razorpay integration
- Online payment verification
- Cash on Delivery support

### Subscription System
- Daily, weekly, and monthly meal plans
- Dynamic subscription handling
- User-specific subscriptions

### Admin Panel
- Manage meals
- View all orders
- Manage users
- Role-based admin access

### Contact System
- User enquiry form
- Stores messages in MongoDB

### UI/UX
- Responsive design
- Clean modern interface
- Cart drawer system
- Loaders and smooth interactions

---

## Tech Stack

Frontend:
- React (Vite)
- React Router
- Context API
- Axios
- CSS

Backend:
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

Authentication & Security:
- JWT (JSON Web Token)
- bcryptjs

Payment:
- Razorpay

Deployment:
- Frontend: Vercel
- Backend: Render

---

## Project Structure

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── services/
│   └── utils/

backend/
├── models/
├── controllers/
├── routes/
├── middleware/
└── config/

---

## Installation and Setup

### Clone Repository

git clone https://github.com/your-username/homely-meals.git  
cd homely-meals  

---

### Backend Setup

cd backend  
npm install  

Create a .env file and add:

MONGO_URI=your_mongodb_uri  
JWT_SECRET=your_secret_key  

Run backend:

npm run dev  

---

### Frontend Setup

cd frontend  
npm install  

Create a .env file and add:

VITE_API_URL=https://homelymeals-2-0.onrender.com  

Run frontend:

npm run dev  

---

## Future Enhancements

- Weekly meal planning system
- Admin dashboard improvements
- Email notifications for orders
- Real-time order tracking
- Mobile application version

---

## Problem Solved

- Reduces high food delivery costs (platform fees, GST, surge pricing)
- Provides affordable, home-style meals
- Enables subscription-based meal delivery
- Improves convenience and daily nutrition for users

---
 


## Notes

This project demonstrates a production-level full-stack application with authentication, payment integration, role-based access control, and scalable architecture.
