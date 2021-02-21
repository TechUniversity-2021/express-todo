const uuid = require("uuid");
const fileUtils = require("../utils/fileUtils");
const todoService = require("./todo.service");

//anything which has await before it mock

describe("Todo service", () => {
  xit("should return a list of todos when file read is successful", async () => {
    jest
      .spyOn(fileUtils, "readAfile")
      .mockResolvedValue("1|break|active\n2|break|active");
    const response = await todoService.getTodo();
    expect(response).toStrictEqual([
      { id: "1", todo: "break", status: "active" },
      { id: "2", todo: "break", status: "active" },
    ]);
  });


  xit("should return a todo of the respective id", async () => {
    jest
      .spyOn(fileUtils, "readAfile")
      .mockResolvedValue("1|Take a break|Active\n2|Make tea|Active\n3|Buy 1kg rice|Active\n4|Follow tdd|Active");
    const response = await todoService.getTodoWithId(3);
    expect(response).toStrictEqual([
      { id: "3", todo: "Buy 1kg rice", status: "Active" },
    ]);
  });

  //TODO
  it("should add a new todo", async () => {
    jest.spyOn(fileUtils, "appendToAfile").mockResolvedValue("1|break|active\n2|break|active\n123|Do work|active");
    jest.spyOn(uuid, "v4").mockImplementation(()=>"123");
    const response =  await todoService.postTodo({ todo: 'Do work' });
    console.log(response)
    expect(response).toBe('1|break|active\n2|break|active\n123|Do work|active');
  });
});
