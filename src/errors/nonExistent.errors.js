class NotExistError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotExistError';
  }
}

module.exports = {
  NotExistError,
};
