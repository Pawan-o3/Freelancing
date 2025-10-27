# SB Works Freelancing Platform

## Overview
SB Works is a full-stack freelancing platform that connects freelancers with clients. The platform supports three user types: Freelancers, Clients, and Admins. It features real-time chat functionality using Socket.IO and a comprehensive project bidding system.

## Technology Stack
- **Frontend**: React 18.2, React Router DOM 6.19, Socket.IO Client
- **Backend**: Node.js, Express 4.18, Socket.IO
- **Database**: MongoDB Atlas (cloud-hosted)
- **Authentication**: bcrypt for password hashing
- **Styling**: CSS with responsive design

## Project Structure
```
├── client/                 # React frontend application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable components (Login, Register, Navbar)
│   │   ├── context/       # React Context for state management
│   │   ├── pages/         # Page components
│   │   │   ├── admin/     # Admin dashboard and management
│   │   │   ├── client/    # Client project management
│   │   │   └── freelancer/# Freelancer project browsing and bidding
│   │   ├── styles/        # CSS files
│   │   └── config/        # Configuration files (API endpoints)
│   └── .env               # Frontend environment variables
├── server/                # Node.js backend
│   ├── models/            # Mongoose schemas
│   ├── index.js           # Main server file
│   ├── SocketHandler.js   # WebSocket event handlers
│   └── .env               # Backend environment variables
├── dataset/               # Sample data (JSON format)
└── Documentation_of_Project/ # Project documentation and diagrams
```

## Environment Configuration

### Backend (.env in server/)
- `MONGODB_URI`: MongoDB Atlas connection string
- `PORT`: Server port (default: 5500)

### Frontend (.env in client/)
- `REACT_APP_BACKEND_URL`: Backend API URL (default: http://localhost:5500)
- `PORT`: Frontend development server port (default: 5000)
- `HOST`: Server host (0.0.0.0 for Replit compatibility)
- `DANGEROUSLY_DISABLE_HOST_CHECK`: true (required for Replit proxy)

## Key Features
1. **User Authentication**: Secure registration and login with bcrypt
2. **Role-Based Access**: Separate dashboards for Freelancers, Clients, and Admins
3. **Project Management**: Clients can post projects with budget and required skills
4. **Bidding System**: Freelancers can bid on projects with proposals
5. **Real-Time Chat**: Socket.IO powered messaging between clients and freelancers
6. **Project Tracking**: Track project status from posting to completion
7. **Admin Panel**: Comprehensive oversight of all users, projects, and applications

## User Roles

### Freelancer
- Browse available projects
- Submit bids with proposals
- Track application status
- Work on assigned projects
- Submit completed work
- Real-time chat with clients
- View earnings and completed projects

### Client
- Post new projects
- Review applications
- Approve/reject freelancer bids
- Monitor project progress
- Review and approve submissions
- Real-time chat with assigned freelancers

### Admin
- View all users, projects, and applications
- Monitor platform statistics
- Oversee project completion rates

## Database Schema
- **Users**: Stores user credentials and type (freelancer/client/admin)
- **Freelancers**: Extended profile for freelancers (skills, funds, projects)
- **Projects**: Project details, status, budget, and requirements
- **Applications**: Freelancer bids on projects
- **Chats**: Real-time messages between users

## Development Setup
1. Both backend and frontend workflows are configured automatically
2. Backend runs on localhost:5500
3. Frontend runs on 0.0.0.0:5000 (accessible via Replit webview)
4. MongoDB Atlas handles the database (no local MongoDB needed)

## Deployment
The application is configured for Replit Autoscale deployment:
- Frontend builds to optimized production bundle
- Backend serves the API and handles Socket.IO connections
- Environment variables must be configured in Replit Secrets for production

## Recent Changes (October 27, 2025)
- Migrated from local MongoDB to MongoDB Atlas
- Added dotenv for environment variable management
- Created centralized API configuration for frontend
- Updated all API endpoints to use dynamic backend URL
- Configured workflows for seamless Replit deployment
- Added proper .gitignore to protect sensitive files
- Set up deployment configuration for production

## Notes
- The platform uses localStorage for client-side session management
- All API calls use axios for HTTP requests
- Socket.IO is configured to accept connections from any origin (suitable for development)
- The frontend uses React Context API for global state management
