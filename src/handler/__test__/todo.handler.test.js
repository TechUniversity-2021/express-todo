const todoService = require('../../services/todo.service');
const { todoHandler } = require('../todo.handler');

// describe('TODO Handler', () => {
//   it('should return status 200 along tasks', async () => {
//     const result = [{ id: '1', status: 'Complete', todo: 'Task1' }, { id: '2', status: 'Incomplete', todo: 'Task2' }];
//     const mockSend = jest.spyOn(todoService, 'structureFileContent').mockResolvedValue(result);

//     const mockReq = {
//       status: jest.fn(() => ({ send: mockSend })),

//     };
//     await todoHandler(null, mockReq);
//     expect(mockReq.status).toHaveBeenCalledWith(200);
//     expect(mockSend).toHaveBeenCalledWith(result);
//   });
// });

describe('should get all todo', ()=>{
  it('should be ')
})
