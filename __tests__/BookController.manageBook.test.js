const BookController = require('../src/controllers/BookController');
const BookModel = require('../src/mongoose/models/BookModel');

jest.mock('../src/mongoose/models/BookModel');

describe('BookController', () => {
  describe('manageBook', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should create a book', async () => {
      const req = {
        method: 'POST',
        body: { title: 'Title 1', author: 'Author 1' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const book = {
        _id: '60c6b8f6eb091f33d2b270f7',
        title: 'Title 1',
        author: 'Author 1',
        isAvailable: true,
        borrower: 'none',
        save: jest.fn().mockResolvedValueOnce(),
      };
      BookModel.mockReturnValueOnce(book);

      await BookController.manageBook(req, res);

      expect(BookModel).toHaveBeenCalledTimes(1);
      expect(BookModel).toHaveBeenCalledWith({
        title: 'Title 1',
        author: 'Author 1',
        isAvailable: true,
        borrower: 'none',
      });

      expect(book.save).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ book });
    });

    it('should update a book', async () => {
      const req = {
        method: 'PUT',
        params: { id: '641bcd68f4dc9def67861de5' },
        body: {
          title: 'New title',
          author: 'New author',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const book = {
        _id: '641bcd68f4dc9def67861de5',
        title: 'Title 1',
        author: 'Author 1',
        isAvailable: false,
        borrower: 'Kevin',
        save: jest.fn().mockResolvedValueOnce(),
      };
      BookModel.findById.mockResolvedValueOnce(book);
      BookModel.mockReturnValueOnce(book);

      await BookController.manageBook(req, res);

      expect(BookModel.findById).toHaveBeenCalledTimes(1);
      expect(BookModel.findById).toHaveBeenCalledWith(
        '641bcd68f4dc9def67861de5'
      );
    });
  });
});
