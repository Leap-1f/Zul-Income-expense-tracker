import React, { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarController,
  DoughnutController,
  ArcElement,
} from "chart.js";

// Register the components and elements
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarController, // Register the BarController
  DoughnutController, // Register the DoughnutController
  ArcElement // Register the ArcElement
);

const BarChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    chartInstance.current = new ChartJS(ctx, {
      type: "bar",
      data: {
        labels: ["Jan", "Feb", "Mar", "April", "May", "June"],
        datasets: [
          {
            label: "Income",
            data: [52, 40, 62, 45, 20, 52],
            backgroundColor: "rgb(132, 204, 22)",
            borderRadius: 20,
          },
          {
            label: "Expense",
            data: [32, 22, 32, 45, 10, 60],
            backgroundColor: "rgb(249, 115, 22)",
            borderRadius: 20,
          },
        ],
      },
      scales: {
        x: {
          display: false, // Hide the x-axis labels
        },
        y: {
          display: true, // Keep the y-axis labels visible
        },
      },
      //  options: {
      //    plugins: {
      //      title: {
      //        text: 'Revenue Source',
      //      },
      //    },
      //  },
      options: {
        plugins: {
          legend: {
            display: false, // Hide the legend labels
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return <canvas ref={chartRef} />;
};

const DoughnutChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    chartInstance.current = new ChartJS(ctx, {
      type: "doughnut",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
        datasets: [
          {
            label: "My First Dataset",
            data: [150, 70, 100, 90, 40],
            backgroundColor: [
              "rgb(28, 100, 242)",
              "rgb(242, 144, 28)",
              "rgb(22, 189, 202)",
              "rgb(253, 187, 140)",
              "rgb(231, 70, 148)",
            ],
          },
        ],
      },
      scales: {
        x: {
          display: false, // Hide the x-axis labels
        },
        y: {
          display: true, // Keep the y-axis labels visible
        },
      },
      options: {
        plugins: {
          legend: {
            position: "right", // Position the legend to the left of the chart
          },
          labels: {
            //   boxWidth: 80, // Adjust the width of the legend box
            //   boxHeight: 80, // Adjust the height of the legend box
            //   //   borderRadius: 40, // Make the legend box rounded
            //   topLeft: 40,
            //   topRight: 40,
            //   bottomLeft: 40,
            //   bottomRight: 40,
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return <canvas ref={chartRef} />;
};

export { BarChart, DoughnutChart };
