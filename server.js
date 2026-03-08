const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true })); // for form submissions
app.use(express.json()); // for JSON requests
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydb')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Schema & Model
const ContactSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // basic email regex
  }
});
const Contact = mongoose.model('Contact', ContactSchema);

// Serve HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submission
app.post('/users', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: '❌ Email is required!' });
    }

    const contact = new Contact({ email });
    await contact.save();

    res.json({ message: `✅ Thank you! Your email (${email}) has been submitted.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '❌ Something went wrong!' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});