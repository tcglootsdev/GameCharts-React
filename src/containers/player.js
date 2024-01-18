// Modules
import React from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Helmet from "react-helmet";

// Styles
import "./player.css";
import { stripTags, ucfirst } from "../helpers/utils";

const Player = (props) => {
    const { source } = useParams();
    const [sPage, setPage] = React.useState(1);
    const [sPlayerData, setPlayerData] = React.useState({
        title: "",
        description: "",
        canonical: "",
        stores: {},
        top_data: [],
        navigationTag: "",
        bytop: "",
        nextPageRel: "",
    });

    const rBxSlideStatus = React.useRef({
        top_game_slider: null,
    });

    React.useEffect(() => {
        try {
            axios
                .get("https://gamecharts.org/api/player.php", {
                    params: { source: source, type: props.type, page: sPage },
                })
                .then((response) => {
                    setPlayerData(response.data);
                });
        } catch (error) {
            console.log(error.message);
        }
    }, [sPage]);

    React.useEffect(() => {
        if (rBxSlideStatus.current.top_game_slider) {
            rBxSlideStatus.current.top_game_slider.destroySlider();
        }
        rBxSlideStatus.current.top_game_slider = $("#top_game_slider").bxSlider({
            touchEnabled: false,
        });
    }, [sPlayerData]);

    return (
        <>
            <Helmet>
                <title>{sPlayerData.title}</title>
                <meta name="description" content={sPlayerData.description} />
                <link rel="canonical" href={sPlayerData.canonical} />
                <meta name="twitter:title" content={sPlayerData.title}></meta>
                <meta name="twitter:description" content={sPlayerData.description} />
                <meta property="og:title" content={"Game Charts - " + sPlayerData.title} />
                <meta property="og:description" content={sPlayerData.description} />
            </Helmet>
            <div className="row game-platforms">
                <span className="game-platforms-menu" style={{ marginLeft: 0 }}>
                    {Object.keys(sPlayerData.stores).map((key) => {
                        const store = sPlayerData.stores[key];
                        if (store.Store == source) {
                            return (
                                <li key={store.Store}>
                                    <Link to={"/" + store.Store}>
                                        <img alt={store.Store} src={store.Splash} />
                                    </Link>
                                </li>
                            );
                        }
                    })}
                </span>
                <span className="top-games">
                    <a style={{ color: "white" }} href="http://gamecharts.local/<?php echo $source; ?>/<?php echo $subFolder; ?>">
                        TOP GAMES
                    </a>
                </span>
                <div className="route-top">
                    <Link to="/">Home</Link>&nbsp;&nbsp;<i className="fas fa-angle-double-right"></i>&nbsp;&nbsp;
                    <Link to={"/" + source}>{ucfirst(source)}</Link>&nbsp;&nbsp;<i className="fas fa-angle-double-right"></i>&nbsp;&nbsp;
                    <a href="#">{sPlayerData.navigationTag}</a>
                </div>
            </div>
            <div className="page-wrapper page-wrapper-img">
                <div className="page-wrapper-inner-add align-items-center position-relative">
                    <div className="container-fluid-add pb-0">
                        <div className="row-add desktop-screen justify-content-center mb-5 pb-3">
                            <div className="col-lg-8-add col-xs-12 game-list">
                                <div className="content-column">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="card">
                                                <div className="card-body">
                                                    <span style={{ color: "#aca5ad", fontSize: 24 }}>{sPlayerData.bytop}</span>
                                                    <div className="table-responsive">
                                                        <table className="table table-centered table-striped mb-0">
                                                            <thead className="thead-light">
                                                                <tr>
                                                                    <th></th>
                                                                    <th>Name</th>
                                                                    <th className="center">Current Players</th>
                                                                    <th className="center">24-hour peak</th>
                                                                    <th className="center">30-days peak</th>
                                                                    <th className="center">Peak players</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {sPlayerData.top_data.length > 0 &&
                                                                    sPlayerData.top_data.map((data, index) => (
                                                                        <tr key={data.Name}>
                                                                            <td>{1 + 25 * (sPage - 1) + index}.</td>
                                                                            <td>
                                                                                <Link
                                                                                    style={{ color: "#303030", fontWeight: 500 }}
                                                                                    to={"/" + source + "/" + data.NameSEO}
                                                                                >
                                                                                    <img
                                                                                        className="img-thumnail lazyload blur-up"
                                                                                        width="100%"
                                                                                        height="100%"
                                                                                        src={data.Splash}
                                                                                        alt={data.Store}
                                                                                    />
                                                                                    {data.Name}
                                                                                </Link>
                                                                            </td>
                                                                            <td className="center">{Number(data.LastCcu).toLocaleString()}</td>
                                                                            <td className="center" style={{ color: "grey" }}>
                                                                                {props.type === "avg" && Number(data.MaxAvg24h).toLocaleString()}
                                                                                {props.type !== "avg" && Number(data.TopCcu24h).toLocaleString()}
                                                                            </td>
                                                                            <td className="center" style={{ color: "grey" }}>
                                                                                {props.type === "avg" && Number(data.MaxAvg30d).toLocaleString()}
                                                                                {props.type !== "avg" && Number(data.TopCcu30d).toLocaleString()}
                                                                            </td>
                                                                            <td className="center" style={{ color: "grey" }}>
                                                                                {props.type === "avg" && Number(data.MaxAvg).toLocaleString()}
                                                                                {props.type !== "avg" && Number(data.TopCcu).toLocaleString()}
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                {sPlayerData.top_data.length === 0 && (
                                                                    <tr>
                                                                        <td colSpan="5"> Not Games Found </td>
                                                                    </tr>
                                                                )}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12" style={{ textAlign: "right" }}>
                                            {sPage >= 2 && (
                                                <a href="#" onClick={() => setPage((state) => state - 1)}>
                                                    Previous
                                                </a>
                                            )}
                                            {sPage >= 2 && sPlayerData.nextPageRel !== "" && " or "}
                                            {sPage >= 2 && sPlayerData.nextPageRel === "" && " page "}
                                            {sPlayerData.nextPageRel !== "" && (
                                                <>
                                                    <a href="#" onClick={() => setPage((state) => state + 1)}>
                                                        Next
                                                    </a>{" "}
                                                    page
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12">
                                            <div id="top_game_slider" className="top_game_slider">
                                                {sPlayerData.top_data.map((data) => (
                                                    <div className="row ml-1 mr-1">
                                                        <div style={{ display: "inline-block", padding: 0 }} className="col-12 col-md-5">
                                                            <Link to={"/" + source + "/" + data.NameSEO}>
                                                                <img
                                                                    className="lazyload blur-up"
                                                                    width="100%"
                                                                    height="100%"
                                                                    data-src={Array.isArray(data.i_game) && data.i_game[0].Splash}
                                                                    alt={data.Name}
                                                                />
                                                            </Link>
                                                        </div>

                                                        <div
                                                            style={{ display: "inline-block", padding: 0, height: 215, overflowY: "scroll" }}
                                                            className="col-sm-12 col-md-7"
                                                        >
                                                            <div className="" style={{ marginLeft: 3, marginRight: 3 }}>
                                                                {stripTags(Array.isArray(data.i_game) ? data.i_game[0].AboutGame : "")}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Player;
