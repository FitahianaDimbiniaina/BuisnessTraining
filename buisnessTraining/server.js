const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const os = require('os');

const app = express();
const port = 3000;  // Port for the server

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Function to get local IPv4 address
const getLocalIp = () => {
  const networkInterfaces = os.networkInterfaces();
  for (const interfaceName in networkInterfaces) {
    for (const interfaceInfo of networkInterfaces[interfaceName]) {
      if (interfaceInfo.family === 'IPv4' && !interfaceInfo.internal) {
        return interfaceInfo.address;
      }
    }
  }
  return '127.0.0.1';  // Fallback to localhost if no IP is found
};

// Get local IP dynamically
const localIP = getLocalIp();

// Define the path to your JSON file
const jsonFilePath = path.join('./data/Suscribed.json');

// API endpoint to receive subscription data
app.post('/subscribe', (req, res) => {
  const subscriptionData = req.body;

  // Check if the file exists, otherwise create a new one
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    let currentData = [];

    if (err) {
      // If the file doesn't exist or there is an error, create a new array
      if (err.code === 'ENOENT') {
        currentData = [];
      } else {
        return res.status(500).send('Error reading file');
      }
    } else {
      // Parse the existing data
      currentData = JSON.parse(data);
    }

    // Add new subscription data
    currentData.push(subscriptionData);

    // Write the updated data to the file
    fs.writeFile(jsonFilePath, JSON.stringify(currentData, null, 2), 'utf8', (writeErr) => {
      if (writeErr) {
        return res.status(500).send('Error writing to file');
      }

      res.status(200).send('Data saved successfully');
    });
  });
});

// Start the server on the detected local IP
app.listen(port, localIP, () => {
  console.log(`Server running on http://${localIP}:${port}`);
});
