// -------------------------------------------------------------------------------------------------------------------------------------------
// Dashboard 2 : Chart Init Js
// -------------------------------------------------------------------------------------------------------------------------------------------
$(function () {
  ("use strict");

  // -----------------------------------------------------------------------
  // Products Performance
  // -----------------------------------------------------------------------
  var option_be_side = {
    series: [
      {
        name: "Products Performance",
        data: [35, 60, 30, 55, 40],
      },
    ],

    colors: ["#1a9bfc"],
    chart: {
      height: 30,
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

  var chart_be_side = new ApexCharts(
    document.querySelector("#budget-expence-side-chart"),
    option_be_side
  );
  chart_be_side.render();

  // -----------------------------------------------------------------------
  // Products performance
  // -----------------------------------------------------------------------

  var option_product_performance = {
    series: [
      {
        name: "Expence",
        data: [300, 300, 180, 320, 250, 300, 300],
      },
      {
        name: "Budget",
        data: [60, 90, 80, 60, 70, 100, 80],
      },
    ],

    chart: {
      type: "bar",
      height: 265,
      stacked: true,
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
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        borderRadius: 9,
      },
    },
    colors: ["#1e4db7", "#fec90f"],
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
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: true,
      min: 100,
      max: 400,
      tickAmount: 3,
    },
    stroke: {
      show: true,
      curve: "smooth",
      width: 5,
      lineCap: "round",
      colors: ["white"],
    },
    tooltip: {
      theme: "dark",
    },
  };

  var chart_product_performance = new ApexCharts(
    document.querySelector("#product-performance"),
    option_product_performance
  );
  chart_product_performance.render();

  // --------------------------------
  // Yearly Sales
  // --------------------------------

  var option_yearly_sales = {
    series: [25, 25, 25, 25],
    labels: ["2021", "2020", "2019", "2018"],
    chart: {
      height: 145,
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
          size: "65%",
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

  var chart_yearly_sales = new ApexCharts(
    document.querySelector("#yearly-sales"),
    option_yearly_sales
  );
  chart_yearly_sales.render();

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
