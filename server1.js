const net = require('net');
const fs = require('fs');

// Specify the path to the UNIX domain socket
// const socketPath = '/var/run/dev-test/sock'
const socketPath = process.argv[2];

// Check if the socket file already exists and remove it
if (fs.existsSync(socketPath)) {
  fs.unlinkSync(socketPath);
}

// Create a server and listen on the UNIX domain socket path
const server = net.createServer((socket) => {
  console.log('Client connected.');

  // Handle incoming data from clients
  socket.on('data', (data) => {
    try {
      // Parse the received message as a JSON object
      const request = JSON.parse(data.toString().trim());
      // Extract request attributes
      const { id, method, params } = request;
      console.log("request: " + JSON.stringify(request));
      // Check if the method is "echo"
      if (method === 'echo') {
        const { message } = params;

        // Prepare the response message
        const response = {
          id,
          result: { message },
        };
        
        // Send the response back to the client
        socket.write(JSON.stringify(response) + '\n');
        console.log("response: " + JSON.stringify(response));
      }
    } catch (error) {
      console.error('Error:', error.message);
      // Handle invalid messages or errors during processing
      // socket.end();
    }
  });

  // Handle client disconnection
  socket.on('end', () => {
    console.log('Client disconnected.');
  });
});

// Start the server by listening on the socket path
server.listen(socketPath, () => {
  // Update the permissions of the socket file to allow other users to connect
  fs.chmodSync(socketPath, '777');
  console.log(`Server listening on ${socketPath}`);
});
