🧠 React Chat + Posts App
A single-page application (SPA) built with Vite, React, RTK Query, Tailwind CSS, and WebSockets. It features:

Token-based login with DummyJSON API

Infinite scroll feed (posts)

Real-time WebSocket chat (Echo test server)

Theme toggle (Dark/Light)

Logout and persistent authentication

🚀 Getting Started
1. Clone the Repo:-
git clone https://github.com/abhaylodhi1/Katyayani_organics.git

2.Locate your folder:-
cd your-repo-name or cd + space + TAB

3. Install Dependencies:-
npm install

4. Run the App Locally:-
npm run dev

5. Generated link:-
ctrl + click 

6. Login Credentials (DummyJSON)
Use credentials like:
Username: jamesd
Password: jamesdpass

🛠️ Tech Stack
React with Hooks and Context API

Vite for lightning-fast dev server

Tailwind CSS for responsive UI

RTK Query for API & WebSocket integration

React Router v7 for routing

WebSocket chat (echo server)

DummyJSON API for auth & post data

⚙️ Design & Architecture
Modular structure: features/, components/, pages/, context/

RTK Query slices handle API logic cleanly via authApi, postsApi, echoSocketApi

ThemeContext manages dark/light theme

Authentication is persisted via localStorage

Infinite Scroll implemented using IntersectionObserver

ChatSidebar WebSocket chat auto-reconnects and allows toggling

📁 Folder Structure (Simplified)

├── src/
│   ├── app/              # Redux store
│   ├── components/       # UI components (ChatSidebar, etc.)
│   ├── context/          # Theme context
│   ├── features/
│   │   ├── auth/         # Login API slice
│   │   ├── posts/        # Posts API slice
│   │   └── chat/         # WebSocket slice
│   ├── pages/            # LoginPage, HomePage
│   ├── main.jsx
│   └── App.jsx
✅ Features
✅ Login with DummyJSON API

✅ Token-based protected routes

✅ Logout + full page reload

✅ Infinite scroll feed

✅ Theme toggle (dark/light)

✅ WebSocket-based chat via wss://echo.websocket.org/.ws

📌 Notes
The WebSocket uses a test echo server; not suitable for production.

The post data and authentication are mocked via dummyjson.com.
