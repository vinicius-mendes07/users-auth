const jwt = require('jsonwebtoken');

function authService(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization && authorization.split(' ')[1];

  if (!token) {
    return res.status(400).json({ mensagem: 'Não autorizado' });
  }

  try {
    const decodedToken = jwt.decode(token, 'secret');
    if (decodedToken.exp < Math.floor(Date.now() / 1000)) {
      return res.status(400).json({ mensagem: 'Sessão inválida.' });
    }

    next();
  } catch (error) {
    res.status(400).json({ mensagem: 'Não autorizado.' });
  }
}

module.exports = authService;