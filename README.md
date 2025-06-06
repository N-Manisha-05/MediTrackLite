	MediTrack Lite is a full-stack web application built using the MERN (MongoDB, Express, React, Node.js) stack. It allows clinics to manage appointments and prescriptions efficiently. The app provides role-based access for both doctors and patients, with different functionalities for each.

Features:

	Authentication
	User registration and login

	JWT-based authentication

	Role-based access (Doctor or Patient)

Doctor Role:

	View appointments booked by patients

	Write and manage prescriptions

	Update appointment status

Patient Role:

	Register and log in as a patient

	Book appointments with doctors

	View prescriptions issued by doctors

	View history of appointments

Technologies Used:

	React (Frontend)

	Node.js + Express (Backend)

	MongoDB + Mongoose (Database)

	JWT & bcryptjs (Authentication and password hashing)


Folder Structure:

MediTrack-Lite/
├── client
│   ├── node_modules
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   ├── README.md
│   └── src
└── server
    ├── controllers
    ├── db.js
    ├── middleware
    ├── models
    ├── node_modules
    ├── package.json
    ├── package-lock.json
    ├── routes
    └── server.js


Setup Instructions:


Backend Setup:

Navigate to the server directory:
	cd server
Install dependencies:
	npm install
Create a .env file with the following variables:
	PORT=5000
	MONGODB_URI=your_mongodb_uri
	JWT_SECRET=your_jwt_secret
Start the backend server:
	npm start
	
	
Frontend Setup:

Navigate to the client directory:
	cd client
Install dependencies:
	npm install
Start the frontend:
	npm start
Visit http://localhost:3000 to use the app.


Author
This project is developed by Manisha Narreddy and Meghana Savaram as part of a full-stack assignment and learning project.


