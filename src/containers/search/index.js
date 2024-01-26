import React, { lazy } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Chart from "react-apexcharts";

// Icons
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";

// Components
const Table = lazy(() => import("@/components/table"));

// Actions
import { getSearchData } from "@/redux/search/actions";

// Helpers
import { apexChtSeries } from "@/helpers/utils";
import { todayChartOptions as tdyChtOpts } from "@/helpers/constants";

const search = () => {
  const { searchValue } = useParams();

  const dispatch = useDispatch();
  const searchData = useSelector((state) => state.search);

  React.useEffect(() => {
    dispatch(getSearchData({ searchValue }));
  }, [dispatch, searchValue]);

  const mSrchRsltsTbleData = React.useMemo(() => {
    const srchRsltsTbleData = [];
    if (typeof searchData !== "object") return srchRsltsTbleData;
    if (!Array.isArray(searchData.matching_data)) return srchRsltsTbleData;
    for (let i = 0; i < searchData.matching_data.length; i++) {
      const dataItem = searchData.matching_data[i];
      const row = {};
      row.key = dataItem.Name;
      row.image = (
        <Link to={"/" + dataItem.Source + "/" + dataItem.NameSEO}>
          <img src={dataItem.Logo} alt={dataItem.Name} style={{ maxWidth: 150, maxHeight: 70 }} />
        </Link>
      );
      row.name = <Link to={"/" + dataItem.Source + "/" + dataItem.NameSEO}>{dataItem.Name}</Link>;
      row.store = (
        <Link to={"/" + dataItem.Source}>
          <img
            src={searchData.stores[dataItem.Source].Splash}
            alt={searchData.stores[dataItem.Source].Store}
            style={{ maxWidth: 75, maxHeight: 30 }}
          />
        </Link>
      );
      row.hist = <Chart options={tdyChtOpts} series={apexChtSeries(dataItem.hisArr)} width={140} height={30} />;
      row.TopCcu24h = dataItem.Peak24Hours;
      row.ccu = dataItem.LastCcu;
      srchRsltsTbleData.push(row);
    }
    return srchRsltsTbleData;
  }, [searchData]);

  return (
    <>
      <div className="row game-platforms">
        <div className="route-top">
          <Link to="/">Home</Link>&nbsp;&nbsp;
          <Icon icon={faAngleDoubleRight} className="text-white" />
          &nbsp;&nbsp;
          <a href="#">Search</a>
        </div>
      </div>
      <div className="container">
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
                loading={searchData.loading}
                columns={[
                  { name: "", data: "image" },
                  { name: "Name", data: "name" },
                  { name: "Platform", data: "store" },
                  { name: "24-hour peak", data: "TopCcu24h", className: "text-center" },
                  { name: "Today", data: "hist", className: "text-center" },
                  { name: "Current players", data: "ccu", className: "text-center" },
                ]}
                columnsDef={[{ target: 1, className: "game-name" }]}
                data={mSrchRsltsTbleData}
                emptyOpts={{
                  row: 10,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default search;
