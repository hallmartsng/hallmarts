"use client";
import React from "react";

interface DashboardHeaderProps {
  header: string;
  subHeader: string;
}
const DashboardHeader = ({ header, subHeader }: DashboardHeaderProps) => {
  return (
    <div>
      <h4 className="font-semibold text-lg">Welcome {header} 👋</h4>
      <p className="text-sm">{subHeader}</p>
    </div>
  );
};

export default DashboardHeader;
