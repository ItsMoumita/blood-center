# Blood Center

A modern, full-featured blood donation platform built with the MERN stack.

[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&style=for-the-badge)]()
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38B2AC?logo=tailwind-css&style=for-the-badge)]()
[![MongoDB](https://img.shields.io/badge/MongoDB-5.x-4EA94B?logo=mongodb&style=for-the-badge)]()
[![Vite](https://img.shields.io/badge/Vite-4.x-646CFF?logo=vite&style=for-the-badge)]()
[![Firebase](https://img.shields.io/badge/Firebase-11.x-FFCA28?logo=firebase&style=for-the-badge)]()
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=nodedotjs&style=for-the-badge)]()
[![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&style=for-the-badge)]()

---

## Description

**Blood Center** is a responsive web application that connects blood donors with recipients, streamlines blood donation requests, and provides a secure, role-based dashboard for admins, volunteers, and donors. The platform features real-time search, content management, Stripe-powered funding, and robust authentication.

---

## 🚀 [Live Site](https://blood-center-f5b14.web.app/)

---

## 👤 Admin Access

- **Username:** Fatiha Mou
- **Email:** fatiha@gmail.com

---

## ✨ Features

1. **Role-based Dashboard:** Separate dashboards for Admin, Volunteer, and Donor with custom permissions.
2. **User Registration & Login:** Secure authentication with Firebase, including role assignment and status (active/blocked).
3. **Profile Management:** View and update profile info (except email), with avatar upload via imageBB.
4. **Blood Donation Requests:** Create, edit, delete, and view donation requests; status management (pending, inprogress, done, canceled).
5. **Donor Search:** Search for donors by blood group, district, and upazila with instant results.
6. **Admin User Management:** Block/unblock users, assign roles (volunteer/admin), and manage all users with pagination and filtering.
7. **Content Management:** Add, publish/unpublish, and delete blogs (admin only); volunteers can add and edit.
8. **Funding Page:** View all funds, give funds via Stripe payment, and see total funding stats.
9. **Responsive Design:** Fully responsive for mobile, tablet, and desktop, including dashboard sidebar.
10. **Notifications:** SweetAlert/Toast notifications for all CRUD operations and authentication events.
11. **JWT/Firebase Protected APIs:** All private APIs are protected with Firebase JWT.
12. **Pagination & Filtering:** All major tables (users, requests, blogs, funds) support pagination and filtering.
13. **Loading & Skeletons:** Modern loading spinners and skeletons for all data fetches.
14. **Environment Variables:** All sensitive keys (Firebase, MongoDB, Stripe) are hidden using environment variables.
15. **No Lorem Ipsum:** All content is meaningful and relevant to blood donation.

---

## 🛠️ Technologies Used

- **Frontend:**  
  React, Vite, Tailwind CSS, DaisyUI, React Router, React Icons, React Spinners, React Loading Skeleton, Jodit React, SweetAlert2, Lottie React, GSAP, React Simple Typewriter, React Tooltip, TanStack Query, Stripe.js, @headlessui/react, typeface-sora

- **Backend:**  
  Node.js, Express.js, MongoDB, Firebase Admin, Stripe

- **Authentication:**  
  Firebase Auth, JWT (via Firebase)

- **Deployment:**  
  Vercel (backend), Firebase Hosting (frontend)

- **Other:**  
  imageBB (avatar upload), Framer Motion/AOS (optional animation)

---

## 📦 Example Dependencies

```json
{
  "@headlessui/react": "^2.2.6",
  "@stripe/react-stripe-js": "^3.8.1",
  "@stripe/stripe-js": "^7.7.0",
  "@tailwindcss/vite": "^4.1.11",
  "@tanstack/react-query": "^5.83.0",
  "axios": "^1.11.0",
  "firebase": "^11.10.0",
  "gsap": "^3.13.0",
  "jodit-react": "^5.2.19",
  "lottie-react": "^2.4.1",
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-icons": "^5.5.0",
  "react-loading-skeleton": "^3.5.0",
  "react-router": "^7.7.0",
  "react-simple-typewriter": "^5.0.1",
  "react-spinners": "^0.17.0",
  "react-tooltip": "^5.29.1",
  "rollup": "^4.44.0",
  "sweetalert2": "^11.22.2",
  "tailwindcss": "^4.1.11",
  "typeface-sora": "^1.1.13"
}