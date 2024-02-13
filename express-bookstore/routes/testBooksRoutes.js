const request = require("supertest");
const app = require("../app");
const { Book } = require("../models");

const { mockBook, mockUpdatedBook } = require("./books.fixtures");

describe("PUT /books/:isbn", function () {
  test("updates a book", async function () {
    Book.update = jest.fn().mockResolvedValue(mockUpdatedBook);

    const res = await request(app)
      .put(`/books/${mockBook.isbn}`)
      .send(mockUpdatedBook);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ book: mockUpdatedBook });
  });

  test("400 if isbn in body", async function () {
    const res = await request(app)
      .put(`/books/${mockBook.isbn}`)
      .send({ ...mockUpdatedBook, isbn: "new-isbn" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      error: "Not allowed!",
    });
  });

  test("400 if invalid data", async function () {
    const res = await request(app).put(`/books/${mockBook.isbn}`).send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeDefined();
  });
});
