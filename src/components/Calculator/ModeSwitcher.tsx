import { memo } from "react";
import { ImodeComponent } from "../../types/calculatorTypes";
interface ModeSwitcherInterface {
  modeComponents: ImodeComponent[];
  mode: string;
}

const ModeSwitcher = (props: ModeSwitcherInterface) => {
  const { modeComponents, mode } = props;
  const seletedModeComponents = modeComponents.filter((modeCoponent, i) => {
    return modeCoponent.mode === mode;
  });
  return <div className="self-center flex items-center justify-items-center">{seletedModeComponents[0].component}</div>;
};
export default memo(ModeSwitcher);
