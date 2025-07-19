# rewear-odoo  
# 👚 ReWear – Community Clothing Exchange Platform

ReWear is a full-stack MERN application that promotes sustainable fashion by enabling users to list, browse, and swap pre-owned clothing. Built with scalability and user experience in mind, the platform encourages eco-conscious behavior through a points-based reward system and admin moderation.

---

## 🚀 Features

- 🧾 **User Authentication**: Secure login & registration with JWT and protected dashboard routes.
- 🎯 **Points-Based System**: Users earn points for uploading clothes, which they can use to swap with others.
- 🧺 **Item Listing**: Upload items with images, descriptions, categories, and size filters.
- 🔍 **Browse & Swap**: View available clothes with filters and initiate swap requests.
- 🛂 **Admin Panel**: Admins approve/deny new listings and manage reported items.
- 🔄 **Real-Time Dashboards**: Track item statuses, swaps, and rewards.
- 📁 **Image Upload**: Seamless file upload using Multer and preview with React.
- ⚙️ **RESTful API**: Built with clean architecture, following full CRUD patterns.

---

## 🧑‍💻 Tech Stack

### Frontend
- React.js
- React Router
- Axios
- Pure CSS

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Multer (file uploads)
- JWT (auth & route protection)

---

## 📁 Folder Structure

```bash
ReWear/
├── client/                # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── context/
│       └── App.js
├── server/                # Node.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── uploads/               # Uploaded images
├── .env
└── README.md
