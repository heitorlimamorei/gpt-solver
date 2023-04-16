import { useRouter } from "next/router";
import Layout from "../../components/template/Layout";
import { useEffect, useState, useMemo } from "react";
import { modeType, ImodeComponent } from "../../types/calculatorTypes";
import ModeSwitcher from "../../components/Calculator/ModeSwitcher";
import CalculateInss from "../../components/Calculator/CalculateInss";
import CalculateIrpf from "../../components/Calculator/CalculateIrpf";
import CalculateLiquidSalary from "../../components/Calculator/CalculateLiquidSalary";
export default function Calculator() {
  const router = useRouter();
  const [mode, setMode] = useState<modeType>("inss");
  useEffect(() => {
    let currentMode: any = router.query.mode;
    if (currentMode !== undefined && currentMode.length > 0) {
      setMode(currentMode);
    }
  }, [router.query]);
  const modeComponents = useMemo<ImodeComponent[]>(
    () => [
      {
        component: <CalculateInss />,
        mode: "inss",
      },
      {
        component: <CalculateIrpf />,
        mode: "irpf",
      },
      {
        component: <CalculateLiquidSalary />,
        mode: "salario-liquido",
      },
    ],
    []
  );
  return (
    <div className={`h-[500vh] w-[100%]`}>
      <Layout titulo="Ajustes" subtitulo="Faça os an*justes necessarios">
        <ModeSwitcher mode={mode} modeComponents={modeComponents} />
      </Layout>
    </div>
  );
}
