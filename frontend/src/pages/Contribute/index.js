import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';

import './styles.css';
import { DonateForm } from '../../components/DonateForm';

export function Contribute() {
    return(
        <div id="contribute-container">
            <header>
                <Link className="link-back-to-home" to="/" style={{ fontSize: '.8rem' }} title="Back to home page">
                    <AiFillHome size="15" color="#fff" style={{ marginRight: '8px' }} />Back to home
                </Link>

                <h1>Contribute as you can</h1>
                <h2>
                    Please, help maintain and improve this project.
                    <br></br>If you want to contribute to the project and make it better, your help is very welcome.
                </h2>
            </header>

            <section className="contribute-main-content">
                <h3>Hey, dev! This message is for you!</h3>
                
                <div id="contribute-github-section">
                    All project code is available on GitHub. <br></br>Help us to improve it as you can!
                    <a
                        href="https://github.com/pedrorubinger/talk-app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button"
                        title="Go to the GitHub repository"
                    >
                        Go to repository
                    </a>
                </div>
                <p>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dictum sapien vel leo convallis 
                    interdum. Duis rutrum interdum tellus eu gravida. Aenean ac elit tincidunt, accumsan odio a, euismod velit.
                    Duis rutrum rutrum justo. Mauris hendrerit tempus imperdiet. Quisque porttitor ante sed erat tincidunt 
                    fringilla non eget nisl. Donec interdum sed libero eu placerat. In lacinia ultricies congue. Suspendisse 
                    pellentesque diam ut ligula elementum, eu elementum velit pharetra. Nam pretium non eros vel laoreet. 
                    Donec suscipit sem non euismod tincidunt. Nunc lorem massa, porta nec orci in, varius interdum justo. 
                    <br></br>
                    Praesent tortor neque, dignissim non sapien quis, aliquet feugiat nulla.
                    Maecenas vehicula in magna quis fringilla. Etiam placerat efficitur sapien, in sollicitudin dui tincidunt
                    sed. Curabitur congue massa quis mauris bibendum vehicula. Etiam eleifend neque ac ante ornare, et 
                    faucibus orci vehicula. Etiam a mi quis risus suscipit semper. Nulla blandit augue in neque eleifend 
                    tincidunt. Pellentesque sapien mauris, varius nec arcu sit amet, pulvinar feugiat tortor. 
                </p>

                <hr></hr>
            </section>

            <section className="contribute-main-content">
                <h3>Support our work: consider making a donation</h3>

                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Etiam placerat efficitur sapien, in sollicitudin dui tincidunt
                sed. Curabitur congue massa quis mauris bibendum vehicula. Etiam eleifend neque ac ante ornare, et 
                faucibus orci vehicula. Etiam a mi quis risus suscipit semper. Nulla blandit augue in neque eleifend 
                tincidunt. Pellentesque sapien mauris, varius nec arcu sit amet, pulvinar feugiat tortor. 
                Quisque porttitor ante sed erat tincidunt fringilla non eget nisl. Donec interdum sed libero eu placerat.
                In lacinia ultricies congue. Suspendisse pellentesque diam ut ligula elementum, eu elementum velit pharetra.

                <DonateForm></DonateForm>
            </section>
        </div>
    );
}