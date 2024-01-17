// Modules
import React from "react";
import { useParams } from "react-router-dom";
import Helmet from "react-helmet";
import axios from "axios";
import parser from "html-react-parser";

// Helpers
import { ucfirst } from "../helpers/utils";

const Game = () => {
    const [sGameData, setGameData] = React.useState({
        gameinfo_aux: [],
        gamedata_aux: [],
        stores: [],
        fulldata_aux: [],
        fullaverage_aux: [],
        month_data_array: {},
        dataURL: "",
        today_aux: [],
        yesterday_aux: [],
        weekago_aux: [],
    });
    const [sGameInfoAux, setGameInfoAux] = React.useState({});
    const [sGameDataAux, setGameDataAux] = React.useState({});

    React.useEffect(() => {
        try {
            axios
                .get("https://gamecharts.org/api/game.php", {
                    params: { source, nameseo },
                })
                .then((response) => {
                    setGameData(response.data);
                });
        } catch (error) {
            console.log(error.message);
        }
    }, []);

    React.useEffect(() => {
        setGameInfoAux(typeof sGameData.gameinfo_aux[0] === "object" ? sGameData.gameinfo_aux[0] : {});
        setGameDataAux(typeof sGameData.gamedata_aux[0] === "object" ? sGameData.gamedata_aux[0] : {});
    }, [sGameData]);

    React.useEffect(() => {
        const seriesOptions = [],
            names = ["TODAY", "YESTERDAY", "WEEK AGO"];
        let seriesCounter = 0;

        const createChart = (folder) => {
            Highcharts.stockChart(folder, {
                chart: {
                    styledMode: true,
                },
                title: {
                    text: "Top concurrent users comparison",
                    align: "left",
                },

                rangeSelector: {
                    enabled: false,
                },

                navigator: {
                    enabled: false,
                },

                navigation: {
                    buttonOptions: {
                        enabled: false,
                    },
                },

                scrollbar: { enabled: false },

                tooltip: {
                    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
                    valueDecimals: 0,
                    split: true,
                },

                series: seriesOptions,
            });
        };
        
        const successToday = () => {
            var name = "TODAY";
            var i = 0;
            seriesOptions[i] = {
                name: name,
                data: sGameData.today_aux,
            };

            seriesCounter += 1;

            if (seriesCounter === names.length) {
                createChart("compare");
            }
        };
        const successYesterday = () => {
            var name = "YESTERDAY";
            var i = 1;
            seriesOptions[i] = {
                name: name,
                data: sGameData.yesterday_aux,
            };

            seriesCounter += 1;

            if (seriesCounter === names.length) {
                createChart("compare");
            }
        };
        const successWeekago = () => {
            var name = "WEEK AGO";
            var i = 2;
            seriesOptions[i] = {
                name: name,
                data: sGameData.weekago_aux,
            };

            seriesCounter += 1;

            if (seriesCounter === names.length) {
                createChart("compare");
            }
        };

        Highcharts.setOptions({
            time: {
                timezoneOffset: -1 * 60,
            },
        });
        Highcharts.stockChart("global", {
            chart: {
                styledMode: true,
            },
            title: {
                text: "Top concurrent users",
                align: "left",
            },
            navigation: {
                buttonOptions: {
                    enabled: false,
                },
            },
            navigator: {
                series: {
                    label: {
                        enabled: false,
                    },
                },
            },
            scrollbar: { enabled: false },

            series: [
                {
                    name: "CCU",
                    data: sGameData.fulldata_aux,
                    marker: {
                        enabled: true,
                        radius: 3,
                    },
                    shadow: true,
                    tooltip: {
                        valueDecimals: 0,
                    },
                },
            ],

            xAxis: {
                type: "datetime",
                ordinal: true,
            },
            rangeSelector: {
                allButtonsEnabled: true,
                buttons: [
                    {
                        type: "day",
                        count: 7,
                        text: "7d",
                    },
                    {
                        type: "month",
                        count: 1,
                        text: "1m",
                    },
                    {
                        type: "month",
                        count: 3,
                        text: "3m",
                    },
                    {
                        type: "month",
                        count: 6,
                        text: "6m",
                    },
                    {
                        type: "year",
                        count: 1,
                        text: "1y",
                    },
                ],
                selected: 0,
                buttonTheme: {
                    width: 60,
                },
            },
        });
        Highcharts.stockChart("average", {
            chart: {
                styledMode: true,
            },
            title: {
                text: "Daily average users",
                align: "left",
            },

            navigation: {
                buttonOptions: {
                    enabled: false,
                },
            },
            navigator: {
                series: {
                    label: {
                        enabled: false,
                    },
                },
            },

            scrollbar: { enabled: false },

            series: [
                {
                    name: "Average CCU",
                    data: sGameData.fullaverage_aux,
                    marker: {
                        enabled: true,
                        radius: 3,
                    },
                    shadow: true,
                    tooltip: {
                        valueDecimals: 0,
                    },
                },
            ],

            xAxis: {
                type: "datetime",
                ordinal: true,
            },

            rangeSelector: {
                allButtonsEnabled: true,
                buttons: [
                    {
                        type: "day",
                        count: 7,
                        text: "7d",
                    },
                    {
                        type: "month",
                        count: 1,
                        text: "1m",
                    },
                    {
                        type: "month",
                        count: 3,
                        text: "3m",
                    },
                    {
                        type: "month",
                        count: 6,
                        text: "6m",
                    },
                    {
                        type: "year",
                        count: 1,
                        text: "1y",
                    },
                ],
                selected: 1,
                buttonTheme: {
                    width: 60,
                },
            },
        });

        successToday();
        successYesterday();
        successWeekago();
    }, [sGameData]);

    const { source, nameseo } = useParams();
    const title = React.useMemo(() => "Game Charts Detail : " + sGameInfoAux.Name, [sGameInfoAux]);
    const description = React.useMemo(
        () =>
            "Game Detail Page. The name of this game is " +
            sGameInfoAux.Name +
            "  You will see more detailed info about this game in this page." +
            sGameData.dataURL,
        [sGameInfoAux, sGameData]
    );

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
                <span className="game-platforms-menu" style={{ marginLeft: 0 }}>
                    {sGameData.stores.map((store) => {
                        if (store.Store === source) {
                            <li key={store.Store}>
                                <a href={"https://gamecharts.org/" + store.Store}>
                                    <img alt={store.Store} src={store.Splash} />
                                </a>
                            </li>;
                        }
                    })}
                </span>
                <div className="route-top">
                    <a href="https://gamecharts.org">GameCharts</a>&nbsp;&nbsp;<i className="fas fa-angle-double-right"></i>&nbsp;&nbsp;
                    <a href={"https://gamecharts.org/" + source}>{ucfirst(source)}</a>&nbsp;&nbsp;<i className="fas fa-angle-double-right"></i>
                    &nbsp;&nbsp;<a href="#">{sGameInfoAux.Name}</a>
                </div>
            </div>

            <div id="menu" className="game-menu d-flex flex-md-row flex-column">
                <div className="d-flex game-img">
                    <img src={sGameInfoAux.Splash} alt={sGameInfoAux.Name} />
                </div>
                <div className="d-flex flex-column justify-content-center game-info">
                    <div className="d-flex flex-sm-row flex-column justify-content-between  align-items-center mt-md-0 mt-3 mx-5 mb-sm-0 mb-3">
                        <div className="app-stat">
                            <h1 className="display-4 font-weight-900 text-uppercase text-shadow">{sGameInfoAux.Name}</h1>
                        </div>
                        <div className="app-stat">
                            <a href={sGameInfoAux.Store} target="_new" className="btn btn-success">
                                Store in {source}
                            </a>
                        </div>
                    </div>
                    <div className="line bg-gradient-green mx-5"></div>
                    <div className="d-flex flex-sm-row flex-column justify-content-between mt-2 mx-5">
                        <div className="app-stat d-flex flex-column justify-content-baseline align-items-center mr-sm-3 mr-0">
                            <div className="h6 text-center text-uppercase font-weight-bold text-shadow mb-1">
                                <span className="num">{sGameDataAux.CurrentCcu} ccu</span>
                            </div>
                            <span className="h4 font-secondary text-center text-shadow mt-0">CURRENT</span>
                        </div>
                        <div className="app-stat d-flex flex-column justify-content-baseline align-items-center mr-sm-3 mr-0">
                            <div className="h6 text-center text-uppercase font-weight-bold text-shadow mb-1">
                                <span className="num">{sGameDataAux.TopCcu24h} ccu</span> /
                                <span className="num">{sGameDataAux.MaxAvg24h} average</span>
                            </div>
                            <span className="h4 font-secondary text-center text-shadow mt-0">LAST 24h</span>
                        </div>
                        <div className="app-stat d-flex flex-column justify-content-baseline align-items-center mr-sm-3 mr-0">
                            <div className="h6 text-center text-uppercase font-weight-bold text-shadow mb-1">
                                <span className="num">{sGameDataAux.TopCcu30d} ccu</span> /
                                <span className="num">{sGameDataAux.MaxAvg30d} average</span>
                            </div>
                            <span className="h4 font-secondary text-center text-shadow mt-0">LAST 30d</span>
                        </div>
                        <div className="app-stat d-flex flex-column justify-content-baseline align-items-center">
                            <div className="h6 text-center text-uppercase font-weight-bold text-shadow mb-1">
                                <span className="num">{sGameDataAux.TopCcu} ccu</span> /<span className="num">{sGameDataAux.MaxAvg} average</span>
                            </div>
                            <span className="h4 font-secondary text-center text-shadow mt-0">ALL-TIME PEAK</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid-add game-screen-add bg-light-gray">
                <div className="row-add desktop-screen">
                    <div className="align-items-center">
                        <div className="content-column">
                            <div id="global" className="game-card-2 card p-3"></div>

                            <div id="compare" className="game-card card p-3"></div>

                            <div id="average" className="game-card-2 card p-3"></div>

                            <div className="card p-0">
                                <div className="table-responsive">
                                    <table className="table table-centered mb-0">
                                        <thead className="thead-light">
                                            <tr>
                                                <th></th>
                                                <th>Month</th>
                                                <th className="text-center">Avg. Players</th>
                                                <th className="text-center">Gain</th>
                                                <th className="text-center">% Gain</th>
                                                <th className="text-center">Peak Players</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.keys(sGameData.month_data_array).length > 0 &&
                                                Object.keys(sGameData.month_data_array).map((key) => {
                                                    const data = sGameData.month_data_array[key];
                                                    return (
                                                        <tr key={key}>
                                                            <td></td>
                                                            <td>{key}</td>
                                                            <td className="text-center">
                                                                {"avg" in data && Number(data.avg).toLocaleString()}
                                                                {!("avg" in data) && 0}
                                                            </td>
                                                            <td className="text-center">
                                                                {"inc" in data && data.inc}
                                                                {!("inc" in data) && 0}
                                                            </td>
                                                            <td className="text-center">
                                                                {"pinc" in data && data.pinc}
                                                                {!("pinc" in data) && 0}
                                                            </td>
                                                            <td className="text-center">
                                                                {"peak" in data && Number(data.peak).toLocaleString()}
                                                                {!("peak" in data) && 0}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            {Object.keys(sGameData.month_data_array).length === 0 && (
                                                <tr>
                                                    <td colSpan="5"> Not Games Found </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="row-add">
                                <div className="col-12">
                                    <div id="top_game_slider" className="top_game_slider">
                                        <div className="row-add">
                                            <h2>About {sGameInfoAux.Name}</h2>

                                            <div style={{ display: "block", padding: 0, overflowY: "scroll" }} className="col-sm-12 col-md-12">
                                                {"AboutGame" in sGameInfoAux && (
                                                    <>
                                                        {parser(sGameInfoAux.AboutGame)}
                                                        <div style={{ marginLeft: 3, marginRight: 3 }}></div>
                                                    </>
                                                )}
                                                {!("AboutGame" in sGameInfoAux) && <h3>Description is not added yet.</h3>}
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

export default Game;
