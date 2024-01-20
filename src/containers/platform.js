// Modules
import React from "react";
import Helmet from "react-helmet";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

// Helpers
import { ucfirst, stripTags } from "../helpers/utils";

// Styles
import "./platform.css";

const Platform = () => {
    const { source } = useParams();

    const title = React.useMemo(() => "Game Charts - " + ucfirst(source) + ": Top and Trending Games Statistics", [source]);
    const description = React.useMemo(
        () => "GameCharts. This page shows " + ucfirst(source) + " Top Games and Trending of Games by current players or average players.",
        [source]
    );
    const rBxSlideStatus = React.useRef({
        trending: null,
        trending_average: null,
        topdata: null,
        topdata_average: null,
    });

    React.useEffect(() => {
        // $(".desktop-screen").show();
    }, []);

    const [sPlatformData, setPlatformData] = React.useState({
        trending: [],
        trending_average: [],
        stores: {},
        topdata: [],
        topdata_average: [],
    });

    React.useEffect(() => {
        try {
            axios
                .get("https://gamecharts.org/api/platform.php", {
                    params: { source: source },
                })
                .then((response) => {
                    setPlatformData(response.data);
                });
        } catch (error) {
            console.log(error.message);
        }
    }, [source]);

    // React.useEffect(() => {
    //     $(".chart-today").each(function (i, e) {
    //         e.innerHTML = "";
    //         var options1 = {
    //             chart: {
    //                 type: "line",
    //                 width: 140,
    //                 height: 30,
    //                 sparkline: {
    //                     enabled: true,
    //                 },
    //             },
    //             series: [
    //                 {
    //                     data: JSON.parse($(this).attr("data-series")),
    //                 },
    //             ],
    //             stroke: {
    //                 width: 2,
    //                 curve: "smooth",
    //             },
    //             markers: {
    //                 size: 0,
    //             },
    //             colors: ["#028602"],
    //             tooltip: {
    //                 fixed: {
    //                     enabled: false,
    //                 },
    //                 x: {
    //                     show: false,
    //                 },
    //                 y: {
    //                     title: {
    //                         formatter: function (seriesName) {
    //                             return "";
    //                         },
    //                     },
    //                 },
    //                 marker: {
    //                     show: false,
    //                 },
    //             },
    //         };
    //         new ApexCharts(e, options1).render();
    //     });
    //     // if (sPlatformData.trending.length > 0) {
    //     if (rBxSlideStatus.current.trending) {
    //         rBxSlideStatus.current.trending.destroySlider();
    //     }
    //     rBxSlideStatus.current.trending = $("#trending_game_slider").bxSlider({
    //         touchEnabled: false,
    //     });
    //     // }
    //     // if (sPlatformData.topdata.length > 0) {
    //     if (rBxSlideStatus.current.topdata) {
    //         rBxSlideStatus.current.topdata.destroySlider();
    //     }
    //     rBxSlideStatus.current.topdata = $("#top_game_slider").bxSlider({
    //         touchEnabled: false,
    //     });
    //     // }
    //     // if (sPlatformData.trending_average.length > 0) {
    //     if (rBxSlideStatus.current.trending_average) {
    //         rBxSlideStatus.current.trending_average.destroySlider();
    //     }
    //     rBxSlideStatus.current.trending_average = $("#trending_game_average_slider").bxSlider({
    //         touchEnabled: false,
    //     });
    //     // }
    //     // if (sPlatformData.topdata_average.length > 0) {
    //     if (rBxSlideStatus.current.topdata_average) {
    //         rBxSlideStatus.current.topdata_average.destroySlider();
    //     }
    //     rBxSlideStatus.current.topdata_average = $("#top_game_average_slider").bxSlider({
    //         touchEnabled: false,
    //     });
    //     // }
    // }, [sPlatformData]);

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={"https://gamecharts.org/" + source} />
                <meta name="twitter:title" content={title}></meta>
                <meta name="twitter:description" content={description} />
                <meta property="og:title" content={"Game Charts - " + title} />
                <meta property="og:description" content={description} />
            </Helmet>
            <div className="row game-platforms">
                <span className="game-platforms-menu" style={{ marginLeft: 0 }}>
                    {Object.keys(sPlatformData.stores).map((key) => {
                        const store = sPlatformData.stores[key];
                        if (store.Store === source) {
                            return (
                                <li key={key}>
                                    <a href="#">
                                        <img src={store.Splash} alt={store.Store} height="45px" />
                                    </a>
                                </li>
                            );
                        }
                    })}
                </span>
                <div className="route">
                    <Link to="/">Home</Link>&nbsp;&nbsp;<i className="fas fa-angle-double-right"></i>&nbsp;&nbsp;
                    <a href="#">{ucfirst(source)}</a>
                </div>
            </div>
            <div className="page-wrapper page-wrapper-img">
                <div className="page-wrapper-inner-add align-items-center">
                    <div className="container-fluid pb-0">
                        <div className="row-add desktop-screen justify-content-center mb-5 pb-3" style={{ display: "none" }}>
                            <div className="col-lg-8-add col-xs-12 game-list">
                                <div className="content-column">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="card">
                                                <div className="card-header bg-gradient-grey">
                                                    <div className="d-flex flex-row justify-content-between">
                                                        <h3 className="h5 font-secondary text-uppercase m-0">Trending Games</h3>
                                                        <h4 className="h5 font-secondary text-uppercase text-white m-0">By Current Players</h4>
                                                    </div>
                                                </div>
                                                <div className="card-body p-0">
                                                    <div className="table-responsive">
                                                        <table className="table table-centered mb-0">
                                                            <thead className="thead-light">
                                                                <tr>
                                                                    <th>Name</th>
                                                                    <th className="center">24-hour Change</th>
                                                                    <th className="center">Today</th>
                                                                    <th className="center">Current Players</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {sPlatformData.trending.length > 0 &&
                                                                    sPlatformData.trending.map((data) => (
                                                                        <tr key={data.name}>
                                                                            <td>
                                                                                <Link
                                                                                    className="text-dark"
                                                                                    style={{ fontWeight: 500 }}
                                                                                    to={"/" + source + "/" + data.app_id}
                                                                                >
                                                                                    {data.name}
                                                                                </Link>
                                                                            </td>
                                                                            <td className="text-success text-center font-weight-900">
                                                                                {data.change}
                                                                            </td>
                                                                            <td>
                                                                                <div
                                                                                    className="chart-today"
                                                                                    data-series={JSON.stringify(data.hist)}
                                                                                ></div>
                                                                            </td>
                                                                            <td className="text-gray center">{data.ccu}</td>
                                                                        </tr>
                                                                    ))}
                                                                {sPlatformData.trending.length === 0 && (
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
                                        <div className="col-12">
                                            <div id="trending_game_slider" className="trending_game_slider">
                                                {sPlatformData.trending.map((data) => (
                                                    <div key={data.name} className="row ml-0 mr-1">
                                                        <div style={{ display: "inline-block", padding: 0 }} className="col-12 col-md-5">
                                                            <Link to={"/" + data.store + "/" + data.app_id}>
                                                                <img
                                                                    className="lazyload blur-up"
                                                                    width="100%"
                                                                    height="100%"
                                                                    data-src={Array.isArray(data.i_game) && data.i_game[0].Splash}
                                                                    alt={data.name}
                                                                />
                                                            </Link>
                                                        </div>
                                                        <div
                                                            style={{ display: "inline-block", padding: 0, height: 215, overflowY: "scroll" }}
                                                            className="col-sm-12 col-md-7"
                                                        >
                                                            <div style={{ marginLeft: 3, marginRight: 3 }}>
                                                                {stripTags(Array.isArray(data.i_game) ? data.i_game[0].AboutGame : "")}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="card">
                                                <div className="card-header bg-gradient-grey">
                                                    <div className="d-flex flex-row justify-content-between">
                                                        <h3 className="h5 font-secondary text-uppercase m-0">Top Games</h3>
                                                        <h4 className="h5 font-secondary text-uppercase text-white m-0">By Current Players</h4>
                                                    </div>
                                                </div>
                                                <div className="card-body p-0">
                                                    <div className="table-responsive">
                                                        <table className="table table-centered mb-0">
                                                            <thead className="thead-light">
                                                                <tr>
                                                                    <th></th>
                                                                    <th>Name</th>
                                                                    <th className="center">Current Players</th>
                                                                    <th className="center">24-hour peak</th>
                                                                    <th className="center">30-days peak</th>
                                                                    <th className="center">Peak Players</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {sPlatformData.topdata.length > 0 &&
                                                                    sPlatformData.topdata.map((data, index) => (
                                                                        <tr key={data.Name}>
                                                                            <td>{index + 1}.</td>
                                                                            <td>
                                                                                <Link
                                                                                    className="text-dark"
                                                                                    style={{ fontWeight: 500 }}
                                                                                    to={"/" + source + "/" + data.NameSEO}
                                                                                >
                                                                                    {data.Name}
                                                                                </Link>
                                                                            </td>
                                                                            <td className="center">{Number(data.LastCcu).toLocaleString()}</td>
                                                                            <td className="center text-gray">
                                                                                {Number(data.TopCcu24h).toLocaleString()}
                                                                            </td>
                                                                            <td className="center text-gray">
                                                                                {Number(data.TopCcu30d).toLocaleString()}
                                                                            </td>
                                                                            <td className="center text-gray">
                                                                                {Number(data.TopCcu).toLocaleString()}
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                {sPlatformData.topdata.length === 0 && (
                                                                    <tr>
                                                                        <td colSpan="5"> Not Games Found </td>
                                                                    </tr>
                                                                )}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div className="d-flex justify-content-end border-top py-1 px-3">
                                                        <Link
                                                            className="btn btn-primary btn-round waves-effect waves-light"
                                                            to={"/" + source + "/player_count"}
                                                        >
                                                            More
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12">
                                            <div id="top_game_slider" className="top_game_slider">
                                                {sPlatformData.topdata.map((data) => (
                                                    <div key={data.Name} className="row ml-0 mr-1">
                                                        <div style={{ display: "inline-block", padding: 0 }} className="col-12 col-md-5">
                                                            <Link to={"/" + source + "/" + data.NameSEO}>
                                                                <img
                                                                    className="lazyload blur-up"
                                                                    width="100%"
                                                                    height="100%"
                                                                    data-src={Array.isArray(data.i_game) && data.i_game[0].Splash}
                                                                    alt={data.i_game[0].Name}
                                                                />
                                                            </Link>
                                                        </div>

                                                        <div
                                                            style={{ display: "inline-block", padding: 0, height: 215, overflowY: "scroll" }}
                                                            className="col-sm-12 col-md-7"
                                                        >
                                                            <div style={{ marginLeft: 3, marginRight: 3 }}>
                                                                {stripTags(Array.isArray(data.i_game) ? data.i_game[0].AboutGame : "")}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12">
                                            <div className="card">
                                                <div className="card-header bg-gradient-grey">
                                                    <div className="d-flex flex-row justify-content-between">
                                                        <h3 className="h5 font-secondary text-uppercase m-0">Trending Games</h3>
                                                        <h4 className="h5 font-secondary text-uppercase text-white m-0">By Average Players</h4>
                                                    </div>
                                                </div>
                                                <div className="card-body p-0">
                                                    <div className="table-responsive">
                                                        <table className="table table-centered mb-0" style={{ overflow: "hidden" }}>
                                                            <thead className="thead-light">
                                                                <tr>
                                                                    <th>Name</th>
                                                                    <th className="center">24-hour Change</th>
                                                                    <th className="center">Today</th>
                                                                    <th className="center">Current Players</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {sPlatformData.trending_average.length > 0 &&
                                                                    sPlatformData.trending_average.map((data) => (
                                                                        <tr key={data.name}>
                                                                            <td>
                                                                                <Link
                                                                                    className="text-dark"
                                                                                    style={{ fontWeight: 500 }}
                                                                                    to={"/" + source + "/" + data.app_id}
                                                                                >
                                                                                    {data.name}
                                                                                </Link>
                                                                            </td>
                                                                            <td className="text-success text-center" style={{ fontWeight: 800 }}>
                                                                                {data.change}
                                                                            </td>
                                                                            <td>
                                                                                <div
                                                                                    className="chart-today"
                                                                                    data-series={JSON.stringify(data.hist)}
                                                                                ></div>
                                                                            </td>
                                                                            <td className="center text-gray">{data.ccu}</td>
                                                                        </tr>
                                                                    ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12">
                                            <div id="trending_game_average_slider" className="trending_game_slider">
                                                {sPlatformData.trending_average.map((data) => (
                                                    <div key={data.name} className="row ml-0 mr-1">
                                                        <div style={{ display: "inline-block", padding: 0 }} className="col-12 col-md-5">
                                                            <Link to={"/" + data.store + "/" + data.app_id}>
                                                                <img
                                                                    className="lazyload blur-up"
                                                                    width="100%"
                                                                    height="100%"
                                                                    data-src={Array.isArray(data.i_game) && data.i_game[0].Splash}
                                                                    alt={data.name}
                                                                />
                                                            </Link>
                                                        </div>

                                                        <div
                                                            style={{ display: "inline-block", padding: 0, height: 215, overflowY: "scroll" }}
                                                            className="col-sm-12 col-md-7"
                                                        >
                                                            <div style={{ marginLeft: 3, marginRight: 3 }}>
                                                                {stripTags(Array.isArray(data.i_game) ? data.i_game[0].AboutGame : "")}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12">
                                            <div className="card">
                                                <div className="card-header bg-gradient-grey">
                                                    <div className="d-flex flex-row justify-content-between">
                                                        <h3 className="h5 font-secondary text-uppercase m-0">Top Games</h3>
                                                        <h4 className="h5 font-secondary text-uppercase text-white m-0">By Average Players</h4>
                                                    </div>
                                                </div>
                                                <div className="card-body p-0">
                                                    <div className="table-responsive">
                                                        <table className="table table-centered mb-0">
                                                            <thead className="thead-light">
                                                                <tr>
                                                                    <th></th>
                                                                    <th>Name</th>
                                                                    <th className="center">Average Players</th>
                                                                    <th className="center">24-hour Average</th>
                                                                    <th className="center">30-days Average</th>
                                                                    <th className="center">Max Average Players</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {sPlatformData.topdata_average.length > 0 &&
                                                                    sPlatformData.topdata_average.map((data, index) => (
                                                                        <tr key={data.Name}>
                                                                            <td>{index + 1}.</td>
                                                                            <td>
                                                                                <Link
                                                                                    className="text-dark"
                                                                                    style={{ fontWeight: 500 }}
                                                                                    to={"/" + source + "/" + data.NameSEO}
                                                                                >
                                                                                    {data.Name}
                                                                                </Link>
                                                                            </td>
                                                                            <td className="center">{Number(data.LastCcu).toLocaleString()}</td>
                                                                            <td className="center text-gray">
                                                                                {Number(data.MaxAvg24h).toLocaleString()}
                                                                            </td>
                                                                            <td className="center text-gray">
                                                                                {Number(data.MaxAvg30d).toLocaleString()}
                                                                            </td>
                                                                            <td className="center text-gray">
                                                                                {Number(data.MaxAvg).toLocaleString()}
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                {sPlatformData.topdata_average.length === 0 && (
                                                                    <tr>
                                                                        <td colSpan="5"> Not Games Found </td>
                                                                    </tr>
                                                                )}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div className="d-flex justify-content-end border-top py-1 px-3">
                                                        <Link
                                                            className="btn btn-primary btn-round waves-effect waves-light"
                                                            to={"/" + source + "/player_average"}
                                                        >
                                                            More
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12">
                                            <div id="top_game_average_slider" className="top_game_slider">
                                                {sPlatformData.topdata_average.map((data) => (
                                                    <div key={data.Name} className="row ml-0 mr-1">
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
                                                            <div style={{ marginLeft: 3, marginRight: 3 }}>
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

export default Platform;
