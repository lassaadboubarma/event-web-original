const Event = require("../models/Event");

exports.RSVP = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    try {
        const event = await Event.findById(id);
        if (!event) return res.status(404).json({ message: "Event not found" });

        const isAlreadyAttending = event.attendees.some(att => att.email === email);
        if (isAlreadyAttending) {
            return res.status(400).json({ message: "Already RSVP'd" });
        }

        event.attendees.push({ name, email });
        await event.save();
        res.status(200).json({ message: "RSVP successful" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.vote = async (req, res) => {
    const { id } = req.params;
    const { option, voter } = req.body;

    try {
        const event = await Event.findById(id);
        if (!event) return res.status(404).json({ message: "Event not found" });

        const pollOption = event.pollOptions.find(opt => opt.option === option);
        if (!pollOption) return res.status(404).json({ message: "Poll option not found" });

        if (pollOption.voters.includes(voter)) {
            return res.status(400).json({ message: "You have already voted for this option" });
        }

        pollOption.votes += 1;
        pollOption.voters.push(voter);
        await event.save();

        res.status(200).json({ message: "Vote registered successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAttendees = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Event.findById(id);
        if (!event) return res.status(404).json({ message: "Event not found" });

        res.status(200).json({ attendees: event.attendees });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createEvent = async (req, res) => {
    const { title, description, date, pollOptions } = req.body;

    if (!title || !description || !date) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (!pollOptions || !Array.isArray(pollOptions) || pollOptions.length === 0) {
        return res.status(400).json({ message: "At least one poll option is required" });
    }

    // Validate that all poll options are objects with 'option' and 'votes' fields
    for (let option of pollOptions) {
        if (typeof option.votes !== 'number' || option.votes < 0) {
            return res.status(400).json({ message: "Each poll option must have a 'votes' field as a non-negative number." });
        }
    }

    try {
        const newEvent = new Event({
            title,
            description,
            date,
            createdBy: req.userId, // Use the authenticated user's ID
            pollOptions,
            attendees: [],
        });

        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find(); // Fetch all events from the database
        res.status(200).json(events); // Send the events back to the client
    } catch (err) {
        console.error("Error fetching events:", err);
        res.status(500).json({ error: "Error fetching events" });
    }
};