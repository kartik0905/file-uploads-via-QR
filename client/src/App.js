import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { QRCodeSVG as QRCode } from "qrcode.react";
import "./App.css";

const socket = io("http://localhost:3001");

function App() {
  const [files, setFiles] = useState([]);
  const [uploadUrl, setUploadUrl] = useState("");

  useEffect(() => {

    socket.on("server-info", (data) => {
      console.log("Received server URL:", data.url);
      setUploadUrl(data.url);
    });


    socket.on("file-uploaded", (newFiles) => {
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    });


    return () => {
      socket.off("server-info");
      socket.off("file-uploaded");
    };
  }, []);

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>📂 FileDrop</h1>
        <p>Scan the QR code with your phone to start uploading files.</p>
      </header>
      <main className="App-main">
        <div className="qr-container">
          {uploadUrl ? (
            <>
              <QRCode
                value={uploadUrl}
                size={256}
                level={"H"}
                includeMargin={true}
              />
              <p>
                Or visit: <strong>{uploadUrl}</strong>
              </p>
            </>
          ) : (
            <p>Connecting to server...</p>
          )}
        </div>
        <div className="file-list-container">
          <h2>Received Files</h2>
          {files.length === 0 ? (
            <p className="no-files">Waiting for files...</p>
          ) : (
            <ul className="file-list">
              {files.map((file, index) => (
                <li key={index} className="file-item">
                  <span className="file-name">{file.name}</span>
                  <span className="file-size">{formatBytes(file.size)}</span>
                  <a
                    href={`http://localhost:3001${file.downloadUrl}`}
                    className="download-button"
                  >
                    Download
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
