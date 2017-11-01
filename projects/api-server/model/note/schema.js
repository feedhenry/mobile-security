const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const noteSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String }
});


module.exports = mongoose.model('Note', noteSchema);
