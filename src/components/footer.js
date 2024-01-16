import React from "react";

const Footer = () => {
    return (
        <footer className="section footer-classic context-dark bg-image" style={{ background: "#2d3246" }}>
            <div className="social-footer" style={{ padding: "1em" }}>
                <div className="row">
                    <div className="col-3">
                        <a href="https://www.facebook.com/Gamecharts-111747700514669/">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                    </div>
                    <div className="col-3">
                        <a href="https://www.instagram.com/gamechartsorg/">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                    <div className="col-3">
                        <a href="https://www.youtube.com/channel/UCBXUnqxAMX8NUZvmN6VlROA/">
                            <i className="fab fa-youtube"></i>
                        </a>
                    </div>
                    <div className="col-3">
                        <a href="https://twitter.com/Gamecharts1">
                            <i className="fab fa-twitter"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div className="container" style={{ padding: "1em" }}>
                <div className="row row-30">
                    <div className="col-12 col-md-6">
                        <div className="row">
                            <div className="col-6 text-white footer-text">
                                &copy; 2019-{new Date().getFullYear()} Game Charts
                                <ul>
                                    <li style={{ listStyleType: "none", paddingTop: "5px" }}>
                                        <a href="http://gamecharts.local/about">About</a>
                                    </li>
                                    <li style={{ listStyleType: "none", paddingTop: "5px" }}>
                                        <a href="http://gamecharts.local/privacy">Privacy</a>
                                    </li>
                                    <li style={{ listStyleType: "none", paddingTop: "5px" }}>
                                        <a href="http://gamecharts.local/cookies">Cookies Policy</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-6 text-white footer-text">
                                Supported Platforms
                                <ul style={{ paddingTop: "10px" }}></ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 ">
                        <div className="row"></div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
