$(document).ready(function () {
  var sparklineLogin = function () {
    $("#sparkline1").sparkline([5, 6, 2, 8, 9, 4, 7, 10, 11, 12, 10], {
      type: "bar",
      height: "45",
      barWidth: 7,
      barSpacing: 4,
      barColor: "#0bb2fb",
    });

    $("#sparkline2").sparkline([20, 40, 30], {
      type: "pie",
      width: "50",
      height: "45",
      resize: true,
      sliceColors: ["#0b70fb", "#f64e60", "#f1f2f7"],
    });

    $("#sparkline3").sparkline([5, 6, 2, 9, 4, 7, 10, 12], {
      type: "bar",
      height: "164",
      barWidth: "7",
      resize: true,
      barSpacing: "5",
      barColor: "#0b70fb",
    });

    $("#sparkline4").sparkline(
      [0, 23, 43, 35, 44, 45, 56, 37, 40, 45, 56, 7, 10],
      {
        type: "line",
        width: "120",
        height: "45",
        lineColor: "#fb6d9d",
        fillColor: "transparent",
        spotColor: "#fb6d9d",
        minSpotColor: undefined,
        maxSpotColor: undefined,
        highlightSpotColor: undefined,
        highlightLineColor: undefined,
      }
    );

    $("#sparkline5").sparkline([15, 23, 55, 35, 54, 45, 66, 47, 30], {
      type: "line",
      width: "100%",
      height: "160",
      chartRangeMax: 50,
      resize: true,
      lineColor: "#0b70fb",
      fillColor: "rgba(19, 218, 254, 0.3)",
      highlightLineColor: "rgba(0,0,0,.1)",
      highlightSpotColor: "rgba(0,0,0,.2)",
    });

    $("#sparkline5").sparkline([0, 13, 10, 14, 15, 10, 18, 20, 0], {
      type: "line",
      width: "100%",
      height: "160",
      chartRangeMax: 40,
      lineColor: "#f64e60",
      fillColor: "rgba(97, 100, 193, 0.3)",
      composite: true,
      resize: true,
      highlightLineColor: "rgba(0,0,0,.1)",
      highlightSpotColor: "rgba(0,0,0,.2)",
    });
    $("#sparkline6").sparkline([5, 6, 2, 8, 9, 4, 7, 10, 11, 12, 10], {
      type: "bar",
      height: "45",
      barWidth: "7",
      barSpacing: "4",
      barColor: "#0b70fb",
    });
    $("#sparkline7").sparkline([0, 2, 8, 6, 8, 5, 6, 4, 8, 6, 4, 2], {
      type: "line",
      width: "100%",
      height: "50",
      lineColor: "#ffca4a",
      fillColor: "#ffca4a",
      highlightLineColor: "rgba(0, 0, 0, 0.2)",
      highlightSpotColor: "#4f4f4f",
    });
    $("#sparkline8").sparkline([2, 4, 4, 6, 8, 5, 6, 4, 8, 6, 6, 2], {
      type: "line",
      width: "100%",
      height: "50",
      lineColor: "#0bb2fb",
      fillColor: "#0bb2fb",
      maxSpotColor: "#0bb2fb",
      highlightLineColor: "rgba(0, 0, 0, 0.2)",
      highlightSpotColor: "#0bb2fb",
    });
    $("#sparkline9").sparkline([0, 2, 8, 6, 8, 5, 6, 4, 8, 6, 6, 2], {
      type: "line",
      width: "100%",
      height: "50",
      lineColor: "#0b70fb",
      fillColor: "#0b70fb",
      minSpotColor: "#0b70fb",
      maxSpotColor: "#0b70fb",
      highlightLineColor: "rgba(0, 0, 0, 0.2)",
      highlightSpotColor: "#0b70fb",
    });
    $("#sparkline10").sparkline([2, 4, 4, 6, 8, 5, 6, 4, 8, 6, 6, 2], {
      type: "line",
      width: "100%",
      height: "50",
      lineColor: "#f64e60",
      fillColor: "#f64e60",
      maxSpotColor: "#f64e60",
      highlightLineColor: "rgba(0, 0, 0, 0.2)",
      highlightSpotColor: "#f64e60",
    });
    $("#sparkline11").sparkline([20, 40, 30], {
      type: "pie",
      height: "200",
      resize: true,
      sliceColors: ["#0b70fb", "#f64e60", "#f1f2f7"],
    });

    $("#sparkline12").sparkline(
      [5, 6, 2, 8, 9, 4, 7, 10, 11, 12, 10, 4, 7, 10],
      {
        type: "bar",
        height: "200",
        barWidth: 10,
        barSpacing: 7,
        barColor: "#0bb2fb",
      }
    );

    $("#sparkline13").sparkline([5, 6, 2, 9, 4, 7, 10, 12, 4, 7, 10], {
      type: "bar",
      height: "200",
      barWidth: "10",
      resize: true,
      barSpacing: "7",
      barColor: "#0b70fb",
    });
    $("#sparkline13").sparkline([5, 6, 2, 9, 4, 7, 10, 12, 4, 7, 10], {
      type: "line",
      height: "200",
      lineColor: "#0b70fb",
      fillColor: "transparent",
      composite: true,
      highlightLineColor: "rgba(0,0,0,.1)",
      highlightSpotColor: "rgba(0,0,0,.2)",
    });
    $("#sparkline14").sparkline(
      [0, 23, 43, 35, 44, 45, 56, 37, 40, 45, 56, 7, 10],
      {
        type: "line",
        width: "100%",
        height: "200",
        lineColor: "#fff",
        fillColor: "transparent",
        spotColor: "#fff",
        minSpotColor: undefined,
        maxSpotColor: undefined,
        highlightSpotColor: undefined,
        highlightLineColor: undefined,
      }
    );
    $("#sparkline15").sparkline(
      [5, 6, 2, 8, 9, 4, 7, 10, 11, 12, 10, 9, 4, 7],
      {
        type: "bar",
        height: "200",
        barWidth: "10",
        barSpacing: "10",
        barColor: "#0b70fb",
      }
    );
    $("#sparkline16").sparkline([15, 23, 55, 35, 54, 45, 66, 47, 30], {
      type: "line",
      width: "100%",
      height: "200",
      chartRangeMax: 50,
      resize: true,
      lineColor: "#0b70fb",
      fillColor: "rgba(19, 218, 254, 0.3)",
      highlightLineColor: "rgba(0,0,0,.1)",
      highlightSpotColor: "rgba(0,0,0,.2)",
    });

    $("#sparkline16").sparkline([0, 13, 10, 14, 15, 10, 18, 20, 0], {
      type: "line",
      width: "100%",
      height: "200",
      chartRangeMax: 40,
      lineColor: "#f64e60",
      fillColor: "rgba(97, 100, 193, 0.3)",
      composite: true,
      resize: true,
      highlightLineColor: "rgba(0,0,0,.1)",
      highlightSpotColor: "rgba(0,0,0,.2)",
    });

    $("#sparklinedash").sparkline([0, 5, 6, 10, 9, 12, 4, 9], {
      type: "bar",
      height: "30",
      barWidth: "4",
      resize: true,
      barSpacing: "5",
      barColor: "#0bb2fb",
    });
    $("#sparklinedash2").sparkline([0, 5, 6, 10, 9, 12, 4, 9], {
      type: "bar",
      height: "30",
      barWidth: "4",
      resize: true,
      barSpacing: "5",
      barColor: "#7460ee",
    });
    $("#sparklinedash3").sparkline([0, 5, 6, 10, 9, 12, 4, 9], {
      type: "bar",
      height: "30",
      barWidth: "4",
      resize: true,
      barSpacing: "5",
      barColor: "#0b70fb",
    });
    $("#sparklinedash4").sparkline([0, 5, 6, 10, 9, 12, 4, 9], {
      type: "bar",
      height: "30",
      barWidth: "4",
      resize: true,
      barSpacing: "5",
      barColor: "#f64e60",
    });
  };
  var sparkResize;

  $(window).resize(function (e) {
    clearTimeout(sparkResize);
    sparkResize = setTimeout(sparklineLogin, 500);
  });
  sparklineLogin();
});
