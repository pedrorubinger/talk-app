import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import { BsChatFill } from 'react-icons/bs';

import imgSmartphone from '../../assets/smartphone.png';
import imgCardOne from '../../assets/card1.jpg';
import imgCardTwo from '../../assets/card2.jpg';
import imgCardThree from '../../assets/card3.jpg';
import imgCardFour from '../../assets/card4.jpg';
import imgCardFive from '../../assets/card5.jpg';
import imgCardSix from '../../assets/card6.jpg';

import './styles.css';
import { ContactForm } from '../../components/ContactForm';
import { checkAuthentication, logout } from '../../services/auth';
import { readCookie } from '../../utils/handlingCookies';
import { USER_KEY } from '../../utils/constants';
import Footer from '../../components/Footer';

export function Home() {
    const history = useHistory();
    const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);
    const [userNickname, setUserNickname] = useState("Failed");
    const [id, setUserId] = useState(''); 
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const token = readCookie(USER_KEY);

        if(token) {
            const getAuthentication = async () => {
                checkAuthentication().then(response => {
                    if(response.success) {
                        setUserIsAuthenticated(true);
                        setUserNickname(response.user_nick);
                        setUserId(response.user_id);
                        setReady(true);
                    } else {
                        setUserIsAuthenticated(false);
                        setReady(true);
                    }
                }).catch(err => {
                    console.log(err);
                    setReady(true);
                });
            }

            getAuthentication();
        } else
            setReady(true);
    }, []);

    if(!ready)
        return <h2 className="loading-page-message">Please wait. The page is loading...</h2>

    return(
        <div id="home-container">
            <header>
                <nav>
                    <h1 id="h1-logo" title="TalkApp - Chat Web Application">TalkApp <BsChatFill size="24"></BsChatFill></h1>

                    <ul>
                        {
                            userIsAuthenticated ?
                                <li>
                                    <Link
                                        to={{
                                            pathname: "/profile/me",
                                            userId: id
                                        }}
                                        title="Access your profile and manage your information">
                                        
                                        <FiUser size="14" style={{ marginRight: '7px'}} />{userNickname}
                                    </Link>
                                </li>
                                :
                                <li>
                                    <a href="#about-section" title="About us">About</a>
                                </li>
                        }

                        {
                            userIsAuthenticated ? 
                                <li>
                                    <Link to="/chat" title="Chat">Chat</Link>
                                </li>
                                :
                                ''
                        }

                        <li>
                            <Link to="/help" title="Click for help">Help</Link>
                        </li>

                        <li>
                            <Link to="/contribute" title="Click to contact us">Contribute</Link>
                        </li>

                        { !userIsAuthenticated ?
                            <li>
                                <Link to="/signin" title="Sign in to start using chat">
                                    Sign In
                                </Link>
                            </li>
                                :
                            <li>
                                <span
                                    onClick={() => logout()}
                                    title="Sign out"
                                >
                                    Sign Out
                                </span>
                            </li>
                        }
                    </ul>
                </nav>

                <div id="header-presentation-container">
                    <div id="header-title-message">
                        <h3>
                            Always be present.
                        </h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel lorem libero. Nullam ac gravida lacus,
                            ac porttitor mauris. Hasellus sed justo ac lacus hendrerit commodo a id est. Sign up to start using chat.
                        </p>

                        {
                            !userIsAuthenticated ?
                            <button
                                id="button-sign-up"
                                title="Sign up for free"
                                onClick={() => history.push('/signup') }>
                                Sign up for free
                            </button>
                            :
                            <button
                                id="get-chat-access"
                                title="Click to get chat access"
                                onClick={() => history.push('/chat')}
                                >
                                Get chat access
                            </button>
                        }
                    </div>

                    <img
                        id="header-smartphone-img"
                        src={imgSmartphone}
                        width="400"
                        height="400"
                        alt="Smartphone"
                    /> 
                </div>
            </header>

            <main>
                <section id="about-section">
                    <h2>About application</h2>
                    
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel lorem libero. Nullam ac gravida lacus,
                        ac porttitor mauris. Fusce leo metus, gravida tempor arcu eu, dapibus sollicitudin mi. Integer est leo, 
                        interdum sed efficitur vitae, tincidunt ac est. Sed faucibus ut lectus in sagittis. Cras ullamcorper, 
                        urna ac dictum sollicitudin, nulla felis bibendum risus, quis aliquet lectus lacus ac magna. 
                        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                        Aenean vitae dictum augue, nec condimentum nulla. In pulvinar consequat dui, et tristique ex maximus id. 
                        Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla facilisi. 
                        Praesent tincidunt eget ex id ornare. Nam vehicula consequat magna, quis pellentesque risus semper in.
                        Suspendisse accumsan diam vitae risus suscipit, ac suscipit enim pharetra. Mauris suscipit laoreet magna 
                        sit amet interdum. Phasellus sed justo ac lacus hendrerit commodo a id est. Maecenas a tempor enim. 
                        Nunc et pellentesque ligula, sagittis commodo leo. 
                    </p>
                    
                    <p>
                        Aliquam erat volutpat. Morbi quis tincidunt sapien. 
                        Pellentesque vitae lectus id eros interdum maximus id sed nulla. Mauris viverra ex ut neque pharetra, 
                        maximus aliquet sem pharetra. Sed suscipit mi libero, sed dignissim lacus mattis ac. 
                        Phasellus et turpis pharetra, placerat dui et, interdum ante. Sed accumsan id urna in egestas.
                        Donec vestibulum, enim a auctor lacinia, lectus justo cursus ex, vestibulum posuere neque diam mattis lorem.
                        Aenean aliquet eros ac enim feugiat, eu consequat massa commodo. Vestibulum ante ipsum primis in faucibus orci
                        luctus et ultrices posuere cubilia curae; Nunc ligula leo, tempus eget hendrerit nec, tincidunt in dui.
                        Maecenas in accumsan dui. Quisque gravida eros in rhoncus fringilla. Maecenas id mi eu metus elementum blandit.
                        Praesent suscipit lacus in vestibulum tincidunt. Fusce mattis ligula hendrerit risus aliquet, at feugiat lorem dictum.
                        Ut tempor gravida varius. Proin pellentesque vulputate quam non pellentesque.
                        Ut sed enim gravida, auctor dui non, egestas ante.  
                    </p>
                </section>

                <section id="resources-section">
                    <h2>Resources</h2>
                    
                    <div className="cards">
                        <div className="card">
                            <img
                                src={imgCardOne}
                                width="350"
                                height="250"
                                alt="card"
                                className="resource-card-image"
                            />

                            <div className="card-content">
                                <h4>Lorem Ipsum Dolor</h4>
                                <hr className="card-title-separator"></hr>

                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel lorem libero. Nullam ac gravida lacus,
                                    ac porttitor mauris. Fusce leo metus
                                </p>

                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel lorem libero. Nullam ac gravida lacus,
                                    ac porttitor mauris. Fusce leo metus
                                </p>
                            </div>
                        </div>

                        <div className="card">
                            <img
                                src={imgCardTwo}
                                width="350"
                                height="250"
                                alt="card"
                                className="resource-card-image"
                            />

                            <div className="card-content">
                                <h4>Lorem Ipsum Dolor</h4>
                                <hr className="card-title-separator"></hr>

                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel lorem libero. Nullam ac gravida lacus,
                                    ac porttitor mauris. Fusce leo metus
                                </p>

                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel lorem libero. Nullam ac gravida lacus,
                                    ac porttitor mauris. Fusce leo metus
                                </p>
                            </div>
                        </div>

                        <div className="card">
                            <img
                                src={imgCardThree}
                                width="350"
                                height="250"
                                alt="card"
                                className="resource-card-image"
                            />

                            <div className="card-content">
                                <h4>Lorem Ipsum Dolor</h4>
                                <hr className="card-title-separator"></hr>
                                
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel lorem libero. Nullam ac gravida lacus,
                                    ac porttitor mauris. Fusce leo metus
                                </p>

                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel lorem libero. Nullam ac gravida lacus,
                                    ac porttitor mauris. Fusce leo metus
                                </p>
                            </div>
                        </div>

                        <div className="card">
                            <img
                                src={imgCardFour}
                                width="350"
                                height="250"
                                alt="card"
                                className="resource-card-image"
                            />

                            <div className="card-content">
                                <h4>Lorem Ipsum Dolor</h4>
                                <hr className="card-title-separator"></hr>

                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel lorem libero. Nullam ac gravida lacus,
                                    ac porttitor mauris. Fusce leo metus
                                </p>
                            </div>
                        </div>

                        <div className="card">
                            <img
                                src={imgCardFive}
                                width="350"
                                height="250"
                                alt="card"
                                className="resource-card-image"
                            />

                            <div className="card-content">
                                <h4>Lorem Ipsum Dolor</h4>
                                <hr className="card-title-separator"></hr>

                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel lorem libero. Nullam ac gravida lacus,
                                    ac porttitor mauris. Fusce leo metus
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel lorem libero. Nullam ac gravida lacus,
                                    ac porttitor mauris. Fusce leo metus
                                </p>
                            </div>
                        </div>

                        <div className="card">
                            <img
                                src={imgCardSix}
                                width="350"
                                height="250"
                                alt="card"
                                className="resource-card-image"
                            />

                            <div className="card-content">
                                <h4>Lorem Ipsum Dolor</h4>
                                <hr className="card-title-separator"></hr>

                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel lorem libero. Nullam ac gravida lacus,
                                    ac porttitor mauris. Fusce leo metus
                                </p>

                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel lorem libero. Nullam ac gravida lacus,
                                    ac porttitor mauris.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="contact-section">
                    <h2>Contact us</h2>
                    
                    <p>
                        Leave us a message and we will get back to you as soon as possible. <br></br>If you prefer, you can
                        send us an email directly to <b>pedro.rubinger@gmail.com</b>
                    </p>

                    <ContactForm />
                </section>
            </main>

            <Footer />
        </div>
    );
}