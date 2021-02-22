class FileOperationError extends Error {
  constructor(message) {
    super(message); // (1)
    this.name = 'FileOperationError'; // (2)
  }
}

module.exports = FileOperationError;
