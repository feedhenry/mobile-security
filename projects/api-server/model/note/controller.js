const Controller = require('../../lib/controller');
const noteFacade = require('./facade');

class NoteController extends Controller {}

module.exports = new NoteController(noteFacade);
