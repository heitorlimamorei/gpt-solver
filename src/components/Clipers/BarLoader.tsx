import { BarLoader } from "react-spinners";
import React from "react";
import useAppData from "../../data/hook/useAppData";
interface PacmanLoaderProps {
  isLoading: boolean;
  color?: string;
}
export default function BarCLiper(props: PacmanLoaderProps) {
  const { isLoading } = props;
  const { tema } = useAppData();
  return (
    <div className="flex justify-center items-center">
      <BarLoader
        color={tema === "dark" ? "white" : "black"}
        loading={isLoading}
        height={5}
        width={300}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
