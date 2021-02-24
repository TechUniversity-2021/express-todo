const { Todo } = require('../../models');
const fileOps = require('../task.service');

describe('Get todos service:', () => {
  it('should display todos ', async () => {
    const todos = [{
      id: '1',
      title: 'abc',
      status: 'Completed',
    }];

    const getSpy = jest.spyOn(Todo , 'findAll')
      .mockResolvedValue(todos);

    const data = await fileOps.getTodosService();

    expect(data).toEqual(todos);
  });
});

describe('Get todo by id service:', () => {
  it('should display todo by id', async () => {
    const todos = [{
      title: 'abc',
    }];

    const spyOnTodoRepo = jest.spyOn(Todo, 'findAll').mockResolvedValue(todos);

    const todoList = await fileOps.getTodoByIdService(1);
    expect(todoList).toEqual(todos);
  });
});

describe('Post todo service:', () => {
  it('should post a todo into db', async () => {
    const todos = [{
      title: 'abc',
      status: 'Complete',
    }];

    const postSpy = jest.spyOn(Todo, 'create').mockResolvedValue(todos);

   const todo= await fileOps.postTodoService('body');
    expect(todo).toEqual(todos);
  });
});

describe('Update todo by id service:', () => {
  it('should update todo by id', async () => {
    const mockResponse = [{
      id: 1,
      title: 'abc',
      status: 'Completed',
      createdAt: "2021-02-24T09:40:20.285Z",
      updatedAt: "2021-02-24T09:40:34.154Z"
    }];

    const putSpy = jest.spyOn(Todo, 'update').mockResolvedValue(mockResponse);

    const todo = await fileOps.putTodoService('body', 1);

   
    expect(mockResponse).toEqual(todo);
  });
});

describe('Delete todo by id service:', () => {
  it('should delete todo by id', async () => {
    const todos = [{
      title: 'abc',
      status: 'Completed',
    }];

    const putSpy = jest.spyOn(Todo, 'destroy').mockResolvedValue(todos);

    await fileOps.deleteTodoService( 1);

    expect(putSpy).toHaveBeenCalled();
  });
});
