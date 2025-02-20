# Task Management Application

## 📝 Overview

The Task Management Application allows users to add, edit, delete, and reorder tasks using a drag-and-drop interface. Tasks are categorized into three sections: **To-Do**, **In Progress**, and **Done**. All changes are instantly saved to the database for persistence. The app features a modern, responsive UI suitable for both desktop and mobile users.

## ✅ Features

- **Task Management:** Add, edit, delete, and reorder tasks.
- **Categories:** Tasks are categorized as To-Do, In Progress, and Done.
- **Drag-and-Drop:** Drag tasks between categories or reorder within the same category.
- **Real-Time Sync:** Instant updates using MongoDB Change TanstackQuery.
- **Mobile Friendly:** Responsive design with smooth drag-and-drop experience.

## 🌐 Live Link: https://taskflow-taskmanagement.netlify.app/

## ⚙️ Technologies Used

### Frontend:

- **Framework:** Vite.js + React
- **Authentication:** Firebase Authentication (Google sign-in)
- **Drag-and-Drop:** react-dnd
- **Styling:** Tailwind css

### Backend:

- **Server:** Express.js
- **Database:** MongoDB
- **Real-Time Sync:** MongoDB Change Streams / WebSockets / Optimistic UI Updates

## 📦 Dependencies

### Frontend:

- **React:** "^19.0.0"
- **React Router:** "^7.2.0"
- **"react-dnd":** "^16.0.1"
- **"react-dnd-html5-backend":** "^16.0.1"
- **Firebase:** "^11.3.1"
- **axios:** "^1.7.9"
- **@tailwindcss/vite:** "^4.0.7"
- **tailwindcss:** "^4.0.7"
- **@tanstack/react-query:** "^5.66.7"
- **react-toastify:** "^11.0.3"
- **react-icons:** "^5.5.0"
- **react-google-button:** "^0.8.0"
- **localforage:** "^1.10.0"
- **lottie-react:** "^2.4.1"
- **match-sorter:** "^8.0.0"
- **sort-by:** "^1.2.0"
- **sweetalert2:** "^11.17.2"

### Backend:

- **Express.js:** "^4.18.1"
- **MongoDB:** "^5.0.0"
- **Mongoose:** "^6.0.0"
- **Cors:** "^2.8.5"
- **dotenv:** "^16.0.0"

## 💾 Installation Steps

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone [Repository Link]
cd task-management-app
```

### 2. Backend Setup

Navigate to the backend directory and install the necessary dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory and add the following environment variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with your actual MongoDB connection string.

Start the backend server:

```bash
npm start
```

### 3. Frontend Setup

Navigate to the frontend directory and install the necessary dependencies:

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory and add the following environment variables:

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

Replace the placeholders (e.g., `your_firebase_api_key`) with your actual Firebase configuration. You can obtain these details from your Firebase project settings.

Start the frontend development server:

```bash
npm run dev
```

### 4. Access the Application

Once both the backend and frontend servers are running, you can access the application in your browser:

- **Frontend:** Open `http://localhost:5173` (or the port specified in your Vite configuration).
- **Backend:** The backend API will be available at `http://localhost:5000` (or the port specified in your Express configuration).

### 5. Configure Firebase Authentication

To enable Google Sign-In:

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new Firebase project or use an existing one.
3. Enable **Google Sign-In** in the **Authentication** section.
4. Add your Firebase configuration details to the `.env` file in the `frontend` directory.

### 6. Set Up MongoDB

Ensure you have a MongoDB database running. You can use a local instance or a cloud service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas). Update the `MONGODB_URI` variable in the `.env` file in the `backend` directory with your MongoDB connection string.

---

## 🛠️ Troubleshooting

- **Dependency Issues:** If you encounter dependency issues, try deleting the `node_modules` folder and `package-lock.json` file, then run `npm install` again.
- **Environment Variables:** Ensure all required environment variables are correctly set in both the frontend and backend `.env` files.
- **Port Conflicts:** If the default ports are already in use, update the `PORT` variable in the `.env` files or modify the server configurations.
