import { PacmanLoader } from "react-spinners";
import React from "react";
import useAppData from "../../data/hook/useAppData";
interface PacmanLoaderProps {
  isLoading: boolean;
  color?: string;
  size: number;
}
export default function Pacman(props: PacmanLoaderProps) {
  const { isLoading, size } = props;
  const { tema } = useAppData();
  return (
    <div>
      <PacmanLoader
        color={tema === "dark" ? "white" : "black"}
        loading={isLoading}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
