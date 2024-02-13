const { expect } = require("chai");
const Book = require("../models/book");

describe("Book", () => {
  describe("findOne", () => {
    it("should find a book by isbn", async () => {
      const testIsbn = "1234567890";
      const testBook = {
        isbn: testIsbn,
        title: "Test Book Title",
        author: "Test Author",
      };

      // Mock DB query to return test book
      sinon.stub(db, "query").resolves({ rows: [testBook] });

      const foundBook = await Book.findOne(testIsbn);

      expect(foundBook).to.deep.equal(testBook);

      db.query.restore();
    });

    it("should throw 404 error if book not found", async () => {
      const testIsbn = "0987654321";

      // Mock DB query to return no results
      sinon.stub(db, "query").resolves({ rows: [] });

      let error;
      try {
        await Book.findOne(testIsbn);
      } catch (err) {
        error = err;
      }

      expect(error).to.deep.equal({
        message: `There is no book with an isbn '${testIsbn}'`,
        status: 404,
      });

      db.query.restore();
    });
  });
});
