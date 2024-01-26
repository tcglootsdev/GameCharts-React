import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { getSearchDataWithJSON } from "@/redux/search/actions";
import { saveThemeMode } from "@/redux/theme/actions";

// Icons
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faSearch, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

// Styles
import "./style.css";
import classNames from "classnames/bind";
import styles from "./style.module.css";
const cx = classNames.bind(styles);

const { PUBLIC_URL } = process.env;

const Navigation = (props) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const searchData = useSelector((state) => state.search);

  const [sSearchValue, setSearchValue] = React.useState("");
  const [sCurrentTheme, setCurrentTheme] = React.useState("light");

  React.useEffect(() => {
    let themeMode = window.localStorage.getItem("themeMode");
    if (themeMode !== "light" && themeMode !== "dark") {
      themeMode = "light";
    }
    setCurrentTheme(themeMode);
  }, []);

  React.useEffect(() => {
    if (sSearchValue.length > 1) {
      dispatch(getSearchDataWithJSON({ searchValue: sSearchValue.substring(0, 2).toLowerCase() }));
    }
  }, [dispatch, sSearchValue]);

  const mSearchResults = React.useMemo(() => {
    if (sSearchValue.length < 2) return [];
    const searchResults = searchData.result.filter((resultItem) => resultItem.Name.toLowerCase().includes(sSearchValue.toLowerCase()));
    return searchResults.slice(0, 6);
  }, [searchData, sSearchValue]);

  const cbSetAppThemeMode = React.useCallback(
    (themeMode) => {
      document.documentElement.setAttribute("data-app-theme", themeMode);
      localStorage.setItem("themeMode", themeMode);
      setCurrentTheme(themeMode);
      dispatch(saveThemeMode({ themeMode }));
    },
    [setCurrentTheme, dispatch]
  );

  return (
    <nav className={"navbar navbar-expand-lg navbar-light bg-gradient-green fixed-top"}>
      <Link to={"/"}>
        <img
          src={PUBLIC_URL + "/assets/images/" + (sCurrentTheme === "light" ? "logo-1.png" : "logo-1-dark.png")}
          className="logoGameCharts"
          alt="Game Charts logo"
          width="235px"
          height="60px"
        />
      </Link>
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
            <span className="nav-link game-subject">Realtime game analysis and charts</span>
          </li>
        </ul>
        {sCurrentTheme === "light" && <Icon icon={faSun} onClick={() => cbSetAppThemeMode("dark")} className={cx("select-theme")} />}
        {sCurrentTheme === "dark" && <Icon icon={faMoon} onClick={() => cbSetAppThemeMode("light")} className={cx("select-theme")} />}
      </div>
      <ul className="list-unstyled topbar-nav navbar-search">
        <li className={cx("app-search")}>
          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              type="text"
              value={sSearchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search..."
              className="form-control"
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  if (sSearchValue.length > 1) {
                    setSearchValue("");
                    navigate("/search/" + sSearchValue);
                  }
                }
              }}
            />
            <Icon
              icon={faSearch}
              onClick={() => {
                if (sSearchValue.length > 1) {
                  setSearchValue("");
                  navigate("/search/" + sSearchValue);
                }
              }}
            />
          </form>
          {sSearchValue.length > 1 && (
            <div className={cx("searched-game")}>
              {mSearchResults.length > 0 &&
                mSearchResults.map((resultItem, index) => (
                  <div key={index} className={cx("search-item")}>
                    <Link to={"/" + resultItem.Source + "/" + resultItem.NameSEO}>
                      <img src={resultItem.Logo} className="item-img" alt={resultItem.Name} />
                      {resultItem.Name + " - "}
                      <span>{resultItem.Source}</span>
                    </Link>
                  </div>
                ))}
              {mSearchResults.length === 0 && (
                <div className={cx("no-items")}>
                  <span>Not Games Found</span>
                </div>
              )}
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
