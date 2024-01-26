import React, { lazy } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import parser from "html-react-parser";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";

// Actions
import { getGameData } from "@/redux/game/actions";

// Helpers
import { ucfirst } from "@/helpers/utils";

// Icons
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";

// Components
const GameInfo = lazy(() => import("./gameinfo"));
const Table = lazy(() => import("@/components/table"));
const TextLoader = lazy(() => import("@/components/textloader"));

const Game = () => {
  const { source: prmSource, nameseo: prmNameseo } = useParams();

  const dispatch = useDispatch();
  const gameData = useSelector((state) => state.game);
  const themeMode = useSelector((state) => state.theme.themeMode);

  React.useEffect(() => {
    dispatch(getGameData({ source: prmSource, nameseo: prmNameseo }));
  }, [dispatch, prmSource, prmNameseo]);

  const mGameInfoAux = React.useMemo(() => {
    const { gameinfo_aux } = gameData;
    if (Array.isArray(gameinfo_aux) && typeof gameinfo_aux[0] === "object") {
      return gameinfo_aux[0];
    } else {
      return {};
    }
  }, [gameData]);

  const mGameDataAux = React.useMemo(() => {
    const { gamedata_aux } = gameData;
    if (Array.isArray(gamedata_aux) && typeof gamedata_aux[0] === "object") {
      return gamedata_aux[0];
    } else {
      return {};
    }
  }, [gameData]);

  const mMonthTblData = React.useMemo(() => {
    const monthTblData = [];
    if (typeof gameData !== "object") return monthTblData;
    if (typeof gameData.month_data_array !== "object") return monthTblData;
    const months = Object.keys(gameData.month_data_array);
    for (let i = 0; i < months.length; i++) {
      const monthData = gameData.month_data_array[months[i]];
      const row = {};
      row.key = months[i];
      row.month = months[i];
      row.avg = "avg" in monthData ? Number(monthData.avg).toLocaleString() : 0;
      row.inc = "inc" in monthData ? monthData.inc : 0;
      row.pinc = "pinc" in monthData ? monthData.pinc : 0;
      row.peak = "peak" in monthData ? Number(monthData.peak).toLocaleString() : 0;
      monthTblData.push(row);
    }
    return monthTblData;
  }, [gameData]);

  return (
    <>
      <div className="row game-platforms">
        <span className="game-platforms-menu ml-0 d-none d-lg-block justify-content-end">
          {gameData.stores.map((store) => {
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
          &nbsp;&nbsp;
          <Icon icon={faAngleDoubleRight} className="text-white" />
          &nbsp;&nbsp;
          <a href="#">{mGameInfoAux.Name}</a>
        </div>
      </div>

      <GameInfo loading={gameData.loading} source={prmSource} gameInfo={mGameInfoAux} gameData={mGameDataAux} />

      <div className="container app-text">
        <div className="row">
          <div className="card">
            <div className="card-body">
              <HighchartsReact
                highcharts={Highcharts}
                options={{
                  time: {
                    timezoneOffset: -1 * 60,
                  },
                  chart: {
                    backgroundColor: themeMode === "dark" && "rgb(36, 39, 54)",
                  },
                  title: {
                    text: "Top concurrent users",
                    align: "left",
                    style: themeMode === "dark" && {
                      color: "#C0C0C0",
                    },
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
                      data: gameData.fulldata_aux,
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
                    min: new Date().getTime() - 10 * 365 * 24 * 60 * 60 * 1000,
                    max: new Date().getTime() + 24 * 60 * 60 * 1000,
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
                }}
                constructorType="stockChart"
              />
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="card">
            <div className="card-body">
              <HighchartsReact
                highcharts={Highcharts}
                options={{
                  time: {
                    timezoneOffset: -1 * 60,
                  },
                  chart: {
                    backgroundColor: themeMode === "dark" && "rgb(36, 39, 54)",
                  },
                  title: {
                    text: "Top concurrent users comparison",
                    align: "left",
                    style: themeMode === "dark" && {
                      color: "#C0C0C0",
                    },
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
                  series: [
                    {
                      name: "TODAY",
                      data: gameData.today_aux,
                    },
                    {
                      name: "YESTERDAY",
                      data: gameData.yesterday_aux,
                    },
                    {
                      name: "WEEK AGO",
                      data: gameData.weekago_aux,
                    },
                  ],
                }}
                constructorType="stockChart"
              />
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="card">
            <div className="card-body">
              <HighchartsReact
                highcharts={Highcharts}
                options={{
                  time: {
                    timezoneOffset: -1 * 60,
                  },
                  chart: {
                    backgroundColor: themeMode === "dark" && "rgb(36, 39, 54)",
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
                      data: gameData.fullaverage_aux,
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
                    min: new Date().getTime() - 10 * 365 * 24 * 60 * 60 * 1000,
                    max: new Date().getTime() + 24 * 60 * 60 * 1000,
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
                }}
                constructorType="stockChart"
              />
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="card">
            <div className="card-body p-0">
              <Table
                loading={gameData.loading}
                columns={[
                  { name: "Month", data: "month" },
                  { name: "Avg. Players", data: "avg", className: "text-center" },
                  { name: "Gain", data: "inc", className: "text-center" },
                  { name: "% Gain", data: "pinc", className: "text-center" },
                  { name: "Peak Players", data: "peak", className: "text-center" },
                ]}
                data={mMonthTblData}
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
            </div>
          </div>
        </div>
        <div className="row mt-3 pb-3">
          <div>
            <h2>About {mGameInfoAux.Name}</h2>
            <div className="col-sm-12 col-md-12 d-block p-0">
              {!gameData.loading && "AboutGame" in mGameInfoAux && (
                <>
                  {parser(mGameInfoAux.AboutGame)}
                  <div style={{ marginLeft: 3, marginRight: 3 }}></div>
                </>
              )}
              {(gameData.loading || !("AboutGame" in mGameInfoAux)) && <TextLoader row={10} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Game;
