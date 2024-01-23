import React, { lazy } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Chart from "react-apexcharts";

// Actions
import { getPlatformData } from "@/redux/platform/actions";

// Helpers
import { ucfirst, stripTags, apexChtSeries } from "@/helpers/utils";
import { todayChartOptions as tdyChtOpts } from "@/helpers/constants";

// Icons
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";

// Components
const Table = lazy(() => import("@/components/table"));
const GameSlider = lazy(() => import("@/components/gameslider"));

const Platform = () => {
    const { source: prmSource } = useParams();

    const dispatch = useDispatch();
    const platformData = useSelector((state) => state.platform);

    React.useEffect(() => {
        dispatch(getPlatformData({ source: prmSource }));
    }, [dispatch, prmSource]);

    React.useEffect(() => {
        console.log(platformData);
    }, [platformData]);

    const mTrdGmesTblDta = React.useMemo(() => {
        const trdGmesTblDta = [];
        if (typeof platformData !== "object") return trdGmesTblDta;
        if (!Array.isArray(platformData.trending)) return trdGmesTblDta;

        for (let i = 0; i < platformData.trending.length; i++) {
            const trdGme = platformData.trending[i];
            const row = {};
            row.key = trdGme.name;
            row.name = (
                <Link className="text-dark" to={"/" + trdGme.store + "/" + trdGme.app_id}>
                    {trdGme.name}
                </Link>
            );
            row.change = trdGme.change;
            row.hist = <Chart options={tdyChtOpts} series={apexChtSeries(trdGme.hist)} width={140} height={30} />;
            row.ccu = trdGme.ccu;
            trdGmesTblDta.push(row);
        }
        return trdGmesTblDta;
    }, [platformData]);

    const mTopGmesTblDta = React.useMemo(() => {
        const topGmesTblDta = [];
        if (typeof platformData !== "object") return topGmesTblDta;
        if (!Array.isArray(platformData.topdata)) return topGmesTblDta;

        for (let i = 0; i < platformData.topdata.length; i++) {
            const topGme = platformData.topdata[i];
            const row = {};
            row.key = topGme.Name;
            row.index = i + 1 + ".";
            row.name = (
                <Link className="text-dark" to={"/" + topGme.Store + "/" + topGme.NameSEO}>
                    {topGme.Name}
                </Link>
            );
            row.LastCcu = Number(topGme.LastCcu).toLocaleString();
            row.TopCcu24h = Number(topGme.TopCcu24h).toLocaleString();
            row.TopCcu30d = Number(topGme.TopCcu30d).toLocaleString();
            row.TopCcu = Number(topGme.TopCcu).toLocaleString();
            topGmesTblDta.push(row);
        }
        return topGmesTblDta;
    }, [platformData]);

    const mTrdGmesAvgTblDta = React.useMemo(() => {
        const trdGmesAvgTblDta = [];
        if (typeof platformData !== "object") return trdGmesAvgTblDta;
        if (!Array.isArray(platformData.trending_average)) return trdGmesAvgTblDta;

        for (let i = 0; i < platformData.trending_average.length; i++) {
            const trdGmeAvg = platformData.trending_average[i];
            const row = {};
            row.key = trdGmeAvg.name;
            row.name = (
                <Link className="text-dark" to={"/" + trdGmeAvg.store + "/" + trdGmeAvg.app_id}>
                    {trdGmeAvg.name}
                </Link>
            );
            row.change = trdGmeAvg.change;
            row.hist = <Chart options={tdyChtOpts} series={apexChtSeries(trdGmeAvg.hist)} width={140} height={30} />;
            row.ccu = trdGmeAvg.ccu;
            trdGmesAvgTblDta.push(row);
        }
        return trdGmesAvgTblDta;
    }, [platformData]);

    const mTopGmesAvgTblDta = React.useMemo(() => {
        const topGmesAvgTblDta = [];
        if (typeof platformData !== "object") return topGmesAvgTblDta;
        if (!Array.isArray(platformData.topdata_average)) return topGmesAvgTblDta;

        for (let i = 0; i < platformData.topdata_average.length; i++) {
            const topGmeAvg = platformData.topdata_average[i];
            const row = {};
            row.key = topGmeAvg.Name;
            row.index = i + 1 + ".";
            row.name = (
                <Link className="text-dark" to={"/" + topGmeAvg.Store + "/" + topGmeAvg.NameSEO}>
                    {topGmeAvg.Name}
                </Link>
            );
            row.LastCcu = Number(topGmeAvg.LastCcu).toLocaleString();
            row.MaxAvg24h = Number(topGmeAvg.MaxAvg24h).toLocaleString();
            row.MaxAvg30d = Number(topGmeAvg.MaxAvg30d).toLocaleString();
            row.MaxAvg = Number(topGmeAvg.MaxAvg).toLocaleString();
            topGmesAvgTblDta.push(row);
        }
        return topGmesAvgTblDta;
    }, [platformData]);

    return (
        <>
            <div className="row game-platforms">
                <span className="game-platforms-menu ml-0 d-none d-lg-flex justify-content-end">
                    {Object.keys(platformData.stores).map((key) => {
                        const store = platformData.stores[key];
                        if (store.Store === prmSource) {
                            return (
                                <li key={store.Store}>
                                    <Link href={"/" + store.Store}>
                                        <img alt={store.Store} src={store.Splash} />
                                    </Link>
                                </li>
                            );
                        }
                    })}
                </span>
                <div className="route-top">
                    <Link to="/">GameCharts</Link>&nbsp;&nbsp;
                    <Icon icon={faAngleDoubleRight} className="text-white" />
                    &nbsp;&nbsp;
                    <Link to={"/" + prmSource}>{ucfirst(prmSource)}</Link>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="card">
                        <div className="card-header bg-gradient-grey">
                            <div className="d-flex flex-row justify-content-between">
                                <h3 className="h5 font-secondary text-uppercase m-0">Trending Games</h3>
                                <h4 className="h5 font-secondary text-uppercase text-white m-0">By Current Players</h4>
                            </div>
                        </div>
                        <div className="card-body p-0">
                            <Table
                                loading={platformData.loading}
                                columns={[
                                    { name: "Name", data: "name" },
                                    { name: "24-hour Change", data: "change", className: "text-center" },
                                    { name: "Today", data: "hist", className: "text-center" },
                                    { name: "Current Players", data: "ccu", className: "text-center" },
                                ]}
                                data={mTrdGmesTblDta}
                                columnsDef={[
                                    {
                                        target: 1,
                                        className: "text-success text-center font-weight-900",
                                    },
                                    {
                                        target: 3,
                                        className: "text-gray center",
                                    },
                                ]}
                                emptyOpts={{
                                    row: 10,
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <GameSlider loading={platformData.loading} data={platformData.trending} />
                </div>
                <div className="row mt-3">
                    <div className="card">
                        <div className="card-header bg-gradient-grey">
                            <div className="d-flex flex-row justify-content-between">
                                <h3 className="h5 font-secondary text-uppercase m-0">Top Games</h3>
                                <h4 className="h5 font-secondary text-uppercase text-white m-0">By Current Players</h4>
                            </div>
                        </div>
                        <div className="card-body p-0">
                            <Table
                                loading={platformData.loading}
                                columns={[
                                    { name: "", data: "index" },
                                    { name: "Name", data: "name" },
                                    { name: "Current Players", data: "LastCcu", className: "text-center" },
                                    { name: "24-hour peak", data: "TopCcu24h", className: "text-center" },
                                    { name: "30-days peak", data: "TopCcu30d", className: "text-center" },
                                    { name: "Peak Players", data: "TopCcu", className: "text-center" },
                                ]}
                                data={mTopGmesTblDta}
                                columnsDef={[
                                    {
                                        target: [1, 2, 3, 4],
                                        className: "text-center",
                                    },
                                ]}
                                emptyOpts={{
                                    row: 10,
                                }}
                            />
                            <div className="d-flex justify-content-end border-top py-1 px-3">
                                <Link className="btn btn-success btn-round" to={"/" + prmSource + "/player_count"}>
                                    More
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <GameSlider loading={platformData.loading} data={platformData.topdata} />
                </div>
                <div className="row mt-3">
                    <div className="card">
                        <div className="card-header bg-gradient-grey">
                            <div className="row justify-content-between">
                                <h3 className="h5 font-secondary text-uppercase m-0">Trending Games</h3>
                                <h4 className="h5 font-secondary text-uppercase text-white m-0">By Average Players</h4>
                            </div>
                        </div>
                        <div className="card-body p-0">
                            <Table
                                loading={platformData.loading}
                                columns={[
                                    { name: "Name", data: "name" },
                                    { name: "24-hour Change", data: "change" },
                                    { name: "Today", data: "hist" },
                                    { name: "Current Players", data: "ccu" },
                                ]}
                                data={mTrdGmesAvgTblDta}
                                columnsDef={[
                                    {
                                        target: 1,
                                        className: "text-success text-center font-weight-900",
                                    },
                                    {
                                        target: 3,
                                        className: "text-center text-gray",
                                    },
                                ]}
                                emptyOpts={{
                                    row: 10,
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <GameSlider loading={platformData.loading} data={platformData.trending_average} />
                </div>
                <div className="row mt-3">
                    <div className="card">
                        <div className="card-header bg-gradient-grey">
                            <div className="row justify-content-between">
                                <h3 className="h5 font-secondary text-uppercase m-0">Top Games</h3>
                                <h4 className="h5 font-secondary text-uppercase text-white m-0">By Average Players</h4>
                            </div>
                        </div>
                        <div className="card-body p-0">
                            <Table
                                loading={platformData.loading}
                                columns={[
                                    { name: "", data: "index" },
                                    { name: "Name", data: "name" },
                                    { name: "Average Players", data: "LastCcu", className: "text-center" },
                                    { name: "24-hour Average", data: "MaxAvg24h", className: "text-center" },
                                    { name: "30-days Average", data: "MaxAvg30d", className: "text-center" },
                                    { name: "Max Average Players", data: "MaxAvg", className: "text-center" },
                                ]}
                                data={mTopGmesAvgTblDta}
                                columnsDef={[
                                    {
                                        target: [2, 3, 4, 5],
                                        className: "text-center",
                                    },
                                    {
                                        taget: [3, 4, 5],
                                        className: "text-gray",
                                    },
                                ]}
                                emptyOpts={{
                                    row: 10,
                                }}
                            />
                            <div className="d-flex justify-content-end border-top py-1 px-3">
                                <Link className="btn btn-success btn-round" to={"/" + prmSource + "/player_average"}>
                                    More
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3 mb-3">
                    <GameSlider loading={platformData.loading} data={platformData.topdata_average} />
                </div>
            </div>
        </>
    );
};

export default Platform;
