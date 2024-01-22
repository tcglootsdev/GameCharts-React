import React, { lazy } from "react";

// Helpers
import { ucfirst } from "@/helpers/utils";

// Components
const RectLoader = lazy(() => import("@/components/rectloader"));
const DataItem = lazy(() => import("./dataitem"));

// Styles
import classNames from "classnames/bind";
import styles from "./style.module.css";
const cx = classNames.bind(styles);

// Helpers
import { isEmpty } from "@/helpers/utils";

const GameInfo = ({ source, gameInfo, gameData, loading }) => {
    const [sNoData, setNoData] = React.useState(false);

    React.useEffect(() => {
        if (isEmpty(gameInfo) || isEmpty(gameData)) {
            setNoData(true);
        } else {
            setNoData(false);
        }
    }, [gameInfo, gameData]);

    return (
        <div className={"position-relative d-flex flex-lg-row flex-column " + cx("game-menu")}>
            <div className={"d-flex align-items-center justify-content-center " + cx("game-img")}>
                {!sNoData && !loading && <img src={gameInfo.Splash} alt={gameInfo.Name} />}
                {(sNoData || loading) && <RectLoader width={460} height={215}  backgroundColor="#2a3143" foregroundColor="#111111" />}
            </div>
            <div className={"d-flex flex-column justify-content-center mt-sm-2 mt-lg-0 " + cx("game-info")}>
                <div className="d-flex flex-sm-row flex-column justify-content-between align-items-center mt-3 mx-5 mb-2">
                    {!sNoData && !loading && (
                        <>
                            <div className="app-stat">
                                <h1 className="display-4 font-weight-900 text-uppercase text-shadow">{gameInfo.Name}</h1>
                            </div>
                            <div className="app-stat">
                                <a href={gameInfo.Store} target="_new" className="btn btn-success">
                                    Store in {ucfirst(source)}
                                </a>
                            </div>
                        </>
                    )}
                    {(sNoData || loading) && <RectLoader width={200} height={70} backgroundColor="#2a3143" foregroundColor="#111111" />}
                </div>

                <div className="line bg-gradient-green mx-5"></div>
                <div className="d-flex flex-sm-row flex-column justify-content-between mt-2 mx-5">
                    <DataItem
                        loading={sNoData || loading}
                        className="mr-sm-3 mr-0"
                        label="CURRENT"
                        info={<span className="num">{gameData.CurrentCcu} ccu</span>}
                    />
                    <DataItem
                        loading={sNoData || loading}
                        className="mr-sm-3 mr-0"
                        label="LAST 24h"
                        info={
                            <>
                                <span className="num">{gameData.TopCcu24h} ccu</span> /<span className="num">{gameData.MaxAvg24h} average</span>
                            </>
                        }
                    />
                    <DataItem
                        loading={sNoData || loading}
                        className="mr-sm-3 mr-0"
                        label="LAST 30d"
                        info={
                            <>
                                <span className="num">{gameData.TopCcu30d} ccu</span> /<span className="num">{gameData.MaxAvg30d} average</span>
                            </>
                        }
                    />
                    <DataItem
                        loading={sNoData || loading}
                        label="ALL-TIME PEAK"
                        info={
                            <>
                                <span className="num">{gameData.TopCcu} ccu</span> /<span className="num">{gameData.MaxAvg} average</span>
                            </>
                        }
                    />
                </div>
            </div>
        </div>
    );
};

GameInfo.defaultProps = {
    source: "",
    gameInfo: {},
    gameData: {},
    emptyOpts: {
        height: 250,
    },
};

export default GameInfo;
