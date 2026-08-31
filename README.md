<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0D47A1,50:1976D2,100:42A5F5&height=220&section=header" width="100%"/>

<br>

# CHAT APP

### Connect Instantly. Chat in Real Time.

<p>
  <strong>A modern one-to-one real-time chat application built with the MERN stack and Socket.IO.</strong>
</p>

<br>

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"/>
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
<img src="https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socket.io&logoColor=white" alt="Socket.IO"/>
<img src="https://img.shields.io/badge/Redux%20Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white" alt="Redux Toolkit"/>

<br><br>

<img src="https://capsule-render.vercel.app/api?type=rect&color=1976D2&height=2&width=700" />

</div>

---

## 📖 About

**ChatApp** is a full-stack real-time messaging application developed using the **MERN stack**.

The application allows users to register and log in, view available users, check online status, start one-to-one conversations, send messages instantly, and maintain chat history.

The project focuses on practical implementation of **React, Node.js, Express, MongoDB, Redux Toolkit, authentication, REST APIs, and real-time communication with Socket.IO**.

---

## ✨ Features

<table>
<tr>

<td width="33%" valign="top">

### 🔐 Authentication

* User registration
* User login
* Logout
* Authentication state
* Protected chat experience

</td>

<td width="33%" valign="top">

### 💬 Real-Time Chat

* One-to-one conversations
* Instant messaging
* Chat history
* Message timestamps
* Sender & receiver messages

</td>

<td width="33%" valign="top">

### 🟢 Online Presence

* Online/offline status
* Online user count
* Live presence updates
* Real-time user tracking

</td>

</tr>

<tr>

<td width="33%" valign="top">

### 👥 Users

* Registered users list
* User selection
* User avatars
* Active conversation
* Unread message badges

</td>

<td width="33%" valign="top">

### 🔔 Message Status

* Read indicators
* Delivery indicators
* Unread message count
* Live message updates

</td>

<td width="33%" valign="top">

### 🎨 Interface

* Modern dark interface
* Clean chat layout
* Sidebar user list
* Message bubbles
* Responsive design

</td>

</tr>

<tr>

<td width="33%" valign="top">

### ⚡ Real-Time System

* Socket.IO communication
* Instant message delivery
* Live status updates
* Real-time unread updates

</td>

<td width="33%" valign="top">

### 💾 Data

* User records
* Chat messages
* Conversation history
* Message timestamps

</td>

<td width="33%" valign="top">

### 📱 Responsive

* Desktop support
* Tablet support
* Mobile-friendly layout
* Adaptive chat interface

</td>

</tr>
</table>

---

## 🛠️ Technology Stack

<p align="center">

<img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
<img src="https://img.shields.io/badge/Redux%20Toolkit-State%20Management-764ABC?style=for-the-badge&logo=redux&logoColor=white"/>
<img src="https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Express.js-REST%20API-000000?style=for-the-badge&logo=express&logoColor=white"/>
<img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
<img src="https://img.shields.io/badge/Socket.IO-Real--Time-010101?style=for-the-badge&logo=socket.io&logoColor=white"/>
<img src="https://img.shields.io/badge/Axios-API%20Requests-5A29E4?style=for-the-badge&logo=axios&logoColor=white"/>
<img src="https://img.shields.io/badge/CSS3-Styling-1572B6?style=for-the-badge&logo=css3&logoColor=white"/>

</p>

---

## 🖥️ Screenshots

### 🔑 Login Screen

<p align="center">
  <img src="./screenshots/login.png" alt="ChatApp Login Screen" width="850"/>
</p>

### 📝 Registration Screen

<p align="center">
  <img src="./screenshots/register.png" alt="ChatApp Registration Screen" width="850"/>
</p>

### 💬 Default Chat Screen

<p align="center">
  <img src="./screenshots/DeafultChatScreen.png" alt="ChatApp Default Chat Screen" width="850"/>
</p>

### 💭 Chat Conversation

<p align="center">
  <img src="./screenshots/Chat%20Screen.png" alt="ChatApp Conversation Screen" width="850"/>
</p>

### 🔔 Unread Message Indication

<p align="center">
  <img src="./screenshots/unread_msgz_indication.png" alt="ChatApp Unread Message Indication" width="850"/>
</p>

---

## 🚀 Setup Guide

### System Requirements

| Requirement | Details |
| :--- | :--- |
| **Operating System** | Windows / macOS / Linux |
| **Frontend** | React.js |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB |
| **Runtime** | Node.js |
| **Package Manager** | npm |

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
cd ChatApp
```

#### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

#### 3. Install Backend Dependencies

```bash
cd ../server
npm install
```

#### 4. Start the Backend

```bash
cd server
npm run dev
```

Or:

```bash
node server.js
```

#### 5. Start the Frontend

Open another terminal:

```bash
cd client
npm run dev
```

Open the local development URL provided by Vite.

---

## 🧪 Testing

To test the real-time messaging functionality:

1. Register a user.
2. Log in to the application.
3. Open another browser or incognito window.
4. Register a second user.
5. Log in with the second account.
6. Select each user from the chat list.
7. Send messages between both accounts.
8. Verify that messages appear in real time.
9. Test online/offline status.
10. Test unread message indicators.

Using two browser sessions allows the real-time communication features to be tested locally.

---

## 🧠 Concepts Used

<table>
<tr>

<td width="50%" valign="top">

### Frontend Concepts

* React Components
* React Router
* Redux Toolkit
* State Management
* Axios API Requests
* Responsive UI
* Event Handling

</td>

<td width="50%" valign="top">

### Backend Concepts

* Node.js
* Express.js
* REST APIs
* MongoDB
* Mongoose
* Authentication
* Socket.IO
* Real-Time Communication

</td>

</tr>
</table>

---

## 🔮 Future Improvements

* ⌨️ Typing indicators
* ✏️ Message editing
* 🗑️ Message deletion
* 📎 Image & file sharing
* 😀 Emoji support
* 🔎 Conversation search
* 🕐 Last seen status
* 🔔 Push notifications
* 👥 Group conversations
* 🖼️ Profile pictures
* 📱 Improved mobile navigation
* ☁️ Production deployment

---

<div align="center">

## 💬 Connect Instantly. Chat in Real Time.

<strong>ChatApp — React · Node.js · Express · MongoDB · Socket.IO</strong>

<br><br>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0D47A1,50:1976D2,100:42A5F5&height=120&section=footer" width="100%"/>

</div>
