// Modules
import React from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import axios from "axios";

// Helpers
import { stripTags } from "../helpers/utils";

const Dashboard = () => {
    const title = React.useMemo(() => "Game Charts - Top and Trending Games Statistics", []);
    const description = React.useMemo(
        () =>
            "GameCharts. This page shows Top Games and Trending of Games by current players or average players. You can see the summary of individual game of each platfrom.",
        []
    );

    const [sDashboardData, setDashboardData] = React.useState({
        trending: [],
        trending_average: [],
        stores: {},
        topdata: [],
        topdata_average: [],
    });

    React.useEffect(() => {
        $(".desktop-screen").show();
        try {
            axios.get("https://gamecharts.org/api/dashboard.php").then((response) => {
                setDashboardData(response.data);
            });
        } catch (error) {
            console.log(error.message);
        }
    }, []);

    React.useEffect(() => {
        $(".chart-today").each(function (i, e) {
            e.innerHTML = "";
            var options1 = {
                chart: {
                    type: "line",
                    width: 140,
                    height: 30,
                    sparkline: {
                        enabled: true,
                    },
                },
                series: [
                    {
                        data: JSON.parse($(this).attr("data-series")),
                    },
                ],
                stroke: {
                    width: 2,
                    curve: "smooth",
                },
                markers: {
                    size: 0,
                },
                colors: ["#028602"],
                tooltip: {
                    fixed: {
                        enabled: false,
                    },
                    x: {
                        show: false,
                    },
                    y: {
                        title: {
                            formatter: function (seriesName) {
                                return "";
                            },
                        },
                    },
                    marker: {
                        show: false,
                    },
                },
            };
            new ApexCharts(e, options1).render();
        });
        if (sDashboardData.trending.length > 0) {
            $("#trending_game_slider").bxSlider({
                touchEnabled: false,
            });
        }
        if (sDashboardData.topdata.length > 0) {
            $("#top_game_slider").bxSlider({
                touchEnabled: false,
            });
        }
        if (sDashboardData.trending_average.length > 0) {
            $("#trending_game_average_slider").bxSlider({
                touchEnabled: false,
            });
        }
        if (sDashboardData.topdata_average.length > 0) {
            $("#top_game_average_slider").bxSlider({
                touchEnabled: false,
            });
        }
    }, [sDashboardData]);

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href="/" />
                <meta name="twitter:title" content={title}></meta>
                <meta name="twitter:description" content={description} />
                <meta property="og:title" content={"Game Charts - " + title} />
                <meta property="og:description" content={description} />
            </Helmet>

            <div className="row game-platforms">
                <span className="supported-platforms col-12 col-md-3 text-center">Supported Platforms</span>
                {Object.keys(sDashboardData.stores).map((key) => (
                    <div key={key} className="col-6 col-md-2 text-center">
                        <Link to={sDashboardData.stores[key]["Store"]}>
                            <img
                                height="45px"
                                src={sDashboardData.stores[key]["Splash"]}
                                alt={sDashboardData.stores[key]["Store"]}
                                style={{ maxWidth: "100%", maxHeight: "45px" }}
                            />
                        </Link>
                    </div>
                ))}
            </div>

            <div className="page-wrapper page-wrapper-img">
                <div className="page-wrapper-inner-add align-items-center position-relative">
                    <div className="container-fluid-add px-0">
                        <div className="row-add desktop-screen justify-content-center mb-5 pb-3" style={{ display: "none" }}>
                            <div className="col-lg-8-add colxs-12 game-list ">
                                <div className="desktop-ads-column-left"></div>
                                <div className="desktop-ads-column-right"></div>
                                <div className="content-column">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="card">
                                                <div className="card-header bg-gradient-grey">
                                                    <div className="row justify-content-between">
                                                        <h3 className="h5 font-secondary text-uppercase m-0">Trending Games</h3>
                                                        <h4 className="h5 font-secondary text-uppercase text-white m-0">By CurrentPlayers</h4>
                                                    </div>
                                                </div>
                                                <div className="card-body p-0">
                                                    <div className="table-responsive">
                                                        <table className="table table-centered mb-0">
                                                            <thead className="thead-light">
                                                                <tr>
                                                                    <th>Name</th>
                                                                    <th>Platform</th>
                                                                    <th className="text-center">24-hour Change</th>
                                                                    <th className="text-center">Today</th>
                                                                    <th className="text-center">Current Players</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {sDashboardData.trending.length > 0 &&
                                                                    sDashboardData.trending.map((data) => (
                                                                        <tr key={data.name}>
                                                                            <td>
                                                                                <Link className="text-dark" to={"/" + data.store + "/" + data.app_id}>
                                                                                    {data["name"]}
                                                                                </Link>
                                                                            </td>
                                                                            <td>
                                                                                <Link to={"/" + data.store}>
                                                                                    <img
                                                                                        className="lazyload blur-up"
                                                                                        width="100%"
                                                                                        height="100%"
                                                                                        src={sDashboardData.stores[data.store].Splash}
                                                                                        alt={sDashboardData.stores[data.store].store}
                                                                                        style={{ maxWidth: "75px", maxHeight: "30px" }}
                                                                                    />
                                                                                </Link>
                                                                            </td>
                                                                            <td className="text-success text-center font-weight-900">
                                                                                {data.change}
                                                                            </td>
                                                                            <td>
                                                                                <div
                                                                                    className="chart-today text-center"
                                                                                    data-series={JSON.stringify(data.hist)}
                                                                                ></div>
                                                                            </td>
                                                                            <td className="text-center text-gray">{data.ccu}</td>
                                                                        </tr>
                                                                    ))}
                                                                {sDashboardData.trending.length === 0 && (
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
                                                {sDashboardData.trending.map((data) => (
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
                                                            style={{ display: "inline-block", padding: 0, height: "215px", overflowY: "scroll" }}
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
                                                    <div className="row justify-content-between">
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
                                                                    <th>Platform</th>
                                                                    <th className="text-center">Current Players</th>
                                                                    <th className="text-center">24-hour peak</th>
                                                                    <th className="text-center">30-days peak</th>
                                                                    <th className="text-center">Peak Players</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {sDashboardData.topdata.length > 0 &&
                                                                    sDashboardData.topdata.map((data, index) => (
                                                                        <tr key={data.Name}>
                                                                            <td>{index + 1}.</td>
                                                                            <td>
                                                                                <Link
                                                                                    className="text-dark"
                                                                                    to={"/" + data.Store + "/" + data.NameSEO}
                                                                                >
                                                                                    {data.Name}
                                                                                </Link>
                                                                            </td>
                                                                            <td>
                                                                                <Link to={"/" + data.Store}>
                                                                                    <img
                                                                                        className="lazyload blur-up"
                                                                                        width="100%"
                                                                                        height="100%"
                                                                                        src={sDashboardData.stores[data.Store].Splash}
                                                                                        alt={sDashboardData.stores[data.Store].Store}
                                                                                        style={{ maxWidth: 75, maxHeight: 30 }}
                                                                                    />
                                                                                </Link>
                                                                            </td>
                                                                            <td className="text-center">{Number(data.LastCcu).toLocaleString()}</td>
                                                                            <td className="text-center text-gray">
                                                                                {Number(data.TopCcu24h).toLocaleString()}
                                                                            </td>
                                                                            <td className="text-center text-gray">
                                                                                {Number(data.TopCcu30d).toLocaleString()}
                                                                            </td>
                                                                            <td className="text-center text-gray">
                                                                                {Number(data.TopCcu).toLocaleString()}
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                {sDashboardData.topdata.length === 0 && (
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
                                            <div id="top_game_slider" className="top_game_slider">
                                                {sDashboardData.topdata.map((data) => (
                                                    <div key={data.Name} className="row ml-0 mr-1">
                                                        <div style={{ display: "inline-block", padding: 0 }} className="col-12 col-md-5">
                                                            <Link to={"/" + data.Store + "/" + data.NameSEO}>
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
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="card">
                                                <div className="card-header bg-gradient-grey">
                                                    <div className="row justify-content-between">
                                                        <h3 className="h5 font-secondary text-uppercase m-0">Trending Games</h3>
                                                        <h4 className="h5 font-secondary text-uppercase text-white m-0">By Average Players</h4>
                                                    </div>
                                                </div>
                                                <div className="card-body p-0">
                                                    <div className="table-responsive">
                                                        <table className="table table-centered mb-0">
                                                            <thead className="thead-light">
                                                                <tr>
                                                                    <th>Name</th>
                                                                    <th>Platform</th>
                                                                    <th className="text-center">24-hour Change</th>
                                                                    <th className="text-center">Today</th>
                                                                    <th className="text-center">Current Players</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {sDashboardData.trending_average.length > 0 &&
                                                                    sDashboardData.trending_average.map((data) => (
                                                                        <tr key={data.name}>
                                                                            <td>
                                                                                <Link className="text-dark" to={"/" + data.store + "/" + data.app_id}>
                                                                                    {data.name}
                                                                                </Link>
                                                                            </td>
                                                                            <td>
                                                                                <Link to={"/" + data.store}>
                                                                                    <img
                                                                                        className="lazyload blur-up"
                                                                                        width="100%"
                                                                                        height="100%"
                                                                                        src={sDashboardData.stores[data.store].Splash}
                                                                                        alt={sDashboardData.stores[data.store].Store}
                                                                                        style={{ maxWidth: 75, maxHeight: 30 }}
                                                                                    />
                                                                                </Link>
                                                                            </td>
                                                                            <td className="text-success text-center font-weight-900">
                                                                                {data.change}
                                                                            </td>
                                                                            <td>
                                                                                <div
                                                                                    className="chart-today text-center"
                                                                                    data-series={JSON.stringify(data.hist)}
                                                                                ></div>
                                                                            </td>
                                                                            <td className="text-center text-gray">{data.ccu}</td>
                                                                        </tr>
                                                                    ))}
                                                                {sDashboardData.trending_average.length === 0 && (
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
                                            <div id="trending_game_average_slider" className="trending_game_slider">
                                                {sDashboardData.trending_average.map((data) => (
                                                    <div key={data.name} className="row ml-1 mr-1">
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
                                                            <div className="" style={{ marginLeft: 3, marginRight: 3 }}>
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
                                                    <div className="row justify-content-between">
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
                                                                    <th>Platform</th>
                                                                    <th className="text-center">Average Players</th>
                                                                    <th className="text-center">24-hour Average</th>
                                                                    <th className="text-center">30-days Average</th>
                                                                    <th className="text-center">Max Average Players</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {sDashboardData.topdata_average.length > 0 &&
                                                                    sDashboardData.topdata_average.map((data, index) => (
                                                                        <tr key={data.Name}>
                                                                            <td>{index + 1}.</td>
                                                                            <td>
                                                                                <Link
                                                                                    className="text-dark"
                                                                                    to={"/" + data.Store + "/" + data.NameSEO}
                                                                                >
                                                                                    {data.Name}
                                                                                </Link>
                                                                            </td>
                                                                            <td>
                                                                                <Link to={"/" + data.Store}>
                                                                                    <img
                                                                                        className="lazyload blur-up"
                                                                                        width="100%"
                                                                                        height="100%"
                                                                                        src={sDashboardData.stores[data.Store].Splash}
                                                                                        style={{ maxWidth: 75, maxHeight: 30 }}
                                                                                        alt={"Go to " + data.Name + " site"}
                                                                                    />
                                                                                </Link>
                                                                            </td>
                                                                            <td className="text-center">{Number(data.LastCcu).toLocaleString()}</td>
                                                                            <td className="text-center text-gray">
                                                                                {Number(data.MaxAvg24h).toLocaleString()}
                                                                            </td>
                                                                            <td className="text-center text-gray">
                                                                                {Number(data.MaxAvg30d).toLocaleString()}
                                                                            </td>
                                                                            <td className="text-center text-gray">
                                                                                {Number(data.MaxAvg).toLocaleString()}
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                {sDashboardData.topdata_average.length === 0 && (
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
                                            <div id="top_game_average_slider" className="top_game_slider">
                                                {sDashboardData.topdata_average.map((data) => (
                                                    <div key={data.Name} className="row ml-0 mr-1">
                                                        <div style={{ display: "inline-block", padding: 0 }} className="col-12 col-md-5">
                                                            <Link to={"/" + data.Store + "/" + data.NameSEO}>
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

export default Dashboard;
