// Modules
import React from "react";
import { useRouter } from "react-router-dom";
import { Link } from "react-router-dom";

const Navigation = () => {
    React.useEffect(() => {
        window.onload = () => {
            document.getElementById("searchBoxIcon").onclick = function () {
                var value = document.getElementById("searchBox").value;

                if (value.length >= 2) {
                    window.location.href = "https://gamecharts.org/search/" + value.toLowerCase();
                }
            };
        };
        var stores = [];
        var sourceData = $.getJSON("./data/store.json", function (data) {
            $.each(data, function (item, field) {
                stores[field.Store] = field.Splash;
            });
        });

        $("#searchBox").submit(function (e) {
            e.preventDefault();
            //	e.preventDefault();
            var value = $(this).val();
            window.location.href = "https://gamecharts.org/search/" + value.toLowerCase();

            return false;
        });

        $("#searchBox").keydown(function (e) {
            if (e.keyCode == 13) {
                e.preventDefault();
                var value = $(this).val();
                window.location.href = "https://gamecharts.org/search/" + value.toLowerCase();

                return false;
            }
        });

        $("#searchBox").keyup(function () {
            var value = $(this).val();
            if (value.length >= 2) {
                var searchString = value.substring(0, 2).toLowerCase();
                var gameList = $.getJSON("https://gamecharts.org/data/search/" + searchString + ".json", function (data) {
                    $("#searched_game").show();
                    $("#searched_game").html("");
                    var encontrado = false;
                    var encontrados = 0;

                    $.each(data, function (item, field) {
                        var gameName = field.Name.toLowerCase();
                        var searchGame = gameName.substring(0, value.length).toLowerCase();
                        var searchedGame = value.toLowerCase();

                        if (searchedGame == searchGame) {
                            encontrado = true;
                            encontrados++;
                            /*var texto = '<div class="item" style="width:100%; text-align:right; padding-right:10px; height:60px; background-color: #fff; border: 2px solid #000; border-radius: 20px; margin-top:1px;" >';*/
                            var texto = '<div class="item">';
                            //texto = texto + '<a style="top: 0;left: 260px;display: block;height: 0;line-height: 70px;width: initial;text-align: center;color: #a8a8b1; position: static;" href="./' + field.Source + '/' + field.AppId + '">';
                            texto =
                                texto +
                                '<a style="width: initial;color: #030303; position: static; text-align: right; margin-right: 10px;" href="https://gamecharts.org/' +
                                field.Source +
                                "/" +
                                field.NameSEO +
                                '">';
                            texto = texto + '<img src="' + field.Logo + '" class="item-img" alt="' + field.Name + '">';
                            texto = texto + field.Name + " - ";
                            texto =
                                texto +
                                '<span class="cat" style="border: 1px solid #000;padding: 4px;border-radius: 20px;background: #0A0A0A;font-size: x-small;color:#FAFAFA">' +
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
                            '<div class="item" style="width:100%; text-align:right; padding-right:10px; height:60px; background-color: #fff; border: 2px solid #000; border-radius: 20px; margin-top:1px;" >Not Games Found</div>'
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

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-gradient-green fixed-top">
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
                        <form role="search" className="">
                            <input type="text" id="searchBox" placeholder="Search..." className="form-control bg-light-gray" />
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
