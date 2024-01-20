# Blog - MERN Stack Blogging Website

Welcome to **Blog**, a full-stack blogging website built with the MERN stack.

## Features

- **User Authentication:** Secure user authentication and authorization.
- **Create, Read, Update, Delete (CRUD):** Create, view, edit, and delete blog posts.
- **Rich Text Editing:** Utilizes the TinyMCE editor for a smooth content creation experience.
- **Image Upload:** Supports uploading and displaying images in blog posts.
- **Category and Tagging:** Organize posts with categories and tags for easy navigation.
- **User Profile:** View and manage your blog posts through a personalized user profile.
- **Responsive Design:** User-friendly experience on both desktop and mobile devices.

## Technologies Used

- **Frontend:**
  - React.js
  - React Router
  - TinyMCE for rich text editing
- **Backend:**

  - Node.js
  - Express.js
  - MongoDB (Mongoose for ODM)
  - JWT for authentication
  - Multer for handling file uploads

- **Deployment:**
  - Heroku (for backend)
  - Netlify (for frontend)

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/PandeyHarish/Blog.git
   cd blog
   ```

# Install server dependencies

cd backend
npm install

# Install client dependencies

cd ../client
npm install

# Setup Environment Variables:

Create a .env file in the server directory and add the necessary environment variables ( JWT Secret).

# run the application

# Start the server (from the server directory)

npm start

# Start the client (from the client directory)

npm start
