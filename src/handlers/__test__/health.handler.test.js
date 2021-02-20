const { healthHandler } = require('../health.handler');

describe('Server', () => {
  const mockSend = jest.fn();
  const mockResponse = {
    status: jest.fn(() => ({ send: mockSend })),
  };
  it('should set response status code to 200', async () => {
    await healthHandler(null, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });
  it('should send a message\'Server is up!', async () => {
    await healthHandler(null, mockResponse);
    expect(mockSend).toBeCalledWith('Server is up!');
  });
});
