const express = require('express');
const router = express.Router();
const BookController = require('../controllers/BookController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

router.get('/ping', (request, response) => {
  try {
    response.send({ message: 'pong' });
  } catch (error) {
    response.status(500).send({ error: 'Internal Server Error' });
  }
});

router.post(
  '/login',
  AuthMiddleware.validatePassword,
  AuthMiddleware.generateToken
);

router.get('/books', AuthMiddleware.authenticate, BookController.getBooks);

router.get(
  '/books/:id/check-availability',
  AuthMiddleware.authenticate,
  BookController.checkBookAvailability
);

router.get(
  '/books/:id',
  AuthMiddleware.authenticate,
  BookController.getBookById
);

router.post('/books', AuthMiddleware.authenticate, BookController.manageBook);

router.put(
  '/books/:id',
  AuthMiddleware.authenticate,
  BookController.manageBook
);

router.delete(
  '/books/:id',
  AuthMiddleware.authenticate,
  BookController.manageBook
);

module.exports = router;
