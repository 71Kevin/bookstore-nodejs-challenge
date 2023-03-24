const jwt = require('jsonwebtoken');

class AuthMiddleware {
  async validatePassword(req, res, next) {
    try {
      const { password } = req.body;

      if (password !== process.env.SECRET_KEY) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async generateToken(req, res) {
    try {
      const token = jwt.sign(
        { data: 'authenticated' },
        process.env.SECRET_KEY,
        {
          expiresIn: '30m',
        }
      );
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async authenticate(req, res, next) {
    try {
      const { authorization } = req.headers;

      console.log('authorization:', authorization);

      if (!authorization) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const token = authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decodedToken;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
}

module.exports = new AuthMiddleware();
