const db = require('../db'); // Firebase Firestore instance

// Update Quiz
exports.updateQuiz = async (req, res) => {
  try {
    const { quizId, question, answer } = req.body;

    // Ensure required fields are provided
    if (!quizId || !question || !answer) {
      return res.status(400).json({ message: 'Quiz ID, question, and answer are required.' });
    }

    const quizRef = db.collection('quizzes').doc(quizId);

    // Check if the quiz exists
    const quizDoc = await quizRef.get();
    if (!quizDoc.exists) {
      return res.status(404).json({ message: 'Quiz not found.' });
    }

    // Update the quiz
    await quizRef.update({ question, answer });
    res.json({ message: 'Quiz updated successfully.' });
  } catch (error) {
    console.error('Error updating quiz:', error);
    res.status(500).json({ message: 'Failed to update quiz.' });
  }
};
