// -------------------------------------------------------------------------------------------------------------------------------------------
// Dashboard 1 : Chart Init Js
// -------------------------------------------------------------------------------------------------------------------------------------------
$(function () {
  ("use strict");

  // -----------------------------------------------------------------------
  // Our visitor
  // -----------------------------------------------------------------------

  // -----------------------------------------------------------------------
  // Recent orders
  // -----------------------------------------------------------------------

  var option_sales_overview = {
    series: [
      {
        name: "Ample Admin",
        data: [355, 390, 300, 350, 390, 180],
      },
      {
        name: "Pixel Admin",
        data: [280, 250, 325, 215, 250, 310],
      },
    ],

    chart: {
      type: "bar",
      height: 260,
      offsetX: -15,
      toolbar: {
        show: false,
      },
      foreColor: "#adb0bb",
      fontFamily: "DM sans",
      sparkline: {
        enabled: false,
      },
    },
    grid: {
      show: false,
      borderColor: "transparent",
      padding: {
        left: 0,
        right: 0,
        bottom: 0,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "42%",
        endingShape: "rounded",
        borderRadius: 5,
      },
    },

    colors: ["#1e4db7", "#a7e3f4"],
    fill: {
      type: "solid",
      opacity: 1,
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    legend: {
      show: false,
    },
    xaxis: {
      type: "category",
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    },
    yaxis: {
      show: true,
      min: 100,
      max: 400,
      tickAmount: 3,
    },
    stroke: {
      show: true,
      width: 5,
      lineCap: "butt",
      colors: ["transparent"],
    },
    tooltip: {
      theme: "dark",
    },
  };

  var chart_sales_overview = new ApexCharts(
    document.querySelector("#sales-overview"),
    option_sales_overview
  );
  chart_sales_overview.render();

  // -----------------------------------------------------------------------
  // Monthly Sales
  // -----------------------------------------------------------------------
  var option_monthly_sales = {
    series: [
      {
        name: "Monthly Sales",
        data: [35, 60, 30, 55, 40],
      },
    ],

    colors: ["#1a9bfc"],
    fill: {
      colors: "#1a9bfc",
      opacity: 0.05,
      type: "solid",
    },
    chart: {
      type: "area",
      height: 75,
      toolbar: {
        show: false,
      },
      foreColor: "#adb0bb",
      fontFamily: "'DM Sans',sans-serif",
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    legend: {
      show: false,
    },
    stroke: {
      show: true,
      width: 2,
      curve: "smooth",
    },
    tooltip: {
      theme: "dark",
    },
  };

  var chart_monthly_sales = new ApexCharts(
    document.querySelector("#monthly-sales"),
    option_monthly_sales
  );
  chart_monthly_sales.render();

  // -----------------------------------------------------------------------
  // Total Sales
  // -----------------------------------------------------------------------
  var option_total_sales = {
    series: [25, 25, 25, 25],
    labels: ["2021", "2020", "2019", "2018"],
    chart: {
      height: 280,
      type: "donut",
      foreColor: "#adb0bb",
      fontFamily: "DM sans",
    },
    colors: ["#1a9bfc", "#1e4db7", "#fec90f", "#ecf0f2"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
      // position: "bottom",
      // fontSize: "16px",
      // labels: {
      //   colors: ["#777e89"],
      // },
      // markers: {
      //   width: 8,
      //   height: 8,
      // },
    },
    grid: {
      show: false,
      borderColor: "transparent",
      padding: {
        top: 0,
        right: 0,
      },
    },
    stroke: {
      colors: ["transparent"],
    },
    plotOptions: {
      pie: {
        donut: {
          size: "78%",
          background: "transparent",
          labels: {
            show: false,
            name: {
              show: true,
              fontSize: "18px",
              color: undefined,
              offsetY: -10,
            },
            value: {
              show: false,
              color: "#98aab4",
            },
            total: {
              show: false,
              label: "Our Visitors",
              color: "#98aab4",
            },
          },
        },
      },
    },
    tooltip: {
      theme: "dark",
      fillSeriesColor: false,
    },
  };

  var chart_total_sales = new ApexCharts(
    document.querySelector("#total-sales"),
    option_total_sales
  );
  chart_total_sales.render();

  // --------------------------------
  // Weekly Stats
  // --------------------------------

  var weekly_stats_options = {
    series: [
      {
        name: "Weekly Stats",
        data: [40, 60, 50, 65],
      },
    ],
    chart: {
      height: 145,
      type: "area",
      foreColor: "#adb0bb",
      fontFamily: "DM sans",
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    colors: ["#1a9bfc"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "solid",
      opacity: 0.05,
    },
    tooltip: {
      theme: "dark",
    },
    grid: {
      show: false,
      padding: {
        // top: 0,
        right: 0,
        left: 0,
        // bottom: 30,
      },
    },
  };

  var weekly_stats_chart = new ApexCharts(
    document.querySelector("#weekly-stats"),
    weekly_stats_options
  );
  weekly_stats_chart.render();
});
