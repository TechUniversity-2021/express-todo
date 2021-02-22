// const { allToDoHandlers } = require('../todo.handler');
// const { allServices } = require('../services/todo.service');
// const { quoteHandler } = require('../quote.handler');
// const { quoteHandler } = require('../quote.handler');

// describe('Get to do handler', async () => {
//   const mockSend = jest.fn();
//   const mockRequest = null;
//   const mockResponse = {
//     status: jest.fn(() => ({ send: mockSend })), // in arrow func if returning object wrap in paranthesis
//   };
//   jest.spyOn(allServices, 'getFileData').mockResolvedValue([{id: 1, title:"abc", status:"complete"}, {id: 2, title:"xyz", status:"incomplete"}])
//   it('should set response status code to 200', () => {
//     allToDoHandlers.getToDoHandler(mockRequest, mockResponse);
//     expect(mockResponse.status).toHaveBeenCalledWith(200);
//   });

//   it('should send list of ToDo objects', () => {
//     allToDoHandlers.getToDoHandler(mockRequest, mockResponse);
//     expect(mockResponse.status().send).toHaveBeenCalledWith(');
//   });
// });

// describe('Get to do handler', async () => {
//   const mockSend = jest.fn();
//   const mockRequest = null;
//   const mockResponse = {
//     status: jest.fn(() => ({ send: mockSend })), // in arrow func if returning object wrap in paranthesis
//   };
//   jest.spyOn(allServices, 'getFileData').mockResolvedValue([{id: 1, title:"abc", status:"complete"}, {id: 2, title:"xyz", status:"incomplete"}])
//   it('should set response status code to 200', () => {
//     allToDoHandlers.getToDoHandler(mockRequest, mockResponse);
//     expect(mockResponse.status).toHaveBeenCalledWith(200);
//   });

//   it('should send list of ToDo objects', () => {
//     allToDoHandlers.getToDoHandler(mockRequest, mockResponse);
//     expect(mockResponse.status().send).toHaveBeenCalledWith(');
//   });
// });
