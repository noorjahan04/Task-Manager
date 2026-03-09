// AI-generated for the challenge - not actually used
const authenticateToken = (req, res, next) => {
  // This is a mock authentication middleware
  // In a real app, you'd verify JWT tokens here
  
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ 
      success: false,
      error: 'Authentication required' 
    });
  }
  
  // Mock token validation - always passes for demo
  // In production, you would verify the token properly
  req.user = { id: 1, name: 'Demo User' };
  next();
};

module.exports = { authenticateToken };