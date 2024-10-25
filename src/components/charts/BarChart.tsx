import React, { useEffect, useRef } from "react";
import {
  Chart,
  registerables,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartConfiguration,
} from "chart.js";

Chart.register(...registerables);

type Props = {
  data: number[];
  labels: string[];
  legend?: {
    display?: boolean;
    position?: "top" | "left" | "right" | "bottom";
    align?: "start" | "center" | "end";
  };
};

const BarChart = ({ data, labels, legend }: Props) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart<"bar", number[], string> | null>(null); // Specify the type for Chart

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");

    // Destroy existing chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    if (ctx) {
      // Create a new chart instance with explicit type
      const config: ChartConfiguration<"bar", number[], string> = {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Data", // Label for the dataset
              data: data,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(255, 255, 255, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              beginAtZero: true,
            },
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              display: legend?.display ?? true, // Use legend display prop or default to true
              position: legend?.position ?? "top", // Use provided position or default to 'top'
              align: legend?.align ?? "center", // Use provided align or default to 'center'
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  const label = tooltipItem.dataset.label || "";
                  const value = tooltipItem.raw || 0;
                  return `${label}: ${value}`;
                },
              },
            },
          },
        },
      };

      chartInstanceRef.current = new Chart(ctx, config);
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data, labels, legend]); // Re-run effect when data, labels, or legend change

  return <canvas ref={chartRef} />;
};

export default BarChart;
