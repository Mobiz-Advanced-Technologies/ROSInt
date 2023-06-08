const http = require('http');
const url = require('url');
const { spawn } = require('child_process');

const server = http.createServer(async (req, res) => {
  // Parsing the URL to extract query parameters
  const parsedUrl = url.parse(req.url, true);
  const query = parsedUrl.query;

  // Checking if the 'email' parameter exists
  if (query.email) {
    try {
      const date = new Date();
      const today = new Date(date);

      // Processing the email (you can add your custom email processing logic here)\
      console.log('[' + today.toUTCString() +']: Processing the email: ' + query.email)
      const processedEmail = await processEmail(query.email);

      // Sending the JSON response
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: true, message: 'Email processed successfully', results: processedEmail }));
    } catch {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: false, message: 'Error processing email' }));
    }
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: false, message: 'Email parameter missing' }));
  }
});

// Custom email processing function
function processEmail(email) {
  return new Promise((resolve, reject) => {
    // Add your email processing logic here 
    const holehe = spawn('holehe', [email]);
    let output = '';

    holehe.stdout.on('data', (data) => {
      output += data;
    });

    holehe.on('close', (code) => {
      resolve(output);
    });
  });
}

// Starting the server on port 3000
server.listen(3000, () => {
  const date = new Date();
  const today = new Date(date);
  console.clear();

  console.log('----------------------------------------');
  console.log('   Mobiz-Advanced-OSINT-Tool REST API   ');
  console.log('   ©2023 Mobiz-Advanced-Technologies    ');
  console.log('----------------------------------------');
  console.log('[' + today.toUTCString() +']: Server is listening on port 3000');
});
