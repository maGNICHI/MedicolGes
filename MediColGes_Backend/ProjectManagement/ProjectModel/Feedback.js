const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({

    title: String,
    description: String,
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    isDeleted: Boolean
},
{
    timestamps: true
}
);

module.exports = Feedback = mongoose.model('feedback', FeedbackSchema);
