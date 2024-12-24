import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./CreateEvent.css";

const CreateEvent = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [pollOptions, setPollOptions] = useState([{ option: "" }, { option: "" }]);

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...pollOptions];
        updatedOptions[index].option = value;
        setPollOptions(updatedOptions);
    };

    const handleAddOption = () => {
        setPollOptions([...pollOptions, { option: "" }]);
    };

    const handleRemoveOption = (index) => {
        const updatedOptions = pollOptions.filter((_, i) => i !== index);
        setPollOptions(updatedOptions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
    
        if (!token) {
            alert("You must be logged in to create an event.");
            return;
        }
    
        try {
            // Prepare poll options with the votes set to 0 by default
            const pollOptionsWithVotes = pollOptions.map(option => ({
                option: option,
                votes: 0,   // Default value for votes is 0
                voters: []  // Empty array of voters initially
            }));
    
            // Send the event data to the backend, including poll options with default votes
            await axios.post(
                "http://localhost:5000/api/events",
                {
                    title,
                    description,
                    date,
                    pollOptions: pollOptionsWithVotes // Include poll options with votes set to 0
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert("Event created successfully!");
            setTitle("");
            setDescription("");
            setDate("");
            setPollOptions(["", ""]); // Reset options after submitting
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Error creating event.");
        }
    };
    
    

    return (
        <div className="create-event-container">
            <nav className="navigation">
                <Link to="/" className="home-button">Home</Link>
            </nav>

            <h2>Create an Event</h2>
            <form onSubmit={handleSubmit} className="create-event-form">
                <input
                    type="text"
                    placeholder="Event Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input"
                    required
                />
                <textarea
                    placeholder="Event Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="input"
                    rows="5"
                    required
                />
                <input
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="input"
                    required
                />

                <h3>Poll Options</h3>
                {pollOptions.map((option, index) => (
                    <div key={index} className="poll-option">
                        <input
                            type="text"
                            placeholder={`Option ${index + 1}`}
                            value={option.option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            className="input"
                            required
                        />
                        {pollOptions.length > 2 && (
                            <button
                                type="button"
                                className="remove-option-button"
                                onClick={() => handleRemoveOption(index)}
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    className="add-option-button"
                    onClick={handleAddOption}
                >
                    Add Option
                </button>

                <button type="submit" className="button">Create Event</button>
            </form>
        </div>
    );
};

export default CreateEvent;
