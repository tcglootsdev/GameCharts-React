import React from "react";
import Helmet from "react-helmet";

const About = () => {
    const title = React.useMemo(() => "Game Charts - About", []);
    const description = React.useMemo(() => "GameCharts information", []);

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href="https://gamecharts.org/about" />
                <meta name="twitter:title" content={title}></meta>
                <meta name="twitter:description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
            </Helmet>
            <div className="row game-platforms" style={{ background: "#f2f5f7" }}></div>
            <div className="page-wrapper">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <h1 className="mt-2">About</h1>
                        <div className="mt-2 content">
                            <p>
                                Measuring the trends of games on the main stores can give some great insights, and this website aims to be a valuable
                                tool to do so. An unpopular game does not necessarily indicate a bad game, and vice versa. If you have any questions
                                or feedback please contact via email.
                            </p>

                            <p>
                                This website is facilitated by a web frontend service and a data collector service that queries the most populars
                                games stores. The collector queries the number of concurrent players on an hourly interval for every single game in
                                the platforms catalog, and it has been collecting data since January of 2020.
                            </p>

                            <p>
                                Website and services are hosted by <a href="https://www.ovh.com/">OVH</a>
                            </p>
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </>
    );
};

export default About;
