const BookModel = require('../mongoose/models/BookModel');

class BookController {
  async getBooks(req, res) {
    try {
      const { q } = req.query;
      const filter = q ? { title: new RegExp(q, 'i') } : {};
      const books = await BookModel.find(filter);
      res.json({ books });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: 'An error occurred while fetching books' });
    }
  }

  async getBookById(req, res) {
    try {
      const book = await BookModel.findById(req.params.id);

      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }

      res.json({ book });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: 'An error occurred while fetching book' });
    }
  }

  async checkBookAvailability(req, res) {
    try {
      const book = await BookModel.findById(req.params.id);

      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }

      if (book.isAvailable) {
        res.json({ message: 'Book is available for borrowing' });
      } else {
        res.status(400).json({ message: 'Book is already borrowed' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'An error occurred while checking book availability',
      });
    }
  }

  async manageBook(req, res) {
    try {
      const { method } = req;
      let bookToUpdate, bookToDelete;

      switch (method) {
        case 'POST': {
          const { title, author } = req.body;
          const book = new BookModel({
            title,
            author,
            isAvailable: true,
            borrower: 'none',
          });
          await book.save();
          res.status(201).json({ book });
          break;
        }

        case 'PUT': {
          const { title: newTitle, author: newAuthor, borrower } = req.body;
          bookToUpdate = await BookModel.findById(req.params.id);

          if (!bookToUpdate) {
            return res.status(404).json({ message: 'Book not found' });
          }

          if (!bookToUpdate.isAvailable) {
            return res
              .status(400)
              .json({ message: 'Book is already borrowed' });
          }

          bookToUpdate.title = newTitle;
          bookToUpdate.author = newAuthor;
          if (borrower !== undefined) {
            bookToUpdate.borrower = borrower;
            bookToUpdate.isAvailable = false;
          } else {
            bookToUpdate.borrower = bookToUpdate.borrower || 'none';
          }
          await bookToUpdate.save();
          res.json({ book: bookToUpdate });
          break;
        }

        case 'DELETE': {
          bookToDelete = await BookModel.findById(req.params.id);

          if (!bookToDelete) {
            return res.status(404).json({ message: 'Book not found' });
          }

          if (!bookToDelete.isAvailable) {
            return res
              .status(400)
              .json({ message: 'Book is already borrowed' });
          }

          await BookModel.deleteOne({ _id: req.params.id });
          res.json({ message: 'Book deleted successfully' });
          break;
        }
        default:
          res.status(405).json({ message: 'Method not allowed' });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: 'An error occurred while managing book' });
    }
  }
}

module.exports = new BookController();
