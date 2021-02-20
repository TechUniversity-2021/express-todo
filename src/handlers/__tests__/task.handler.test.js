const fileOps = require('../task.handler');


describe('Get todos handler', () => {
  const mockSend = jest.fn();
  const mockResponse = {
    status: jest.fn(() => ({ send: mockSend })),

  };
  const mockRequest = null;

  it('should set status code to 200',async () => {
   await fileOps.getTodosHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });
  
});


describe('get Todo by id handler', () => {
  const mockSend = jest.fn();
  const mockResponse = {
    status: jest.fn(() => ({ send: mockSend })),

  };
  const mockRequest ={ 
    params: jest.fn()}
  

  it('should set status code to 200',async () => {
   await fileOps.getTodoByIdHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });
  
});

