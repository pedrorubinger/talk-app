import React from 'react';

import './styles.css';

export default function Footer() {
    return(
        <footer className="default-footer">
            <p>All rights reserved. TalkApp &copy; 2020</p>
            <p>Designed and developed by
                <a
                    href="https://github.com/pedrorubinger"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Visit author's GitHub page"    
                >&nbsp;Pedro H. P. Rubinger
                </a>
            </p>
        </footer>
    );
}