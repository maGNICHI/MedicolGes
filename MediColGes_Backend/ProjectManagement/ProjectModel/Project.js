const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isDeleted: Boolean
},
{
    timestamps: true
}
);

module.exports = Project = mongoose.model('project', ProjectSchema);
