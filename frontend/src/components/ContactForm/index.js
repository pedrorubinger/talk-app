import React from 'react';

import './styles.css';

export function ContactForm() {
    const submitContactMessage = event => {
        event.preventDefault();

        console.log("Enviei");
    }

    return(
        <div id="contact-form-container">
            <form id="contact-form" onSubmit={submitContactMessage}>
                <div className="contact-form-group">
                    <label htmlFor="name">
                        Name <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Your name"
                        maxLength="50"
                    />
                </div>

                <div className="contact-form-group">
                    <label htmlFor="name">
                        Email <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Your email"
                        maxLength="35"
                    />
                </div>

                <div className="contact-form-group">
                    <label htmlFor="message">
                        Message <span style={{ color: 'red' }}>*</span>
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows="8"
                        cols="33"
                        placeholder="Your message here"
                        maxLength="300"
                    />
                </div>

                <button
                    type="submit"
                    id="contact-form-submit-button"
                    title="Submit message"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}