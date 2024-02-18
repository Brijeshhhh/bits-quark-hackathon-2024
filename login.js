const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Dummy user data (not secure for production)
let users = [];

// Route for serving the sign-up page
app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
});

// Route for processing sign-up form submissions
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    // Check if username is already taken
    if (users.find(user => user.username === username)) {
        res.status(400).send('Username already exists');
    } else {
        // Store new user in memory (not secure for production)
        users.push({ username, password });
        res.send('Sign-up successful! You can now <a href="/login">login</a>.');
    }
});

// Route for serving the login page
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

// Route for processing login form submissions
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Find user in memory (not secure for production)
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        res.send('Login successful!');
    } else {
        res.status(401).send('Invalid username or password');
    }
});
// Serve login page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

// Handle login form submission
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Perform authentication logic here

    // Redirect to data display page after successful login
    res.redirect('/dataDisplay?url=https://example.com');
});

// Serve data display page
app.get('/dataDisplay', (req, res) => {
    const url = req.query.url;
    res.sendFile(__dirname + '/dataDisplay.html');
});
// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
