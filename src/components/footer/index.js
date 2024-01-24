// Modules
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Icons
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faYoutube, faTwitter } from "@fortawesome/free-brands-svg-icons";

// Actions
import { getDashboardData } from "@/redux/dashboard/actions";

// Helpers
import { ucfirst } from "@/helpers/utils";

const Footer = (props) => {
    const dispatch = useDispatch();
    const footerData = useSelector((state) => state.dashboard);

    React.useEffect(() => {
        dispatch(getDashboardData());
    }, [dispatch]);

    return (
        <footer className="section footer-classic context-dark bg-image" style={{ background: "#2d3246" }}>
            <div className="social-footer" style={{ padding: "1em" }}>
                <div className="row">
                    <div className="col-3">
                        <a href="https://www.facebook.com/Gamecharts-111747700514669/" aria-label="Facebook">
                            <Icon icon={faFacebook} />
                        </a>
                    </div>
                    <div className="col-3">
                        <a href="https://www.instagram.com/gamechartsorg/" aria-label="Instagram">
                            <Icon icon={faInstagram} />
                        </a>
                    </div>
                    <div className="col-3">
                        <a href="https://www.youtube.com/channel/UCBXUnqxAMX8NUZvmN6VlROA/" aria-label="Youtube">
                            <Icon icon={faYoutube} />
                        </a>
                    </div>
                    <div className="col-3">
                        <a href="https://twitter.com/Gamecharts1" aria-label="Twitter">
                            <Icon icon={faTwitter} />
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
                                        <Link to="/about">About</Link>
                                    </li>
                                    <li style={{ listStyleType: "none", paddingTop: "5px" }}>
                                        <Link to="/privacy">Privacy</Link>
                                    </li>
                                    <li style={{ listStyleType: "none", paddingTop: "5px" }}>
                                        <Link to="/cookies">Cookies Policy</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-6 text-white footer-text">
                                Supported Platforms
                                <ul style={{ paddingTop: "10px" }}>
                                    {Object.keys(footerData.stores).map((key) => (
                                        <li key={key} style={{ listStyleType: "none", paddingTop: 5 }}>
                                            <Link className="footer-items" to={"/" + footerData.stores[key].Store}>
                                                {ucfirst(footerData.stores[key].Store)}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 ">
                        <div className="row">
                            {Object.keys(footerData.stores).map((key) => (
                                <div key={key} className="footer-item col-md-6 col-6">
                                    <Link to={"/" + footerData.stores[key].Store + "/player_count"}>
                                        Top {ucfirst(footerData.stores[key].Store)} Games
                                    </Link>

                                    <ul style={{ paddingTop: 10 }}>
                                        {footerData.stores[key].platform_top_games.map((data) => (
                                            <li key={data.Name} style={{ listStyleType: "none", paddingTop: 5 }}>
                                                <Link className="footer-items" to={"/" + footerData.stores[key].Store + "/" + data.NameSEO}>
                                                    {data.Name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
