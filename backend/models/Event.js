const mongoose = require("mongoose");

// Define the Event schema
const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    createdBy: {
        type: String,
        required: true,
    },
    pollOptions: [
        {
            option: String,
            votes: { type: Number, default: 0 },
            voters: [{ type: String }],
        },
    ],
    attendees: [
        {
            name: { type: String, required: true },
            email: { type: String, required: true },
        },
    ],
});

//create event model
const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
