import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import axios from "axios";

// Styles
import "./search.css";

const search = () => {
    const { searchValue } = useParams();
    const title = React.useMemo(() => "Game Charts - Search", []);
    const description = React.useMemo(() => "GameCharts. This page shows games matching searched text.", []);

    const [sSearchData, setSearchData] = React.useState({
        stores: [],
        matching_data: [],
    });

    React.useEffect(() => {
        try {
            axios
                .get("https://gamecharts.org/api/search.php", {
                    params: { search: searchValue },
                })
                .then((response) => {
                    setSearchData(response.data);
                });
        } catch (error) {
            console.log(error.message);
        }
    }, [searchValue]);

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
    // }, [sSearchData]);

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={"https://gamecharts.org/search/" + searchValue} />
                <meta name="twitter:title" content={title}></meta>
                <meta name="twitter:description" content={description} />
                <meta property="og:title" content={"Game Charts - " + title} />
                <meta property="og:description" content={description} />
            </Helmet>
            <div className="row game-platforms">
                <div className="route-top">
                    <a href="http://gamecharts.local">Home</a>&nbsp;&nbsp;
                    <i className="fas fa-angle-double-right"></i>&nbsp;&nbsp;<a href="#">Search</a>
                </div>
            </div>
            <div className="page-wrapper page-wrapper-img">
                <div className="page-wrapper-inner-add align-items-center position-relative">
                    <div className="container-fluid-add pb-0">
                        <div className="row-add desktop-screen justify-content-center mb-5 pb-3">
                            <div className="col-lg-8-add col-xs-12 game-list">
                                <div className="content-column">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="table-responsive">
                                                        <table className="table table-centered table-striped mb-0">
                                                            <thead className="thead-light">
                                                                <tr>
                                                                    <th></th>
                                                                    <th>Name</th>
                                                                    <th>Platform</th>
                                                                    <th className="center">24-hour peak</th>
                                                                    <th className="center">Today</th>
                                                                    <th className="center">Current players</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {sSearchData.matching_data.length > 0 &&
                                                                    sSearchData.matching_data.map((data) => (
                                                                        <tr>
                                                                            <td>
                                                                                <Link to={"/" + data.Source + "/" + data.NameSEO}>
                                                                                    <img
                                                                                        src={data.Logo}
                                                                                        alt={data.Name}
                                                                                        style={{ maxWidth: 150, maxHeight: 70 }}
                                                                                    />
                                                                                </Link>
                                                                            </td>
                                                                            <td>
                                                                                <Link
                                                                                    className="text-dark"
                                                                                    to={"/" + data.Source + "/" + data.NameSEO}
                                                                                >
                                                                                    {data.Name}
                                                                                </Link>
                                                                            </td>
                                                                            <td>
                                                                                <Link to={"/" + data.Source}>
                                                                                    <img
                                                                                        src={sSearchData.stores[data.Source].Splash}
                                                                                        alt={sSearchData.stores[data.Source].Store}
                                                                                        style={{ maxWidth: 75, maxHeight: 30 }}
                                                                                    />
                                                                                </Link>
                                                                            </td>

                                                                            <td className="center">{data.Peak24Hours}</td>
                                                                            <td>
                                                                                <div
                                                                                    className="chart-today text-center"
                                                                                    data-series={JSON.stringify(data.hisArr)}
                                                                                ></div>
                                                                            </td>

                                                                            <td className="center" style={{ color: "grey" }}>
                                                                                {data.LastCcu}
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                {sSearchData.matching_data.length === 0 && (
                                                                    <tr>
                                                                        <td colSpan="5"> No Results Found </td>
                                                                    </tr>
                                                                )}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
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

export default search;
