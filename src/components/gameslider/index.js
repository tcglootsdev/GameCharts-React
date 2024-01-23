import React, { lazy } from "react";
import { Link } from "react-router-dom";

// Components
const Slider = lazy(() => import("@/components/slider"));

// Helpers
import { stripTags } from "@/helpers/utils";

const GameSlider = ({ loading, data }) => {
    return (
        <Slider loading={loading} emptyOpts={{ height: 215 }}>
            {data.map((dataItem) => (
                <div key={dataItem.Name || dataItem.name} className="row ml-0 mr-1">
                    <div style={{ display: "inline-block", padding: 0 }} className="col-12 col-md-5">
                        <Link to={"/" + dataItem.Store + "/" + dataItem.NameSEO}>
                            <img
                                className="lazyload blur-up"
                                width="100%"
                                height="100%"
                                src={Array.isArray(dataItem.i_game) && dataItem.i_game[0].Splash}
                                alt={dataItem.Name}
                            />
                        </Link>
                    </div>

                    <div style={{ display: "inline-block", padding: 0, height: 215, overflowY: "scroll" }} className="col-sm-12 col-md-7">
                        <div style={{ marginLeft: 3, marginRight: 3 }}>
                            {stripTags(Array.isArray(dataItem.i_game) ? dataItem.i_game[0].AboutGame : "")}
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    );
};

export default GameSlider;
