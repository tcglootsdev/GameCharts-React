import React, { lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Chart from "react-apexcharts";

// Actions
import { getDashboardData } from "@/redux/dashboard/actions";

// Components
const Table = lazy(() => import("@/components/table"));
const GameSlider = lazy(() => import("@/components/gameslider"));

// Helpers
import { apexChtSeries } from "@/helpers/utils";
import { todayChartOptions as tdyChtOpts } from "@/helpers/constants";

// Styles
import classNames from "classnames/bind";
import styles from "./style.module.css";
const cx = classNames.bind(styles);

const Dashboard = () => {
  const dispatch = useDispatch();
  const dashboardData = useSelector((state) => state.dashboard);

  React.useEffect(() => {
    dispatch(getDashboardData());
  }, [dispatch]);

  const mTrdGmesTblDta = React.useMemo(() => {
    const trdGmesTblDta = [];
    if (typeof dashboardData !== "object") return trdGmesTblDta;
    if (!Array.isArray(dashboardData.trending)) return trdGmesTblDta;

    for (let i = 0; i < dashboardData.trending.length; i++) {
      const trdGme = dashboardData.trending[i];
      const row = {};
      row.key = trdGme.name;
      row.name = <Link to={"/" + trdGme.store + "/" + trdGme.app_id}>{trdGme.name}</Link>;
      row.store = (
        <Link to={"/" + trdGme.store}>
          <img
            className="lazyload blur-up"
            width="100%"
            height="100%"
            src={dashboardData.stores[trdGme.store].Splash}
            alt={dashboardData.stores[trdGme.store].Store}
            style={{ maxWidth: "75px", maxHeight: "30px" }}
          />
        </Link>
      );
      row.change = trdGme.change;
      row.hist = <Chart options={tdyChtOpts} series={apexChtSeries(trdGme.hist)} width={140} height={30} />;
      row.ccu = trdGme.ccu;
      trdGmesTblDta.push(row);
    }
    return trdGmesTblDta;
  }, [dashboardData]);

  const mTopGmesTblDta = React.useMemo(() => {
    const topGmesTblDta = [];
    if (typeof dashboardData !== "object") return topGmesTblDta;
    if (!Array.isArray(dashboardData.topdata)) return topGmesTblDta;

    for (let i = 0; i < dashboardData.topdata.length; i++) {
      const topGme = dashboardData.topdata[i];
      const row = {};
      row.key = topGme.Name;
      row.index = i + 1 + ".";
      row.name = <Link to={"/" + topGme.Store + "/" + topGme.NameSEO}>{topGme.Name}</Link>;
      row.store = (
        <Link to={"/" + topGme.Store}>
          <img
            className="lazyload blur-up"
            width="100%"
            height="100%"
            src={dashboardData.stores[topGme.Store].Splash}
            alt={dashboardData.stores[topGme.Store].Store}
            style={{ maxWidth: 75, maxHeight: 30 }}
          />
        </Link>
      );
      row.LastCcu = Number(topGme.LastCcu).toLocaleString();
      row.TopCcu24h = Number(topGme.TopCcu24h).toLocaleString();
      row.TopCcu30d = Number(topGme.TopCcu30d).toLocaleString();
      row.TopCcu = Number(topGme.TopCcu).toLocaleString();
      topGmesTblDta.push(row);
    }
    return topGmesTblDta;
  }, [dashboardData]);

  const mTrdGmesAvgTblDta = React.useMemo(() => {
    const trdGmesAvgTblDta = [];
    if (typeof dashboardData !== "object") return trdGmesAvgTblDta;
    if (!Array.isArray(dashboardData.trending_average)) return trdGmesAvgTblDta;

    for (let i = 0; i < dashboardData.trending_average.length; i++) {
      const trdGmeAvg = dashboardData.trending_average[i];
      const row = {};
      row.key = trdGmeAvg.name;
      row.name = <Link to={"/" + trdGmeAvg.store + "/" + trdGmeAvg.app_id}>{trdGmeAvg.name}</Link>;
      row.store = (
        <Link to={"/" + trdGmeAvg.store}>
          <img
            className="lazyload blur-up"
            width="100%"
            height="100%"
            src={dashboardData.stores[trdGmeAvg.store].Splash}
            alt={dashboardData.stores[trdGmeAvg.store].Store}
            style={{ maxWidth: 75, maxHeight: 30 }}
          />
        </Link>
      );
      row.change = trdGmeAvg.change;
      row.hist = <Chart options={tdyChtOpts} series={apexChtSeries(trdGmeAvg.hist)} width={140} height={30} />;
      row.ccu = trdGmeAvg.ccu;
      trdGmesAvgTblDta.push(row);
    }
    return trdGmesAvgTblDta;
  }, [dashboardData]);

  const mTopGmesAvgTblDta = React.useMemo(() => {
    const topGmesAvgTblDta = [];
    if (typeof dashboardData !== "object") return topGmesAvgTblDta;
    if (!Array.isArray(dashboardData.topdata_average)) return topGmesAvgTblDta;

    for (let i = 0; i < dashboardData.topdata_average.length; i++) {
      const topGmeAvg = dashboardData.topdata_average[i];
      const row = {};
      row.key = topGmeAvg.Name;
      row.index = i + 1 + ".";
      row.name = <Link to={"/" + topGmeAvg.Store + "/" + topGmeAvg.NameSEO}>{topGmeAvg.Name}</Link>;
      row.store = (
        <Link to={"/" + topGmeAvg.Store}>
          <img
            className="lazyload blur-up"
            width="100%"
            height="100%"
            src={dashboardData.stores[topGmeAvg.Store].Splash}
            alt={dashboardData.stores[topGmeAvg.Store].Store}
            style={{ maxWidth: 75, maxHeight: 30 }}
          />
        </Link>
      );
      row.LastCcu = Number(topGmeAvg.LastCcu).toLocaleString();
      row.MaxAvg24h = Number(topGmeAvg.MaxAvg24h).toLocaleString();
      row.MaxAvg30d = Number(topGmeAvg.MaxAvg30d).toLocaleString();
      row.MaxAvg = Number(topGmeAvg.MaxAvg).toLocaleString();
      topGmesAvgTblDta.push(row);
    }
    return topGmesAvgTblDta;
  }, [dashboardData]);

  return (
    <>
      <div className="row game-platforms">
        <span className={"col-5 d-none d-lg-block " + cx("supported-platforms")}>Supported Platforms</span>
        {Object.keys(dashboardData.stores).map((key) => (
          <div key={key} className={"col-6 col-lg-2 text-center " + cx("game-platform")}>
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
                  { target: 0, className: "game-name" },
                  { target: 2, className: "app-text-success text-center font-weight-900" },
                  { target: 4, className: "text-center text-gray" },
                ]}
                emptyOpts={{
                  row: 10,
                }}
              />
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <GameSlider loading={dashboardData.loading} data={dashboardData.trending} />
        </div>
        <div className="row mt-3">
          <div className="card">
            <div className="card-header bg-gradient-grey">
              <div className="row justify-content-between">
                <h3 className="h5 font-secondary text-uppercase m-0">Top Games</h3>
                <h4 className="h5 font-secondary text-uppercase text-white m-0">By Current Players</h4>
              </div>
            </div>
            <div className="card-body p-0">
              <Table
                loading={dashboardData.loading}
                columns={[
                  { name: "", data: "index" },
                  { name: "Name", data: "name" },
                  { name: "Platform", data: "store" },
                  { name: "Current Players", data: "LastCcu", className: "text-center" },
                  { name: "24-hour peak", data: "TopCcu24h", className: "text-center" },
                  { name: "30-days peak", data: "TopCcu30d", className: "text-center" },
                  { name: "Peak Players", data: "TopCcu", className: "text-center" },
                ]}
                data={mTopGmesTblDta}
                columnsDef={[
                  { target: 1, className: "game-name" },
                  {
                    target: [2, 3, 4, 5],
                    className: "text-center",
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
          <GameSlider loading={dashboardData.loading} data={dashboardData.topdata} />
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
                loading={dashboardData.loading}
                columns={[
                  { name: "Name", data: "name" },
                  { name: "Platform", data: "store" },
                  { name: "24-hour Change", data: "change" },
                  { name: "Today", data: "hist" },
                  { name: "Current Players", data: "ccu" },
                ]}
                data={mTrdGmesAvgTblDta}
                columnsDef={[
                  { target: 0, className: "game-name" },
                  {
                    target: 2,
                    className: "app-text-success text-center font-weight-900",
                  },
                  {
                    target: 4,
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
          <GameSlider loading={dashboardData.loading} data={dashboardData.trending_average} />
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
                loading={dashboardData.loading}
                columns={[
                  { name: "", data: "index" },
                  { name: "Name", data: "name" },
                  { name: "Platform", data: "store" },
                  { name: "Average Players", data: "LastCcu", className: "text-center" },
                  { name: "24-hour Average", data: "MaxAvg24h", className: "text-center" },
                  { name: "30-days Average", data: "MaxAvg30d", className: "text-center" },
                  { name: "Max Average Players", data: "MaxAvg", className: "text-center" },
                ]}
                data={mTopGmesAvgTblDta}
                columnsDef={[
                  { target: 1, className: "game-name" },
                  {
                    target: [3, 4, 5, 6],
                    className: "text-center",
                  },
                  {
                    taget: [4, 5, 6],
                    className: "text-gray",
                  },
                ]}
                emptyOpts={{
                  row: 10,
                }}
              />
            </div>
          </div>
        </div>
        <div className="row mt-3 pb-3">
          <GameSlider loading={dashboardData.loading} data={dashboardData.topdata_average} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
