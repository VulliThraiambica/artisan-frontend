# Artisan Marketplace Frontend

### Live Demo

https://artisan-frontend-delta.vercel.app/

---

# Artisan Marketplace Frontend

Frontend application for the Artisan Marketplace platform developed using React and Vite.

The platform connects talented artisans with customers through an online marketplace where handmade products can be showcased, discovered, reviewed, and purchased.

This frontend provides:

* User Authentication
* Artisan Product Management
* Product Browsing & Search
* Shopping Cart
* Wishlist Management
* Order Management
* Product Reviews & Ratings
* Admin Dashboard
* Responsive User Interface
* Secure API Integration

The frontend communicates with backend APIs using Axios and manages application state using React Hooks and Context APIs.

Frontend of the Artisan Marketplace built using React, Vite, Tailwind CSS, Axios, React Router, and React Hot Toast.

---

# Tech Stack

* React.js
* Vite
* React Router DOM
* Axios
* Tailwind CSS
* React Hot Toast
* Context API
* JavaScript (ES6+)

---

# Project Setup

## 1. Navigate to frontend folder

```bash
cd artisan-frontend
```

## 2. Install dependencies

```bash
npm install
```

## 3. Create .env file

Example:

```env
RAZORPAY_KEY_ID=your_razorpay_key
```

---

# Run Frontend

## Development Mode

```bash
npm run dev
```

## Build For Production

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

---

# Detailed Frontend Folder Structure

```bash
artisan-frontend/
│
├── public/
│
├── src/
│   │
│   ├── api/
│   ├── components/
│   ├── pages/
│   ├── store/
│   ├── styles/
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── vite.config.js
├── vercel.json
└── .env
```

---

# Important Files Explanation

## src/main.jsx

Application entry point.

Responsibilities:

* Renders React application
* Connects React with DOM
* Loads App component
* Wraps application providers

---

## src/App.jsx

Main routing component.

Responsibilities:

* Defines all application routes
* Controls navigation flow
* Loads pages dynamically
* Handles protected routes
* Provides application layout

Routes Include:

* Home
* Login
* Register
* Products
* Product Details
* Cart
* Wishlist
* Orders
* Checkout
* Admin Dashboard

---

## src/api/axios.js

Axios configuration file.

Responsibilities:

* Stores backend base URL
* Attaches JWT token automatically
* Handles API communication

Example:

```javascript
const api = axios.create({
  baseURL:
  "https://artisan-backend-1-bx6w.onrender.com/api"
});
```

---

## src/store/cartStore.js

Global Cart State Management.

Responsibilities:

* Maintain cart count
* Update cart items globally
* Sync cart across pages

---

## src/components/ProtectedRoute.jsx

Protects secure routes.

Responsibilities:

* Verifies user authentication
* Restricts unauthorized access
* Redirects users to login

---

# Important Components

## Navbar.jsx

Navigation bar component.

Contains:

* Home Navigation
* Products Navigation
* Wishlist
* Cart
* Orders
* User Profile
* Authentication Links

---

## Footer.jsx

Application footer.

Contains:

* Marketplace Information
* Quick Links
* Contact Information

---

# Important Pages

## Home.jsx

Landing page of the platform.

Displays:

* Featured Products
* Artisan Collections
* Marketplace Highlights

---

## Login.jsx

User Authentication Page.

Features:

* Login Form
* Validation
* Secure Authentication

---

## Register.jsx

User Registration Page.

Features:

* User Signup
* Artisan Registration
* Form Validation

---

## Products.jsx

Marketplace Products Page.

Features:

* Product Listings
* Product Search
* Category Filters
* Product Sorting
* Pagination

---

## ProductDetails.jsx

Individual Product Page.

Features:

* Product Gallery
* Product Information
* Wishlist
* Cart Actions
* Reviews & Ratings
* Related Products
* Recently Viewed Products

---

## Cart.jsx

Shopping Cart Page.

Features:

* Add Products
* Remove Products
* Update Quantity
* Checkout Navigation

---

## Wishlist.jsx

Wishlist Management Page.

Features:

* Save Favorite Products
* Remove Products
* Quick Access To Items

---

## Checkout.jsx

Order Checkout Page.

Features:

* Order Summary
* Payment Integration
* Razorpay Checkout

---

## Orders.jsx

User Orders Page.

Features:

* Order History
* Order Tracking
* Purchase Records

---

## Profile.jsx

User Profile Page.

Features:

* User Information
* Account Management
* Purchase Details

---

# Admin Dashboard

## AdminDashboard.jsx

Admin Overview Panel.

Displays:

* Total Users
* Total Products
* Total Orders
* Marketplace Statistics

---

## AdminProducts.jsx

Manage Products.

Features:

* View Products
* Delete Products
* Edit Products

---

## CreateProduct.jsx

Product Creation Page.

Features:

* Upload Product Images
* Add Product Details
* Publish Products

---

## EditProduct.jsx

Product Editing Page.

Features:

* Modify Product Information
* Update Product Images
* Manage Inventory

---

## AdminOrders.jsx

Order Management.

Features:

* View Orders
* Update Order Status

---

## AdminUsers.jsx

User Management.

Features:

* View Registered Users
* Manage User Accounts

---

## AdminArtisans.jsx

Artisan Management.

Features:

* View Artisan Profiles
* Approve Artisan Activities

---

# Detailed Frontend Features

## Authentication System

* User Login
* User Registration
* JWT Authentication
* Persistent Sessions

---

## Product Marketplace

* Browse Products
* Search Products
* Filter By Category
* Sort Products
* View Product Details

---

## Shopping Cart

* Add To Cart
* Remove From Cart
* Quantity Management
* Cart Count Updates

---

## Wishlist System

* Save Favorite Products
* Remove Products
* Quick Product Access

---

## Product Reviews

* Submit Reviews
* Edit Reviews
* Delete Reviews
* Like Reviews
* Review Statistics

---

## Product Discovery

* Related Products
* Recently Viewed Products
* Product Categories

---

## Payment Integration

* Razorpay Integration
* Secure Checkout
* Order Confirmation

---

## Admin Management

* User Management
* Product Management
* Order Monitoring
* Artisan Management

---

## Responsive Design

Supports:

* Mobile Devices
* Tablets
* Desktop Screens

---

## Toast Notifications

Used For:

* Login Alerts
* Registration Messages
* Product Actions
* Wishlist Updates
* Cart Updates
* Order Notifications

---

# Frontend Routing Flow

```bash
App.jsx
   ↓
Routes
   ↓
Pages
   ↓
Components
   ↓
Backend APIs
```

---

# Full Application Flow

```bash
Frontend (React)
        ↓
Axios Requests
        ↓
Backend (Node.js + Express)
        ↓
MongoDB Atlas
        ↓
Cloudinary Storage
        ↓
Response Returned
        ↓
Frontend Updates UI
```

---

# Environment Variables

## Frontend

```env
RAZORPAY_KEY_ID=
```

---

# Deployment

## Frontend Deployment

Platform:

* Vercel

Live URL:

https://artisan-frontend-delta.vercel.app/

---

## Backend Deployment

Platform:

* Render

Backend URL:

https://artisan-backend-1-bx6w.onrender.com

---

## Database

Platform:

* MongoDB Atlas

---

## Image Storage

Platform:

* Cloudinary

---

# Common Frontend Commands

## Install Dependencies

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

## Build Production Version

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

---

# Key Features Summary

* User Authentication
* Artisan Product Management
* Product Marketplace
* Shopping Cart
* Wishlist System
* Reviews & Ratings
* Razorpay Payments
* Order Management
* Admin Dashboard
* Responsive Design
* API Integration
* Cloudinary Image Uploads

---

# Author

Developed as a Full Stack MERN Artisan Marketplace Platform using React, Node.js, Express.js, MongoDB Atlas, Cloudinary, and Razorpay.
