const expressJoi = require('express-joi-validation');

const validator = expressJoi.createValidator({ passError: true });

module.exports = { validator };
