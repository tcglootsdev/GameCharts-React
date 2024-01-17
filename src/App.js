// Modules
import React from "react";
import { BrowserRouter } from "react-router-dom";

// Routers
import AppRouter from "./appRouter";

// Components
import Navigation from "./components/navigation";
import Footer from "./components/footer";

const App = () => {
    React.useEffect(() => {
        const initSlimscroll = () => {
            $(".slimscroll").slimscroll({
                height: "auto",
                position: "right",
                size: "7px",
                color: "#9ea5ab",
                wheelStep: 5,
                touchScrollStep: 50,
            });
        };
        const initMetisMenu = () => {
            $(".navbar-toggle").on("click", function (event) {
                $(this).toggleClass("open");
                $("#navigation").slideToggle(400);
            });

            $(".navigation-menu>li").slice(-2).addClass("last-elements");

            $('.navigation-menu li.has-submenu a[href="#"]').on("click", function (e) {
                if ($(window).width() < 992) {
                    e.preventDefault();
                    $(this).parent("li").toggleClass("open").find(".submenu:first").toggleClass("open");
                }
            });
        };
        const initLeftMenuCollapse = () => {
            // Left menu collapse
            $(".button-menu-mobile").on("click", function (event) {
                event.preventDefault();
                $("body").toggleClass("enlarge-menu");
                initSlimscroll();
            });
        };
        const initEnlarge = () => {
            if ($(window).width() < 1023) {
                $("body").addClass("enlarge-menu");
            } else {
                if ($("body").data("keep-enlarged") != true) $("body").removeClass("enlarge-menu");
            }
        };
        const initActiveMenu = () => {
            // === following js will activate the menu in left side bar based on url ====
            $(".navigation-menu a").each(function () {
                var pageUrl = window.location.href.split(/[?#]/)[0];
                if (this.href == pageUrl) {
                    $(this).parent().addClass("active"); // add active to li of the current link
                    $(this).parent().parent().parent().addClass("active"); // add active class to an anchor
                    $(this).parent().parent().parent().parent().parent().addClass("active"); // add active class to an anchor
                }
            });
        };

        initSlimscroll();
        initMetisMenu();
        initLeftMenuCollapse();
        initEnlarge();
        initActiveMenu();

        // $("body").append(
        //     '<div id="cookie_accept_div" style=\'position:fixed; bottom:0; left:0; right:0; height:50; background-color:#e8ca54;vertical-align: middle; font-size: 20px; text-align: center; display:none;\'>We use cookies to ensure you have the best browsing experience on our website. Please read our <a href="https://gamecharts.org/privacy">cookie policy</a> for more information about how we use cookies. <a id="accept_cookie" href="javascript:void(0)">OK</a></div>'
        // );

        //console.log($.cookie("accept_cookie"));
        // if (!$.cookie("accept_cookie")) {
        //     $("#cookie_accept_div").show();
        // }
        // $("#cookie_accept_div a").on("click", function () {
        //     //console.log("clicked");
        //     $.cookie("accept_cookie", true);
        //     $("#cookie_accept_div").hide();
        // });

        // window.dataLayer = window.dataLayer || [];
        // function gtag() {
        //     dataLayer.push(arguments);
        // }
        // gtag("js", new Date());

        // gtag("config", "UA-43282477-5");
    }, []);

    return (
        <React.StrictMode>
            <BrowserRouter>
                <Navigation />
                <AppRouter />
                <Footer />
            </BrowserRouter>
        </React.StrictMode>
    );
};

export default App;
