import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

// Disable SSR
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type LineChartProps = {
  series: {
    name: string;
    data: number[];
  }[];
  labels: string[]; // 👈 dynamic x-axis
};

export default function LineChart({ series, labels }: LineChartProps) {
  const options: ApexOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
      zoom: { enabled: false },
      foreColor: "#6b7280",
    },

    stroke: {
      curve: "smooth",
      width: 2,
    },

    colors: ["#01b167"], // 👈 your brand color

    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.35,
        opacityTo: 0.05,
        stops: [0, 100],
      },
    },

    xaxis: {
      categories: labels, // 👈 dynamic labels
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: "#9ca3af",
          fontSize: "12px",
        },
      },
    },

    yaxis: {
      labels: {
        formatter: (value: number) => {
          if (value >= 1000000) return `₦${(value / 1000000).toFixed(1)}M`;
          if (value >= 1000) return `₦${(value / 1000).toFixed(0)}k`;
          return `₦${value}`;
        },
        style: {
          colors: "#9ca3af",
          fontSize: "12px",
        },
      },
    },

    tooltip: {
      theme: "light",
      y: {
        formatter: (value: number) => `₦${value.toLocaleString()}`,
      },
    },

    grid: {
      borderColor: "#f1f5f9",
      strokeDashArray: 4,
    },

    dataLabels: {
      enabled: false,
    },

    legend: {
      show: false, // 👈 cleaner for single series
    },

    markers: {
      size: 4,
      strokeWidth: 0,
      hover: {
        size: 6,
      },
    },
  };

  return <Chart options={options} series={series} type="area" height={320} />;
}
