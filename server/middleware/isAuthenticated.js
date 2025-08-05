import e from "express";

export const isAuthenticated = async (req, res, next) => {
  try {
    const accessToken = req.headers['authorization']
    
    if (accessToken && accessToken.startsWith('Bearer ')) {
      const token = accessToken.slice(7, accessToken.length);
      const data = jwt.verify(token, process.env.JWT_SECRET);

      // verify token

      const userData = jwt.verify(token, process.env.JWT_SECRET);
      
      // fetch user data

      const user = await prisma.user.findUnique({
        where: {
          id: userData.id
        }, 
        include: {
          orders: true,
          reviews: true,
          tickets: true,
        },
      });
      req.user = user;
      next();
    } else {
      return res.status(401).json({
        success: false,
        error: 'Authentication token is missing or invalid.'
      });
    } 
  } catch (error) {
    res.status(401).json({
      success: false,
      error: 'Authentication failed. Please log in again.',
      details: error.message
    });
  }
}