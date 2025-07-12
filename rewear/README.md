# ReWear - Community Clothing Exchange Platform

ReWear is a full-stack web application built with the MERN stack (MongoDB, Express.js, React, Node.js) that enables users to exchange unused clothing through direct swaps or a point-based redemption system. The platform promotes sustainable fashion and reduces textile waste by encouraging users to reuse wearable garments.

## Features

### 🌟 Core Features
- **User Authentication**: Secure email/password signup and login
- **Item Management**: Upload, edit, and manage clothing items
- **Swap System**: Direct item swaps and point-based redemption
- **Community Driven**: Connect with like-minded sustainable fashion enthusiasts
- **Admin Panel**: Moderate and approve/reject item listings
- **Responsive Design**: Beautiful, modern UI that works on all devices

### 📱 User Features
- **Landing Page**: Platform introduction with featured items carousel
- **User Dashboard**: Profile details, points balance, and swap history
- **Item Detail Pages**: Full item descriptions with image galleries
- **Search & Filter**: Find items by category, size, condition, and more
- **Rating System**: Rate users after successful swaps
- **Points System**: Earn and spend points for item redemption

### 🔐 Admin Features
- **Item Moderation**: Approve/reject new item listings
- **User Management**: Monitor user activity and statistics
- **Platform Analytics**: View overall platform statistics
- **Content Management**: Remove inappropriate or spam items

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **Express Validator** - Input validation

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Context API** - State management
- **Axios** - HTTP client
- **React Icons** - Icon library
- **React Toastify** - Notification system
- **CSS3** - Modern styling with CSS variables

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd rewear/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the backend directory with:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/rewear
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   UPLOAD_DIR=uploads
   ```

4. **Start MongoDB:**
   Make sure MongoDB is running on your system.

5. **Start the backend server:**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd rewear
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the frontend development server:**
   ```bash
   npm start
   ```

4. **Open the application:**
   Navigate to `http://localhost:3000` in your browser.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Items
- `GET /api/items` - Get all approved items (with filters)
- `GET /api/items/featured` - Get featured items
- `GET /api/items/:id` - Get item by ID
- `POST /api/items` - Create new item
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item
- `POST /api/items/:id/like` - Like/unlike item

### Swaps
- `GET /api/swaps` - Get user's swaps
- `POST /api/swaps` - Create swap request
- `PUT /api/swaps/:id/respond` - Accept/reject swap
- `PUT /api/swaps/:id/complete` - Mark swap as completed
- `POST /api/swaps/:id/rate` - Rate completed swap

### Admin
- `GET /api/admin/items` - Get items for moderation
- `PUT /api/admin/items/:id/approve` - Approve item
- `PUT /api/admin/items/:id/reject` - Reject item
- `GET /api/admin/stats` - Get platform statistics

## Database Schema

### User Model
- Email, password, first name, last name
- Points balance, admin status
- Profile information (bio, location, profile picture)
- Items uploaded and swap history
- Rating and total ratings

### Item Model
- Title, description, category, size, condition
- Images, tags, brand, color, material
- Points value, status, approval status
- Owner reference and view count

### Swap Model
- Initiator and recipient users
- Items involved in swap
- Swap type (item-swap or point-redemption)
- Status, messages, meeting details
- Ratings and completion date

## Contributing

We welcome contributions to ReWear! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Icons by [React Icons](https://react-icons.github.io/react-icons/)
- UI inspiration from modern design systems
- Community-driven development approach

## Support

For support, please email support@rewear.com or create an issue on GitHub.

---

**Built with ❤️ for a sustainable future**
