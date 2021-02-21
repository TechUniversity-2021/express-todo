const fileUtils = require("../utils/fileUtils");
const todoHandler = require("./todo.handler");
const todoService = require("../services/todo.service")
//anything which has await before it mock

describe("Todo handler", () => {

  it("should return with a status code 200 along with todo objects", async () => {
    jest
      .spyOn(todoService, "getTodo")
      .mockResolvedValue([
        { id: "1", todo: "break", status: "active" },
        { id: "2", todo: "break", status: "active" },
      ]);
    const mockResponse = {
        status: jest.fn(()=> mockResponse),
        send: jest.fn()
    }
    await todoHandler.getTodos(null,mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.send).toHaveBeenCalledWith([
        { id: "1", todo: "break", status: "active" },
        { id: "2", todo: "break", status: "active" },
      ]);
  });

  it("should return with a status code 200 along with todo of respective id", async() => {
    const getTodoWithIdSpy = jest.spyOn(todoService,'getTodoWithId').mockResolvedValue([
      { id: "3", todo: "Buy 1kg rice", status: "Active" },
    ])
    const mockResponse =  {
      status: jest.fn(() => mockResponse),
      send: jest.fn()
    }
    const mockRequest = {
      params: {id: "3"}
    }
    await todoHandler.getTodoById(mockRequest,mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(getTodoWithIdSpy).toHaveBeenCalledWith("3")
    expect(mockResponse.send).toHaveBeenCalledWith([
      { id: "3", todo: "Buy 1kg rice", status: "Active" }
    ])
  })
});
