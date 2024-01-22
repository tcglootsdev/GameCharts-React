// Modules
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Helpers
import { ucfirst } from "../helpers/utils";

const Footer = (props) => {
    const [sFooterData, setFooterData] = React.useState({
        stores: {},
    });

    // React.useEffect(() => {
    //     try {
    //         axios.get("https://gamecharts.org/api/dashboard.php").then((response) => {
    //             setFooterData(response.data);
    //         });
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // }, []);

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
                                    {/* {Object.keys(sFooterData.stores).map((key) => (
                                        <li key={key} style={{ listStyleType: "none", paddingTop: 5 }}>
                                            <Link className="footer-items" to={"/" + sFooterData.stores[key].Store}>
                                                {ucfirst(sFooterData.stores[key].Store)}
                                            </Link>
                                        </li>
                                    ))} */}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 ">
                        <div className="row">
                            {/* {Object.keys(sFooterData.stores).map((key) => (
                                <div key={key} className="footer-item col-md-6 col-6">
                                    <Link to={"/" + sFooterData.stores[key].Store + "/player_count"}>
                                        Top {ucfirst(sFooterData.stores[key].Store)} Games
                                    </Link>

                                    <ul style={{ paddingTop: 10 }}>
                                        {sFooterData.stores[key].platform_top_games.map((data) => (
                                            <li key={data.Name} style={{ listStyleType: "none", paddingTop: 5 }}>
                                                <Link className="footer-items" to={"/" + sFooterData.stores[key].Store + "/" + data.NameSEO}>
                                                    {data.Name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))} */}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
