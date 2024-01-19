// Modules
import React from "react";
import { Link, useNavigate } from "react-router-dom";

// Styles
import styles from "./navigation.module.css";
import classnames from "classnames/bind";
const cx = classnames.bind(styles);

const Navigation = () => {
    const navigate = useNavigate();
    const [sCurrentTheme, setCurrentTheme] = React.useState("light");
    React.useEffect(() => {
        let themeMode = window.localStorage.getItem("data-bs-theme");
        if (themeMode !== "light" && themeMode !== "dark") {
            themeMode = "light";
        }
        setCurrentTheme(themeMode);

        $("#searchBoxIcon").click(() => {
            const searchValue = $("#searchBox").val();
            if (searchValue.length >= 2) {
                navigate("/search/" + searchValue.toLowerCase());
                $("#searched_game").hide();
            }
        });
        $("form[role='search']").submit(function (e) {
            e.preventDefault();
            const searchValue = $("#searchBox").val();
            if (searchValue.length < 2) return;
            navigate("/search/" + searchValue.toLowerCase());
            $("#searched_game").hide();
        });
        $("#searchBox").keyup(function (e) {
            if (e.keyCode == 13) return;
            var searchValue = $(this).val();
            if (searchValue.length >= 2) {
                var searchString = searchValue.substring(0, 2).toLowerCase();
                $.getJSON("https://gamecharts.org/data/search/" + searchString + ".json", function (data) {
                    $("#searched_game").show();
                    $("#searched_game").html("");
                    var encontrado = false;
                    var encontrados = 0;

                    $.each(data, function (item, field) {
                        var gameName = field.Name.toLowerCase();
                        var searchGame = gameName.substring(0, searchValue.length).toLowerCase();
                        var searchedGame = searchValue.toLowerCase();

                        if (searchedGame == searchGame) {
                            encontrado = true;
                            encontrados++;
                            var texto = '<div className="item">';
                            texto =
                                texto +
                                '<a style="width: initial;color: #030303; position: static; text-align: right; margin-right: 10px;" href="https://gamecharts.org/' +
                                field.Source +
                                "/" +
                                field.NameSEO +
                                '">';
                            texto = texto + '<img src="' + field.Logo + '" className="item-img" alt="' + field.Name + '">';
                            texto = texto + field.Name + " - ";
                            texto =
                                texto +
                                '<span className="cat" style="border: 1px solid #000;padding: 4px;border-radius: 20px;background: #0A0A0A;font-size: x-small;color:#FAFAFA">' +
                                field.Source +
                                "</span>";
                            texto = texto + "</a></div>";
                            $("#searched_game").append(texto);
                        }

                        if (encontrados > 5) {
                            return false;
                        }
                    });

                    if (!encontrado) {
                        $("#searched_game").html(
                            '<div className="item" style="width:100%; text-align:right; padding-right:10px; height:60px; background-color: #fff; border: 2px solid #000; border-radius: 20px; margin-top:1px;" >Not Games Found</div>'
                        );
                    }
                })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        console.log("error " + textStatus);
                        console.log("incoming Text " + jqXHR.responseText);
                    })
                    .always(function () {});
            } else {
                $("#searched_game").hide();
            }
        });
    }, []);

    const cbSetAppThemeMode = React.useCallback((themeMode) => {
        // document.documentElement.setAttribute("data-bs-theme", themeMode);
        localStorage.setItem("data-bs-theme", themeMode);
        setCurrentTheme(themeMode);
    }, []);

    return (
        <nav className={"navbar navbar-expand-lg navbar-light bg-gradient-green fixed-top"}>
            <Link to={"/"}>
                <img
                    src="https://gamecharts.org/assets/images/logo-1.png"
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
                <ul className="list-unstyled topbar-nav navbar-search">
                    <li className="hide-phone app-search">
                        <form role="search">
                            <input type="text" id="searchBox" placeholder="Search..." className="form-control bg-light-gray" />
                            <i id="searchBoxIcon" className="fas fa-search"></i>
                        </form>
                        <div id="searched_game">
                            <div className="item"> Not Games Found </div>
                        </div>
                    </li>
                </ul>
                <div className="dropdown ml-2">
                    <button type="button" className="btn dropdown-toggle" data-toggle="dropdown">
                        {sCurrentTheme === "light" && <i className="fa fa-sun"></i>}
                        {sCurrentTheme === "dark" && <i className="fa fa-moon"></i>}
                    </button>
                    <div className="dropdown-menu">
                        <a className="dropdown-item" href="#" onClick={() => cbSetAppThemeMode("light")}>
                            <i className="fa fa-sun mr-3"></i>Light
                        </a>
                        <a className="dropdown-item" href="#" onClick={() => cbSetAppThemeMode("dark")}>
                            <i className="fa fa-moon mr-3"></i>Dark
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
