const net = require('net');
const fs = require('fs');

// Specify the path to the UNIX domain socket
const socketPath =  process.argv[2];

// Create a socket connection to the UNIX domain socket
const socket = net.createConnection({ path: socketPath });

// Handle connection established
socket.on('connect', () => {
  console.log('Connected to the server via UNIX domain socket.');

  // Prepare the request object
  const request = {
    id: 42,
    method: 'echo',
    params: {
      message: 'Hello',
    },
  };

  // Send the request to the server
  socket.write(JSON.stringify(request) + '\n');
});

// Handle response from the server
socket.on('data', (data) => {
  try {
    // Parse the received message as a JSON object
    const response = JSON.parse(data.toString().trim());

    // Extract response attributes
    const { id, result } = response;

    // Log the response
    console.log('Received response from the server:');
    console.log('Request ID:', id);
    console.log('Response:', result);
  } catch (error) {
    console.error('Error:', error.message);
  }

  // Close the socket connection
  socket.end();
});

// Handle connection closed
socket.on('close', () => {
  console.log('Disconnected from the server.');
});

// Handle connection errors
socket.on('error', (error) => {
  console.error('Socket error:', error.message);
});
