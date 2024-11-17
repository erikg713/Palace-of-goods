const { generateRecommendations } = require('../services/recommendationService');

exports.getRecommendations = async (req, res) => {
  try {
    const recommendations = await generateRecommendations(req.params.userId);
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
};
