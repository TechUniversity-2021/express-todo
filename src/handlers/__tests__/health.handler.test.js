const { healthHandler } = require('../health.handler');

describe('Health Handler', () => {
  const mockSend = jest.fn();
  const mockResponse = {
    status: jest.fn(() => ({ send: mockSend })),
  };
  const mockRequest = null;
  it('should set response status code to 200', () => {
    healthHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });
  it('should return string "Server is running!"', () => {
    healthHandler(mockRequest, mockResponse);
    expect(mockResponse.status().send).toHaveBeenCalledWith('Server is running!');
  });
});
