import React from 'react';

import './styles.css';

export function DonateForm() {
    return(
        <div id="donate-form-container">
            <form id="donate-form">
                <div id="donate-name-input-group" className="donate-container-group">
                    <label htmlFor="donor-name">Name <span style={{ color: 'red' }}>*</span></label>
                    <input
                        type="text"
                        id="donor-name"
                        name="donor-name"
                        placeholder="Your name"
                        max="50"
                        autoFocus
                    >
                    </input>
                </div>

                <div id="donate-email-input-group" className="donate-container-group">
                    <label htmlFor="donor-email">Email <span style={{ color: 'red' }}>*</span></label>
                    <input
                        type="email"
                        id="donor-email"
                        name="donor-email"
                        placeholder="Your email"
                        max="50"
                    >
                    </input>
                </div>

                <div id="donate-amount-input-group" className="donate-container-group">
                    <label htmlFor="donor-amount">Amount (R$) <span style={{ color: 'red' }}>*</span></label>
                    <input
                        type="number"
                        id="donor-amount"
                        name="donor-amount"
                        placeholder="Amount of money (R$)"
                        max="20"
                        defaultValue="5"
                    >
                    </input>
                </div>

                <button
                    type="submit"
                    id="submit-donation-form-button"
                >
                    Donate
                </button>
            </form>
        </div>
    );
}