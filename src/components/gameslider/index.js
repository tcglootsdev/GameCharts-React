import React, { lazy } from "react";
import { Link } from "react-router-dom";

// Components
const Slider = lazy(() => import("@/components/slider"));

// Helpers
import { stripTags } from "@/helpers/utils";

// Styles
import classNames from "classnames/bind";
import styles from "./style.module.css";
const cx = classNames.bind(styles);

const GameSlider = ({ loading, data, store }) => {
  return (
    <Slider loading={loading} emptyOpts={{ height: 215 }}>
      {data.map((dataItem) => (
        <div key={dataItem.Name || dataItem.name} className="row ml-0 mr-1">
          <div style={{ display: "inline-block", padding: 0 }} className="col-12 col-md-5">
            <Link to={"/" + (store || dataItem.Store || dataItem.store) + "/" + (dataItem.NameSEO || dataItem.app_id)}>
              <div>
                <img
                  width="100%"
                  height="100%"
                  src={Array.isArray(dataItem.i_game) && dataItem.i_game[0].Splash}
                  alt={dataItem.Name || dataItem.name}
                />
              </div>
            </Link>
          </div>

          <div className={"col-sm-12 col-md-7 " + cx("about")}>
            <div className="ml-1 mr-1">{stripTags(Array.isArray(dataItem.i_game) ? dataItem.i_game[0].AboutGame : "")}</div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default GameSlider;
