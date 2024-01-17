import React from "react";

// Styles
import "./search.css";

const search = () => {
    return (
        <>
            <div class="row game-platforms">
                <span class="game-platforms-menu" style="margin-left: 0">
                    {/* <?php
            foreach ($stores as $store) {
                if ($store->Store == $source) {
                    echo('<li><a href="http://gamecharts.local/'.$store->Store.'"><img src="'.$store->Splash.'" alt="'.$store->Store.'"/></a> </li>');
                }
            }
            ?> */}
                </span>
                <span class="search">
                    <a style="color:white" href="http://gamecharts.local/Search">
                        Search
                    </a>
                </span>
                <div class="route-top">
                    <a href="http://gamecharts.local">Home</a>&nbsp;&nbsp;
                    <i class="fas fa-angle-double-right"></i>&nbsp;&nbsp;<a href="#">Search</a>
                </div>
            </div>
            <div class="page-wrapper page-wrapper-img">
                <div class="page-wrapper-inner-add align-items-center position-relative">
                    <div class="container-fluid-add pb-0">
                        <div class="row-add desktop-screen justify-content-center mb-5 pb-3">
                            <div class="col-lg-8-add col-xs-12 game-list">
                                <div class="content-column">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="card">
                                                <div class="card-body">
                                                    {/* <span style="color:#aca5ad;font-size:24px"><?php echo($bytop); ?></span> */}
                                                    <div class="table-responsive">
                                                        <table class="table table-centered table-striped mb-0">
                                                            <thead class="thead-light">
                                                                <tr>
                                                                    <th></th>
                                                                    <th>Name</th>
                                                                    <th>Platform</th>
                                                                    <th class="center">24-hour peak</th>
                                                                    <th class="center">Today</th>
                                                                    <th class="center">Current players</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {/* <?php

                                                if (isset($matching_data) && count($matching_data)) {
                                                    $index = 1 + (25*($page-1));
                                                    foreach ($matching_data as $data) {
                                                        $dataPath = "./data/".$data->Source."/games_seo/".$data->NameSEO."/today.json";
                                                        $today = str_replace(',[0000,0]','',file_get_contents($dataPath));
                                                        $today_data = json_decode($today,true);
                                                        $dataPath = "./data/".$data->Source."/games_seo/".$data->NameSEO."/gamedata.json";
                                                        $gameDataString = str_replace(',[0000,0]','',file_get_contents($dataPath));
                                                        $gameData = json_decode($gameDataString,true);

                                                        $hisArr = [];
                                                        $data->LastCcu = "?";
                                                        $data->Peak24Hours = "?";
                                                        echo "<!--";
                                                        var_dump ($gameData);
                                                        echo "-->";
                                                        if (($today_data !== FALSE) && (count($today_data) > 0)){
                                                            foreach ($today_data as $h) {
                                                                $hisArr[] = (int)$h['Ccu'];
                                                            }
                                                            //$data->LastCcu = number_format($today_data[count($today_data) - 1]['Ccu']);
                                                        }
                                                        if ($gameData !== FALSE){
                                                            $data->LastCcu = $gameData[0]['CurrentCcu'];
                                                            $data->Peak24Hours = $gameData[0]['TopCcu24h'];
                                                        }
                                                        $href = "http://gamecharts.local/".$data->Source."/".$data->NameSEO;
                                                        ?>
                                                        <tr>
                                                            <td><a
                                                                    href="<?php echo $href; ?>"><img
                                                                        src="<?php echo($data->Logo); ?>"
                                                                        alt="<?php echo($data->Name);?>"
                                                                        style="max-width:150px; max-height:70px" /></a>
                                                            </td>
                                                            <td><a class="text-dark" href="<?php echo $href; ?>"><?php echo $data->Name?></a>
                                                            </td>
                                                            </td>
                                                            <td><a href="./<?php echo($data->Source); ?>"><img
                                                                        src="<?php echo($stores[$data->Source]->Splash); ?>"
                                                                        alt="<?php echo($stores[$data->Source]->Store)?>"
                                                                        style="max-width:75px; max-height:30px" /></a>
                                                            </td>


                                                            <td class="center"><?php echo $data->Peak24Hours; ?>
                                                            </td>
                                                            <!-- <td>
                                                                <div id="sparkline2" class="text-center"></div>
                                                            </td> -->
                                                            <td>
                                                                <div class="chart-today text-center"
                                                                     data-series='<?php echo json_encode($hisArr) ?>'>
                                                                </div>

                                                            </td>

                                                            <td class="center" style="color:grey">
                                                                <?php
                                                                echo $data->LastCcu;
                                                                ?>
                                                            </td>
                                                        </tr>
                                                        <?php
                                                    }
                                                } else {
                                                    ?>
                                                    <tr>
                                                        <td colspan="5"> No Results Found </td>
                                                    </tr>

                                                    <?php
                                                }
                                                ?> */}
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
