const fileOps = require('../task.handler');


describe('task Handler', () => {
  const mockSend = jest.fn();
  const mockResponse = {
    status: jest.fn(() => ({ send: mockSend })),

  };
  const mockRequest = null;

  it('should set status code to 200',async () => {
   await fileOps.taskHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });
  
});
