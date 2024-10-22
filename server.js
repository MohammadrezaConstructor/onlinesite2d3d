const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public')); 

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://morezaei:minilab2025@cluster0.8ky5v.mongodb.net/'    , {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Schema and Model for Form Data
const formSchema = new mongoose.Schema({
    code: String,
    gender: String,
    age: String,
    edu: String,
    timesm: String,
    purchase: String,
    exp: String,
    sm1: [String],
    sm11: String,
    sm2: [String],
    sm22: String,
    msg: String
});

const FormData = mongoose.model('FormData', formSchema);

// Schema and Model for Comments
/*
const commentSchema = new mongoose.Schema({
    text: String,
    code: String ,
    date: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', commentSchema);*/

const traditionalCommentSchema = new mongoose.Schema({
    text: String,
    code: String,
    date: { type: Date, default: Date.now }
});

const TraditionalComment = mongoose.model('TraditionalComment', traditionalCommentSchema);

// Schema and Model for 3D Comments
const threeDCommentSchema = new mongoose.Schema({
    text: String,
    code: String,
    date: { type: Date, default: Date.now }
});

const ThreeDComment = mongoose.model('ThreeDComment', threeDCommentSchema);


// Schema and Model for Action Logs
const actionLogSchema = new mongoose.Schema({
    action: String,
    date: { type: Date, default: Date.now }
});

const ActionLog = mongoose.model('ActionLog', actionLogSchema);

// Routes
// Route for Form Submission
app.post('/submit', async (req, res) => {
    const formData = new FormData({
        code: req.body.code,
        gender: req.body.gender,
        age: req.body.age,
        edu: req.body.edu,
        timesm: req.body.timesm,
        purchase: req.body.purchase,
        exp: req.body.exp,
        sm1: req.body.sm1,
        sm11: req.body.sm11,
        sm2: req.body.sm2,
        sm22: req.body.sm22,
        msg: req.body.msg
    });
    try {
        await formData.save();
        res.status(200).json({ message: 'Now, on the next page you will experience an online shopping experience in a traditional website design where you will see the dress you are about to buy and upon reviewing it, please write your opinion about any feelings you have in comparison to a real shopping experience...' });
    } catch (error) {  
        res.status(500).json({ message: 'Error submitting form.', error });
}
});


// Route for Comment Submission
/*
app.post('/comments', async (req, res) => {
    try {
        const comment = new Comment({ text: req.body.text });
        await comment.save();
        res.status(200).json({ message: 'Then, on the next page you will experience an online shopping experience in a 3D website design where you will see the dress you are about to buy and upon reviewing it, please write your opinion about any feelings you have in comparison to a real shopping experience...' });
        res.status(201).send('Comment saved!');
    } catch (error) {
        console.error('Error saving comment:', error);
        res.status(500).send('An error occurred while saving your comment. Please try again later.');
    }
});*/
/*app.post('/comments', async (req, res) => {
    try {
        const comment = new Comment({
             text: req.body.text,
             code: req.body.code 
              });
        await comment.save();
        res.status(200).json({ message: 'Then, on the next page you will experience an online shopping experience in a 3D website design where you will see the dress you are about to buy and upon reviewing it, please write your opinion about any feelings you have in comparison to a real shopping experience...' });
    } catch (error) {
        console.error('Error saving comment:', error);
        res.status(500).send('An error occurred while saving your comment. Please try again later.');
    }
});*/

// Route for Comment Submission from Traditional Shop
app.post('/traditional-comments', async (req, res) => {
    try {
        const comment = new TraditionalComment({
            text: req.body.text,
            code: req.body.code // Store code
        });
        await comment.save();
        res.status(200).json({ message: 'Comment saved for traditional shop!' });
    } catch (error) {
        console.error('Error saving traditional comment:', error);
        res.status(500).send('An error occurred while saving your comment. Please try again later.');
    }
});

// Route for Comment Submission from 3D Shop
app.post('/3d-comments', async (req, res) => {
    try {
        const comment = new ThreeDComment({
            text: req.body.text,
            code: req.body.code // Store code
        });
        await comment.save();
        res.status(200).json({ message: 'Comment saved for 3D shop!' });
    } catch (error) {
        console.error('Error saving 3D comment:', error);
        res.status(500).send('An error occurred while saving your comment. Please try again later.');
    }
});



// Route for Action Logging
app.post('/logAction', async (req, res) => {
    try {
        console.log('Received action:', req.body.action, 'at', req.body.timestamp); // Debugging log
        const actionLog = new ActionLog({ action: req.body.action, date: req.body.timestamp });
        await actionLog.save();
        res.status(201).send('Action logged!');
    } catch (error) {
        console.error('Error logging action:', error); // Debugging log
        res.status(500).send('An error occurred while logging the action. Please try again later.');
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
