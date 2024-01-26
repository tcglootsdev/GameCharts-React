import React from "react";
import Helmet from "react-helmet";

const About = () => {
  const title = React.useMemo(() => "Game Charts - About", []);
  const description = React.useMemo(() => "GameCharts information", []);

  return (
    <>
      <div className="container app-text">
        <div className="row">
          <div className="content">
            <h1 className="mt-2">About</h1>
            <p>
              Measuring the trends of games on the main stores can give some great insights, and this website aims to be a valuable tool to do so. An
              unpopular game does not necessarily indicate a bad game, and vice versa. If you have any questions or feedback please contact via email.
            </p>

            <p>
              This website is facilitated by a web frontend service and a data collector service that queries the most populars games stores. The
              collector queries the number of concurrent players on an hourly interval for every single game in the platforms catalog, and it has been
              collecting data since January of 2020.
            </p>

            <p>
              Website and services are hosted by <a href="https://www.ovh.com/">OVH</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
