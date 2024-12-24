const express = require("express");
const { getAllEvents,RSVP, vote, getAttendees, createEvent } = require("../Controllers/EventController");
const verifyToken = require("../MiddleWare/verifyToken");
const router = express.Router();

// Routes for events
router.post("/", verifyToken, createEvent); // Create event (authentication required)
router.get("/", getAllEvents);  
router.post("/:id/rsvp", RSVP); // RSVP for event
router.post("/:id/vote", verifyToken, vote); // Voting for event's poll options
router.get("/:id/attendees", getAttendees); // Get list of attendees for the event

module.exports = router;
