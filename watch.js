const fs = require('fs');
const path = require('path');
const https = require('https');
const WebSocket = require('ws');
const watch = require('node-watch');

// Config
const PORT = 8080;
const directoryToWatch = path.format({dir: '/Users/kristiyan.tanev/git/vechenpomen'});

// Load SSL certificate and key
const serverOptions = {
    cert: fs.readFileSync(path.join(__dirname, 'local-pomen.com.crt')),
    key: fs.readFileSync(path.join(__dirname, 'local-pomen.com.key'))
};
// Config

// Ensure the directory exists
if (!fs.existsSync(directoryToWatch)) {
    console.error(`Directory does not exist: ${directoryToWatch}`);
    process.exit(1);
}
console.log(`Watching directory: ${directoryToWatch}`);


// Create an HTTPS server
const server = https.createServer(serverOptions);

// Create a WebSocket server using the HTTPS server
const wss = new WebSocket.Server({ server });

// Watch the directory
watch(directoryToWatch, { recursive: true }, (eventType, filename) => {
    if (filename) {
        const message = `File ${eventType}: ${filename}`;
        console.log(message);
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    }
});

// Handle WebSocket connections
wss.on('connection', ws => {
    console.log('Client connected');
//    ws.send('Connected to the WebSocket server');
    ws.on('close', () => console.log('Client disconnected'));
});

// Start the HTTPS server
server.listen(PORT, () => {
    console.log(`WebSocket server is running on https://localhost:${PORT}`);
});
