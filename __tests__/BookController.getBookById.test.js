const BookModel = require('../src/mongoose/models/BookModel');
const BookController = require('../src/controllers/BookController');

describe('getBookById', () => {
  it('returns a book with a valid id', async () => {
    const bookId = '12345';
    const book = { _id: bookId, title: 'Test Book', author: 'Test Author' };
    const req = { params: { id: bookId } };
    const res = { json: jest.fn() };
    jest.spyOn(BookModel, 'findById').mockResolvedValue(book);

    await BookController.getBookById(req, res);

    expect(res.json).toHaveBeenCalledWith({ book });
    expect(BookModel.findById).toHaveBeenCalledWith(bookId);
  });

  it('returns a 404 error for an invalid id', async () => {
    const bookId = '12345';
    const req = { params: { id: bookId } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    jest.spyOn(BookModel, 'findById').mockResolvedValue(null);

    await BookController.getBookById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Book not found' });
    expect(BookModel.findById).toHaveBeenCalledWith(bookId);
  });

  it('returns a 500 error for a server error', async () => {
    const bookId = '12345';
    const req = { params: { id: bookId } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const error = new Error('Test error');
    jest.spyOn(BookModel, 'findById').mockRejectedValue(error);
    jest.spyOn(console, 'error').mockImplementation(() => {});

    await BookController.getBookById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'An error occurred while fetching book',
    });
    expect(console.error).toHaveBeenCalledWith(error);
    expect(BookModel.findById).toHaveBeenCalledWith(bookId);
  });
});
