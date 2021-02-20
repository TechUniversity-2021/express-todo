const { TestScheduler } = require("jest");
const { expression } = require("joi");
const fileUtils = require("../utils/fileUtils");
const todoService = require("./todo.service");
//anything which has await before it mock

describe("Todo service", () => {

  it("should return a list of todos when file read is successful", async () => {
    jest
      .spyOn(fileUtils, "readAfile")
      .mockResolvedValue("1|break|active\n2|break|active");
    const response = await todoService.getTodo();
    expect(response).toStrictEqual([
      { id: "1", todo: "break", status: "active" },
      { id: "2", todo: "break", status: "active" },
    ]);
  });

  //TODO
  it("should add a new todo",async () => {
    jest.spyOn(fileUtils,"appendToAfile").mockResolvedValue()
    await todoService.postTodo();
    expect().toHaveBeenCalledWith()
  })
});
