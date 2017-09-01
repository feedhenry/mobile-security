const Facade = require('../../lib/facade');
const noteSchema = require('./schema');

class NoteFacade extends Facade {}

module.exports = new NoteFacade(noteSchema);
