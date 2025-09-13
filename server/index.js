// server/index.js

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const multer = require("multer");
const path = require("path");
const qr = require("qrcode");
const ip = require("ip");
const fs = require("fs");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new socketIo.Server(server, {
  cors: { origin: "*" },
});

app.use(cors());

const PORT = 3001;

// --- 1. Static File Serving (for React App) ---
// We no longer need to serve the /uploads folder statically.
app.use(express.static(path.join(__dirname, "../client/build")));

// --- 2. File Upload Handling ---
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // We will just use the original filename for simplicity now
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

app.post("/upload", upload.array("files"), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("No files uploaded.");
  }

  // CHANGE: The data we send to the frontend now includes a special download URL
  const filesData = req.files.map((file) => ({
    name: file.originalname,
    size: file.size,
    // This now points to our new download route instead of a static file
    downloadUrl: `/download/${file.originalname}`,
  }));

  io.emit("file-uploaded", filesData);
  res.status(200).send("Files uploaded successfully!");
});

// --- NEW: Special Download Route that Deletes After Serving ---
app.get("/download/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(uploadsDir, filename);

  // Use res.download(), it's great for this purpose.
  // It sets the correct headers to trigger a browser download.
  res.download(filePath, filename, (err) => {
    if (err) {
      console.error("Error sending file:", err);
    }

    // This callback runs after the file has been sent (or if an error occurred).
    // Now, we delete the file from the server.
    fs.unlink(filePath, (unlinkErr) => {
      if (unlinkErr) {
        console.error("Error deleting file:", unlinkErr);
      } else {
        console.log("Successfully deleted temporary file:", filename);
      }
    });
  });
});

// --- Simple HTML page for phone uploader ---
app.get("/m", (req, res) => {
  res.sendFile(path.join(__dirname, "mobile-upload.html"));
});

// --- WebSocket Connection Logic ---
io.on("connection", (socket) => {
  console.log("A user connected to the dashboard.");
  const networkAddress = `http://${ip.address()}:${PORT}/m`;
  socket.emit("server-info", { url: networkAddress });
  socket.on("disconnect", () => {
    console.log("User disconnected.");
  });
});

// --- Start Server ---
server.listen(PORT, () => {
  const networkAddress = `http://${ip.address()}:${PORT}/m`;
  console.log(`Server running on port ${PORT}`);
  console.log(
    `Scan the QR code or go to this address on your phone: ${networkAddress}`
  );
  qr.toString(networkAddress, { type: "terminal" }, (err, url) => {
    if (err) throw err;
    console.log(url);
  });
});
