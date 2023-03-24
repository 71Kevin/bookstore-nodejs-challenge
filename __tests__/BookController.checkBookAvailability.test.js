const BookModel = require('../src/mongoose/models/BookModel');
const BookController = require('../src/controllers/BookController');

describe('BookController', () => {
  describe('checkBookAvailability', () => {
    it('should return "Book not found" if the book is not in the database', async () => {
      const req = { params: { id: 'nonexistentid' } };
      const res = { status: jest.fn(() => res), json: jest.fn() };
      jest.spyOn(BookModel, 'findById').mockResolvedValueOnce(null);
      await BookController.checkBookAvailability(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Book not found' });
      jest.restoreAllMocks();
    });

    it('should return "Book is available for borrowing" if the book is available', async () => {
      const req = { params: { id: 'availableid' } };
      const res = { json: jest.fn() };
      jest.spyOn(BookModel, 'findById').mockResolvedValueOnce({
        isAvailable: true,
      });
      await BookController.checkBookAvailability(req, res);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Book is available for borrowing',
      });
      jest.restoreAllMocks();
    });

    it('should return "Book is already borrowed" if the book is not available', async () => {
      const req = { params: { id: 'borrowedid' } };
      const res = { status: jest.fn(() => res), json: jest.fn() };
      jest.spyOn(BookModel, 'findById').mockResolvedValueOnce({
        isAvailable: false,
      });
      await BookController.checkBookAvailability(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Book is already borrowed',
      });
      jest.restoreAllMocks();
    });

    it('should return an error message and status 500 if an error occurs while fetching book', async () => {
      const req = { params: { id: 'someid' } };
      const res = { status: jest.fn(() => res), json: jest.fn() };
      const errorMessage = 'An error occurred';
      jest.spyOn(BookModel, 'findById').mockRejectedValueOnce(errorMessage);
      await BookController.checkBookAvailability(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'An error occurred while checking book availability',
      });
      jest.restoreAllMocks();
    });
  });
});
