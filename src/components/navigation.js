import React from "react";

const Navigation = () => {
  React.useEffect(() => {
    window.onload = () => {
      document.getElementById("searchBoxIcon").onclick = function () {
        var value = document.getElementById("searchBox").value;

        if (value.length >= 2) {
          window.location.href =
            "http://gamecharts.local/search/" + value.toLowerCase();
        }
      };
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-gradient-green fixed-top">
      <a href="http://gamecharts.local">
        <img
          src="http://gamecharts.local/assets/images/logo-1.png"
          className="logoGameCharts"
          alt="Game Charts logo"
          width="235px"
          height="60px"
        />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item active">
            <span className="nav-link game-subject">
              Realtime game analysis and charts
            </span>
          </li>
        </ul>
        <ul className="list-unstyled topbar-nav navbar-search">
          <li className="hide-phone app-search">
            <form role="search" className="">
              <input
                type="text"
                id="searchBox"
                placeholder="Search..."
                className="form-control bg-light-gray"
              />
              <i id="searchBoxIcon" className="fas fa-search"></i>
            </form>
            <div id="searched_game">
              <div className="item"> Not Games Found </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;