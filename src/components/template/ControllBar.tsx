import { memo } from "react";
import useSheets from "../../data/hook/useSheets";
import Button from "../Button";
import { IconeAjustes } from "../icons/Icones";
interface ControllBarProps {
  handleToggle: () => void;
  handleToggleManageProps: () => void;
  setIsOpen4: (current: boolean) => void;
}
function ControllBar(props: ControllBarProps) {
  const { sheet } = useSheets();
  const { handleToggle, handleToggleManageProps, setIsOpen4 } = props;
  return (
    <div className="flex flex-1 w-full mt-3">
      <div className="flex w-full">
        {sheet.session.canEditItems ? (
          <Button
            ClassName="md:px-4 md:py-1 mt-1 rounded-lg ml-2 dark:text-white w-1/3"
            onClick={handleToggle}
            text="Criar Gasto"
            textClassName="px-4 py-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0085FF] to-[#1400FF] dark:bg-gradient-to-r dark:from-[#00F0FF] dark:to-[#00A5BC]"
          ></Button>
        ) : (
          <></>
        )}
        {sheet.session.canManageSheetProps && (
          <Button
            ClassName="px-2 py-1 mt-1 rounded-lg ml-2 flex justify-center dark:text-white w-1/6"
            onClick={handleToggleManageProps}
            icon={IconeAjustes}
            iconClassName="dark:text-[#00F0FF] text-[#0085FF] mr-1 ml-2"
          ></Button>
        )}
        {sheet.session.authenticated && (
          <Button
            ClassName="px-2 py-1 mt-1 rounded-lg ml-2 flex justify-center dark:text-white w-1/6"
            onClick={() => setIsOpen4(true)}
            text={"Filtrar"}
            iconClassName="dark:text-[#00F0FF] text-[#0085FF] mr-1 ml-2"
          ></Button>
        )}
      </div>
    </div>
  );
}
export default memo(ControllBar);
