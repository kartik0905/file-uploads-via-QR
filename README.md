
<div align="center">

# 📂 FileDrop  
### Self-Hosted, Cross-Platform File Sharing over Local Wi-Fi  

</div>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socket.io&logoColor=white" alt="Socket.IO"/>
  <img src="https://img.shields.io/badge/Multer-File_Uploads-orange?style=for-the-badge" alt="Multer"/>
  <img src="https://img.shields.io/badge/QR_Code-Enabled-blueviolet?style=for-the-badge" alt="QR Code"/>
</p>

---

## 📌 Overview  

**FileDrop** is a private, cross-platform file sharing tool that lets you transfer files from your phone to your computer over your local Wi-Fi using a QR code.  
Think of it as a **self-hosted AirDrop** that works on **any device**.  

---

## 🚀 How It Works  

1. Start the **Node.js server** on your laptop.  
2. Open the **dashboard** in your browser — it shows a QR code for your local IP.  
3. Scan the QR code with your **phone’s camera**.  
4. A simple **upload page** opens in your phone’s browser (no app required).  
5. Select files → they are sent directly to your laptop.  
6. Files appear on the dashboard **instantly** via WebSockets.  
7. Download with one click → saved to your **Downloads folder**.  

---

## ✨ Features  

- 🔐 **Privacy-First** → All transfers stay **inside your local network**.  
- 🧹 **Temporary Storage** → Files auto-delete after download.  
- ⚡ **Real-Time Updates** → Instant uploads with **Socket.IO**.  
- 🌍 **Cross-Platform** → Works with **Windows, macOS, Linux, iOS, Android**.  
- 📷 **No App Needed** → Just scan & upload from your phone browser.  

---

## 🛠️ Tech Stack  

| Layer            | Tech Used |
|------------------|-----------|
| **Backend**      | Node.js, Express |
| **File Uploads** | Multer |
| **Realtime**     | Socket.IO |
| **Dashboard**    | React |
| **Upload Page**  | HTML + Vanilla JS |
| **QR Codes**     | qrcode (server), qrcode.react (client) |

---

## 📂 Folder Structure  

```
FileDrop/
├── .gitignore
├── README.md
├── assets
    └── Screenshot 2025-09-13 at 6.25.44 PM 1.png
├── client
    ├── README.md
    ├── package-lock.json
    ├── package.json
    ├── public
    │   ├── favicon.ico
    │   ├── index.html
    │   ├── logo192.png
    │   ├── logo512.png
    │   ├── manifest.json
    │   └── robots.txt
    └── src
    │   ├── App.css
    │   ├── App.js
    │   ├── App.test.js
    │   ├── index.css
    │   ├── index.js
    │   ├── logo.svg
    │   ├── reportWebVitals.js
    │   └── setupTests.js
└── server
    ├── .gitignore
    ├── index.js
    ├── mobile-upload.html
    ├── package-lock.json
    └── package.json
```  

---

## ⚡ Quick Start  

### 1️⃣ Clone the repo  
```bash
git clone https://github.com/kartik0905/filedrop.git
cd filedrop
```

### 2️⃣ Install dependencies  
```bash
cd server && npm install
cd ../client-dashboard && npm install
```

### 3️⃣ Run the backend  
```bash
cd server
npm start
```

### 4️⃣ Run the dashboard  
```bash
cd client-dashboard
npm start
```

### 5️⃣ Access  
- Open `http://localhost:3000` on your laptop.  
- Scan the QR code with your phone to open the upload page.  

---

## 📸 Demo  

![Screenshot](/assets/Screenshot%202025-09-13%20at%206.25.44 PM%201.png) 

---

## 🧹 Cleanup  

- Files auto-delete after download.  
- Clear `uploads/` manually if needed.  

---

## 🔮 Future Enhancements  

- 🔑 Password-protected uploads  
- 📦 Batch downloads (zip multiple files)  
- 📲 Drag & Drop dashboard uploads  
- 🌐 LAN-wide discovery (no QR needed)  

---

## 🤝 Contributing  

Pull requests are welcome! Open an issue to discuss new features or fixes.  

---

## 📜 License  

MIT License © 2025 [Kartik Garg](https://github.com/kartik0905)  

