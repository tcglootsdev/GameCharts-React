import React from "react";

const Dashboard = () => {
    return (
        <>
            <div className="row game-platforms">
                <span className="supported-platforms col-12 col-md-3 text-center">Supported Platforms</span>
            </div>

            <div className="page-wrapper page-wrapper-img">
                <div className="page-wrapper-inner-add align-items-center position-relative">
                    <div className="container-fluid-add px-0">
                        <div className="row-add desktop-screen justify-content-center mb-5 pb-3" style={{ display: "none" }}>
                            <div className="col-lg-8-add colxs-12 game-list ">
                                <div className="desktop-ads-column-left"></div>
                                <div className="desktop-ads-column-right"></div>
                                <div className="content-column">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="card">
                                                <div className="card-header bg-gradient-grey">
                                                    <div className="row justify-content-between">
                                                        <h3 className="h5 font-secondary text-uppercase m-0">Trending Games</h3>
                                                        <h4 className="h5 font-secondary text-uppercase text-white m-0">By CurrentPlayers</h4>
                                                    </div>
                                                </div>
                                                <div className="card-body p-0">
                                                    <div className="table-responsive">
                                                        <table className="table table-centered mb-0">
                                                            <thead className="thead-light">
                                                                <tr>
                                                                    <th>Name</th>
                                                                    <th>Platform</th>
                                                                    <th className="text-center">24-hour Change</th>
                                                                    <th className="text-center">Today</th>
                                                                    <th className="text-center">Current Players</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody></tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12">
                                            <div id="trending_game_slider" className="trending_game_slider"></div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12">
                                            <div className="card">
                                                <div className="card-header bg-gradient-grey">
                                                    <div className="row justify-content-between">
                                                        <h3 className="h5 font-secondary text-uppercase m-0">Top Games</h3>
                                                        <h4 className="h5 font-secondary text-uppercase text-white m-0">By Current Players</h4>
                                                    </div>
                                                </div>
                                                <div className="card-body p-0">
                                                    <div className="table-responsive">
                                                        <table className="table table-centered mb-0">
                                                            <thead className="thead-light">
                                                                <tr>
                                                                    <th></th>
                                                                    <th>Name</th>
                                                                    <th>Platform</th>
                                                                    <th className="text-center">Current Players</th>
                                                                    <th className="text-center">24-hour peak</th>
                                                                    <th className="text-center">30-days peak</th>
                                                                    <th className="text-center">Peak Players</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody></tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12">
                                            <div id="top_game_slider" className="top_game_slider"></div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="card">
                                                <div className="card-header bg-gradient-grey">
                                                    <div className="row justify-content-between">
                                                        <h3 className="h5 font-secondary text-uppercase m-0">Trending Games</h3>
                                                        <h4 className="h5 font-secondary text-uppercase text-white m-0">By Average Players</h4>
                                                    </div>
                                                </div>
                                                <div className="card-body p-0">
                                                    <div className="table-responsive">
                                                        <table className="table table-centered mb-0">
                                                            <thead className="thead-light">
                                                                <tr>
                                                                    <th>Name</th>
                                                                    <th>Platform</th>
                                                                    <th className="text-center">24-hour Change</th>
                                                                    <th className="text-center">Today</th>
                                                                    <th className="text-center">Current Players</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody></tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12">
                                            <div id="trending_game_average_slider" className="trending_game_slider"></div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="card">
                                                <div className="card-header bg-gradient-grey">
                                                    <div className="row justify-content-between">
                                                        <h3 className="h5 font-secondary text-uppercase m-0">Top Games</h3>
                                                        <h4 className="h5 font-secondary text-uppercase text-white m-0">By Average Players</h4>
                                                    </div>
                                                </div>
                                                <div className="card-body p-0">
                                                    <div className="table-responsive">
                                                        <table className="table table-centered mb-0">
                                                            <thead className="thead-light">
                                                                <tr>
                                                                    <th></th>
                                                                    <th>Name</th>
                                                                    <th>Platform</th>
                                                                    <th className="text-center">Average Players</th>
                                                                    <th className="text-center">24-hour Average</th>
                                                                    <th className="text-center">30-days Average</th>
                                                                    <th className="text-center">Max Average Players</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody></tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div id="top_game_average_slider" className="top_game_slider"></div>
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

export default Dashboard;
