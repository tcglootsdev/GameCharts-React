import React from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Icons
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";

// Components
import Table from "@/components/table";
import GameSlider from "@/components/gameslider";

// Actions
import { getPlayerData } from "@/redux/player/actions";

// Styles
import { ucfirst } from "@/helpers/utils";

const Player = ({ type: pType }) => {
    const { source: prmSource } = useParams();

    const dispatch = useDispatch();
    const playerData = useSelector((state) => state.player);

    const mNavigationTag = React.useMemo(() => {
        return {
            ccu: "Player Count",
            avg: "Player Average",
        };
    }, []);

    const mTableLabel = React.useMemo(() => {
        return {
            ccu: "By Current Players",
            avg: "By Average Players",
        };
    }, []);

    const [sPage, setPage] = React.useState(1);

    React.useEffect(() => {
        dispatch(getPlayerData({ source: prmSource, type: pType, page: sPage }));
    }, [dispatch, prmSource, pType, sPage]);

    const mTopGmesTblData = React.useMemo(() => {
        const topGmesTblData = [];
        if (typeof playerData !== "object") return topGmesTblData;
        if (!Array.isArray(playerData.top_data)) return topGmesTblData;
        for (let i = 0; i < playerData.top_data.length; i++) {
            const topGme = playerData.top_data[i];
            const row = {};
            row.key = topGme.NameSEO;
            row.index = 1 + 25 * (sPage - 1) + i + ".";
            row.name = <Link to={"/" + prmSource + "/" + topGme.NameSEO}>{topGme.Name}</Link>;
            row.ccu = Number(topGme.LastCcu).toLocaleString();

            if (pType === "avg") {
                row.ccu24h = Number(topGme.MaxAvg24h).toLocaleString();
                row.ccu30d = Number(topGme.MaxAvg24h).toLocaleString();
                row.ccuall = Number(topGme.MaxAvg).toLocaleString();
            } else if (pType === "ccu") {
                row.ccu24h = Number(topGme.TopCcu24h).toLocaleString();
                row.ccu30d = Number(topGme.TopCcu30d).toLocaleString();
                row.ccuall = Number(topGme.TopCcu).toLocaleString();
            }
            topGmesTblData.push(row);
        }
        return topGmesTblData;
    }, [playerData]);

    return (
        <>
            <div className="row game-platforms">
                <span className="game-platforms-menu ml-0">
                    {Object.keys(playerData.stores).map((key) => {
                        const store = playerData.stores[key];
                        if (store.Store == prmSource) {
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
                    <a className="text-white text-decoration-none" href="#">
                        TOP GAMES
                    </a>
                </span>
                <div className="route-top">
                    <Link to="/">Home</Link>&nbsp;&nbsp;
                    <Icon icon={faAngleDoubleRight} className="text-white" />
                    &nbsp;&nbsp;
                    <Link to={"/" + prmSource}>{ucfirst(prmSource)}</Link>&nbsp;&nbsp;
                    <Icon icon={faAngleDoubleRight} className="text-white" />
                    &nbsp;&nbsp;
                    <a href="#">{mNavigationTag[pType]}</a>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="card">
                        <div className="card-header bg-gradient-grey">
                            <div className="row">
                                <h3 className="h5 font-secondary text-uppercase m-0">{mTableLabel[pType]}</h3>
                            </div>
                        </div>
                        <div className="card-body p-0">
                            <Table
                                loading={playerData.loading}
                                columns={[
                                    { name: "", data: "index" },
                                    { name: "Name", data: "name" },
                                    { name: "Current Players", data: "ccu", className: "text-center" },
                                    { name: "24-hour peak", data: "ccu24h", className: "text-center" },
                                    { name: "30-days peak", data: "ccu30d", className: "text-center" },
                                    { name: "Peak players", data: "ccuall", className: "text-center" },
                                ]}
                                data={mTopGmesTblData}
                                columnsDef={[
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
                <div className="row justify-content-end">
                    {sPage >= 2 && (
                        <a href="#" className="mr-1" onClick={() => setPage((state) => state - 1)}>
                            Previous
                        </a>
                    )}
                    {sPage >= 2 && playerData.nextPageRel !== "" && " or "}
                    {sPage >= 2 && playerData.nextPageRel === "" && " page "}
                    {playerData.nextPageRel !== "" && (
                        <>
                            <a href="#" className="mr-1 ml-1" onClick={() => setPage((state) => state + 1)}>
                                Next
                            </a>
                            page
                        </>
                    )}
                </div>
                <div className="row mt-3 mb-3">
                    <GameSlider loading={playerData.loading} data={playerData.top_data} />
                </div>
            </div>
        </>
    );
};

export default Player;
