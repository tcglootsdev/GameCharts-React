import React, { lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Chart from "react-apexcharts";

// Actions
import { getDashboardData } from "@/redux/dashboard/actions";

// Components
const Table = lazy(() => import("@/components/table"));

// Helpers
import { apexChtSeries } from "@/helpers/utils";
import { todayChartOptions as tdyChtOpts } from "@/helpers/constants";

const Dashboard = () => {
    const dispatch = useDispatch();
    const dashboardData = useSelector((state) => state.dashboard);

    React.useEffect(() => {
        dispatch(getDashboardData());
    }, [dispatch]);

    // React.useEffect(() => {
    //     $(".desktop-screen").show();
    //     try {
    //         axios.get("https://gamecharts.org/api/dashboard.php").then((response) => {
    //             setDashboardData(response.data);
    //         });
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // }, []);

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
    //     if (dashboardData.trending.length > 0) {
    //         $("#trending_game_slider").bxSlider({
    //             touchEnabled: false,
    //         });
    //     }
    //     if (dashboardData.topdata.length > 0) {
    //         $("#top_game_slider").bxSlider({
    //             touchEnabled: false,
    //         });
    //     }
    //     if (dashboardData.trending_average.length > 0) {
    //         $("#trending_game_average_slider").bxSlider({
    //             touchEnabled: false,
    //         });
    //     }
    //     if (dashboardData.topdata_average.length > 0) {
    //         $("#top_game_average_slider").bxSlider({
    //             touchEnabled: false,
    //         });
    //     }
    // }, [dashboardData]);

    const mTrdGmesTblDta = React.useMemo(() => {
        const trdGmesTblDta = [];
        if (typeof dashboardData !== "object") return trdGmesTblDta;
        if (!Array.isArray(dashboardData.trending)) return trdGmesTblDta;

        for (let i = 0; i < dashboardData.trending.length; i++) {
            const trdGme = dashboardData.trending[i];
            const row = {};
            row.key = trdGme.name;
            row.name = (
                <Link className="text-dark" to={"/" + trdGme.store + "/" + trdGme.app_id}>
                    {trdGme.name}
                </Link>
            );
            row.store = (
                <Link to={"/" + trdGme.store}>
                    <img
                        className="lazyload blur-up"
                        width="100%"
                        height="100%"
                        src={dashboardData.stores[trdGme.store].Splash}
                        alt={dashboardData.stores[trdGme.store].store}
                        style={{ maxWidth: "75px", maxHeight: "30px" }}
                    />
                </Link>
            );
            row.change = trdGme.change;
            row.hist = <Chart options={tdyChtOpts} series={apexChtSeries(trdGme.hist)} width={140} height={30} />;
            row.ccu = dashboardData.trending[i].ccu;
            trdGmesTblDta.push(row);
        }
        return trdGmesTblDta;
    }, [dashboardData]);

    return (
        <>
            <div className="row game-platforms">
                <span className="supported-platforms col-12 col-md-3 text-center">Supported Platforms</span>
                {Object.keys(dashboardData.stores).map((key) => (
                    <div key={key} className="col-6 col-md-2 text-center">
                        <Link to={dashboardData.stores[key]["Store"]}>
                            <img
                                height="45px"
                                src={dashboardData.stores[key]["Splash"]}
                                alt={dashboardData.stores[key]["Store"]}
                                style={{ maxWidth: "100%", maxHeight: "45px" }}
                            />
                        </Link>
                    </div>
                ))}
            </div>
            <div className="container">
                <div className="desktop-ads-column-left"></div>
                <div className="desktop-ads-column-right"></div>
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
                                <Table
                                    loading={dashboardData.loading}
                                    columns={[
                                        { name: "Name", data: "name" },
                                        { name: "Platform", data: "store" },
                                        { name: "24-hour Change", data: "change", className: "text-center" },
                                        { name: "Today", data: "hist", className: "text-center" },
                                        { name: "Current Players", data: "ccu", className: "text-center" },
                                    ]}
                                    data={mTrdGmesTblDta}
                                    columnsDef={[
                                        { target: 2, className: "text-success text-center font-weight-900" },
                                        { target: 4, className: "text-center text-gray" },
                                    ]}
                                    emptyOpts={{
                                        row: 10,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="row">
                    <div className="col-12">
                        <div id="trending_game_slider" className="trending_game_slider">
                            {dashboardData.trending.map((data) => (
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
                                            {dashboardData.topdata.length > 0 &&
                                                dashboardData.topdata.map((data, index) => (
                                                    <tr key={data.Name}>
                                                        <td>{index + 1}.</td>
                                                        <td>
                                                            <Link className="text-dark" to={"/" + data.Store + "/" + data.NameSEO}>
                                                                {data.Name}
                                                            </Link>
                                                        </td>
                                                        <td>
                                                            <Link to={"/" + data.Store}>
                                                                <img
                                                                    className="lazyload blur-up"
                                                                    width="100%"
                                                                    height="100%"
                                                                    src={dashboardData.stores[data.Store].Splash}
                                                                    alt={dashboardData.stores[data.Store].Store}
                                                                    style={{ maxWidth: 75, maxHeight: 30 }}
                                                                />
                                                            </Link>
                                                        </td>
                                                        <td className="text-center">{Number(data.LastCcu).toLocaleString()}</td>
                                                        <td className="text-center text-gray">{Number(data.TopCcu24h).toLocaleString()}</td>
                                                        <td className="text-center text-gray">{Number(data.TopCcu30d).toLocaleString()}</td>
                                                        <td className="text-center text-gray">{Number(data.TopCcu).toLocaleString()}</td>
                                                    </tr>
                                                ))}
                                            {dashboardData.topdata.length === 0 && (
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
                            {dashboardData.topdata.map((data) => (
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
                                            {dashboardData.trending_average.length > 0 &&
                                                dashboardData.trending_average.map((data) => (
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
                                                                    src={dashboardData.stores[data.store].Splash}
                                                                    alt={dashboardData.stores[data.store].Store}
                                                                    style={{ maxWidth: 75, maxHeight: 30 }}
                                                                />
                                                            </Link>
                                                        </td>
                                                        <td className="text-success text-center font-weight-900">{data.change}</td>
                                                        <td>
                                                            <div className="chart-today text-center" data-series={JSON.stringify(data.hist)}></div>
                                                        </td>
                                                        <td className="text-center text-gray">{data.ccu}</td>
                                                    </tr>
                                                ))}
                                            {dashboardData.trending_average.length === 0 && (
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
                            {dashboardData.trending_average.map((data) => (
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
                                            {dashboardData.topdata_average.length > 0 &&
                                                dashboardData.topdata_average.map((data, index) => (
                                                    <tr key={data.Name}>
                                                        <td>{index + 1}.</td>
                                                        <td>
                                                            <Link className="text-dark" to={"/" + data.Store + "/" + data.NameSEO}>
                                                                {data.Name}
                                                            </Link>
                                                        </td>
                                                        <td>
                                                            <Link to={"/" + data.Store}>
                                                                <img
                                                                    className="lazyload blur-up"
                                                                    width="100%"
                                                                    height="100%"
                                                                    src={dashboardData.stores[data.Store].Splash}
                                                                    style={{ maxWidth: 75, maxHeight: 30 }}
                                                                    alt={"Go to " + data.Name + " site"}
                                                                />
                                                            </Link>
                                                        </td>
                                                        <td className="text-center">{Number(data.LastCcu).toLocaleString()}</td>
                                                        <td className="text-center text-gray">{Number(data.MaxAvg24h).toLocaleString()}</td>
                                                        <td className="text-center text-gray">{Number(data.MaxAvg30d).toLocaleString()}</td>
                                                        <td className="text-center text-gray">{Number(data.MaxAvg).toLocaleString()}</td>
                                                    </tr>
                                                ))}
                                            {dashboardData.topdata_average.length === 0 && (
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
                            {dashboardData.topdata_average.map((data) => (
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
                </div> */}
            </div>
        </>
    );
};

export default Dashboard;
