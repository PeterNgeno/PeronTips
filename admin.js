const express = require('express');
const router = express.Router();
const { db } = require('../firebase'); // Firebase Firestore instance

// Update existing quiz questions
router.post('/admin/update-quiz', async (req, res) => {
  const { quizId, question, answer } = req.body;

  try {
    if (!quizId || !question || !answer) {
      return res.status(400).json({ message: 'Quiz ID, question, and answer are required.' });
    }

    const quizRef = db.collection('quizzes').doc(quizId);
    await quizRef.update({ question, answer });

    res.json({ message: 'Quiz updated successfully.' });
  } catch (error) {
    console.error('Error updating quiz:', error);
    res.status(500).json({ error: 'Failed to update quiz' });
  }
});

module.exports = router;
