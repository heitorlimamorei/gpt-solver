import { SunIcon, MoonIcon } from "../icons/Icones";
interface BotaTemaProps {
  tema: string;
  alternarTema: () => void;
  ClassName: string;
}
export default function BotaoTema(props: BotaTemaProps) {
  return props.tema === "dark" ? (
    <div
      onClick={props.alternarTema}
      className={`
         w-[6rem] h-[3rem] bg-[#232323] shadow-[inset_31px_31px_61px_#121212,inset_-31px_-31px_61px_#343434] rounded-full flex items-center ${props.ClassName} hover:cursor-pointer transition-all duration-500 ease-linear
        `}
    >
      <div className="dark:bg-[#232323] bg-[#E0E5EC] rounded-full w-9 h-9 ml-1 flex items-center justify-center">
        <div
          className={`
              flex items-center justify-center 
              text-[#FFE600] w-8 h-8 rounded-full
            `}
        >
          {MoonIcon(8)}
        </div>
      </div>
      <div className={`flex items-center justify-center 
        text-[#00F0FF] w-8 h-8 rounded-full ml-5 transition-all duration-500 ease-linear`}>
          {SunIcon(8)}
        </div>
    </div>
  ) : (
    <div
    onClick={props.alternarTema}
    className={`
       w-[6rem] h-[3rem] bg-[#E0E5EC] shadow-[inset_31px_31px_61px_#727578,inset_-31px_-31px_61px_#ffffff] rounded-full flex items-center ${props.ClassName } hover:cursor-pointer transition-all duration-500 ease-linear
      `}
  >
    <div className={`flex items-center ml-1.5 text-[#5344FF] w-8 h-8 rounded-full`}>
        {MoonIcon(8)}
    </div>
    <div className="dark:bg-[#232323] bg-[#E0E5EC] rounded-full w-9 h-9 ml-5 flex items-center justify-center">
      <div className={`flex items-center justify-center text-[#ff8000] w-8 h-8 rounded-full`}>
        {SunIcon(8)}
      </div>
    </div>
    
  </div>
  );
}
