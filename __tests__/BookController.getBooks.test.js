const BookModel = require('../src/mongoose/models/BookModel');
const BookController = require('../src/controllers/BookController');

describe('getBooks', () => {
  it('should return all books when no query param is provided', async () => {
    const mockBooks = [
      { title: 'Book 1', author: 'Author 1' },
      { title: 'Book 2', author: 'Author 2' },
    ];
    const mockReq = { query: {} };
    const mockRes = {
      json: jest.fn(),
      status: jest.fn(() => mockRes),
    };
    jest.spyOn(BookModel, 'find').mockResolvedValue(mockBooks);

    await BookController.getBooks(mockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith({ books: mockBooks });
  });

  it('should return filtered books when a query param is provided', async () => {
    const mockBooks = [
      { title: 'Book 1', author: 'Author 1' },
      { title: 'Book 2', author: 'Author 2' },
    ];
    const mockReq = { query: { q: 'book' } };
    const mockRes = {
      json: jest.fn(),
      status: jest.fn(() => mockRes),
    };
    jest.spyOn(BookModel, 'find').mockResolvedValue(mockBooks);

    await BookController.getBooks(mockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith({ books: mockBooks });
  });

  it('should return an error when there is an error fetching books', async () => {
    const mockReq = { query: {} };
    const mockRes = {
      json: jest.fn(),
      status: jest.fn(() => mockRes),
    };
    jest.spyOn(BookModel, 'find').mockRejectedValue(new Error());

    await BookController.getBooks(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'An error occurred while fetching books',
    });
  });
});
