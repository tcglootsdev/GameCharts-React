export const todayChartOptions = {
    chart: {
        type: "line",

        sparkline: {
            enabled: true,
        },
    },
    stroke: {
        width: 2,
        curve: "smooth",
    },
    markers: {
        size: 0,
    },
    colors: ["#2b6228"],
    tooltip: {
        fixed: {
            enabled: false,
        },
        x: {
            show: false,
        },
        y: {
            title: {
                formatter: function (seriesName) {
                    return "";
                },
            },
        },
        marker: {
            show: false,
        },
    },
};
