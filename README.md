# Multi-User Chat Application

This is a simple real-time chat application built with React, TypeScript, and Vite for the frontend, and a Node.js/Express server with WebSockets for the backend.

<img width="1501" height="888" alt="Screenshot 2025-08-16 at 10 52 43 PM" src="https://github.com/user-attachments/assets/761df0db-d784-4593-b7be-ad2c212d3b0f" />

## Features

- User login
- Display a list of online users
- Real-time messaging between users

## Project Structure

```
/
├── server/         # Backend server (Node.js, Express, WebSocket)
├── src/            # Frontend source code (React, TypeScript)
├── public/         # Static assets for the frontend
└── ...             # Configuration files
```

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/sonu0702/multi-user-chat.git
    cd multi-user-chat
    ```

2.  **Install frontend dependencies:**
    ```bash
    npm install
    ```

3.  **Install backend dependencies:**
    ```bash
    cd server
    npm install
    cd ..
    ```

### Running the Application

You need to run both the backend server and the frontend development server in separate terminals.

1.  **Start the backend server:**
    ```bash
    cd server
    npm start
    ```
    The server will be running on `http://localhost:8080`.

2.  **Start the frontend development server:**
    In a new terminal, from the root directory:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is busy).

## How to Use

1.  Open the application in your browser.
2.  Enter a username to log in.
3.  Open same application in another browser instance 
4.  Enter another username to log in.
3.  You will see a list of online users.
4.  You can send and receive messages in real-time.

