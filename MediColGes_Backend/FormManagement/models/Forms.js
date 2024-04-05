const mongoose = require('mongoose');
const responseTypeEnum = ['String', 'Number', 'Date', 'RadioButton'];
const formSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    questions: {
      type: String,
      required: true,
    },

  }
);

module.exports = mongoose.model('Form', formSchema);