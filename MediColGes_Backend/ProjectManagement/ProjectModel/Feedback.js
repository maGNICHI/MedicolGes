const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({

    title: String,
    description: String,
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    isDeleted: Boolean,
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
},
{
    timestamps: true
}
);

module.exports = Feedback = mongoose.model('feedback', FeedbackSchema);
