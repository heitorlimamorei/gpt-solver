import { ClipLoader } from "react-spinners";
import React from "react";
import useAppData from "../../data/hook/useAppData";
interface PacmanLoaderProps {
  isLoading: boolean;
  color?: string;
  size: number;
  className?: string;
}
export default function Cliper(props: PacmanLoaderProps) {
  const { isLoading, size, className } = props;
  const { tema } = useAppData();
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <ClipLoader
        color={tema === "dark" ? "white" : "black"}
        loading={isLoading}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
