import ButtonDark from "../ButtonDark";
import Image from "next/image";
import { loginIcon } from "../icons/Icones";
import logoWhite from "../../../public/images/logo-no-background.png";
import logoBlack from "../../../public/images/logo-no-background-black.png";
import BotaoTema from "../template/BotaoTema";
import useAppData from "../../data/hook/useAppData";
import iconWhite from "../../../public/images/icon-white-no-bg.png";
import iconBlack from "../../../public/images/icon-black-no-bg.png";

function CabecalhoHome(props) {
  const { tema, alternarTema } = props;
  return (
    <div
      className={`dark:bg-[#232323] bg-[#E0E5EC] w-full h-[10vh] transition-all duration-500 ease-linear lg:mb-5`}
    >
      <header className="flex items-center w-full h-[10vh]">
        <div className="flex flex-row items-center justify-start h-full w-full">
          <div className="ml-[4rem] w-[30%] hidden lg:flex">
            <Image
              src={tema === "dark" ? logoWhite : logoBlack}
              alt=""
              width="500"
              height="65"
              className=""
            ></Image>
          </div>
          <div className="ml-3 mt-8 lg:hidden">
            <Image
              src={tema === "dark" ? iconWhite : iconBlack}
              alt=""
              width="150"
              height="100"
              className=""
            ></Image>
          </div>
          <div className="flex flex-row w-full mt-8 justify-end items-center">
            <BotaoTema tema={tema} alternarTema={alternarTema} ClassName="" />
            <ButtonDark
              icon={loginIcon}
              text="Log In / Sign Up"
              ClassName={`md:w-[13rem] w-[35%] h-[50px] font-bold rounded-[41px] self-center ml-3 lg:ml-[5rem] transition-all duration-500 ease-linear lg:mr-7 mr-3 lg:text-base text-[9px]`}
              iconClassName="dark:text-[#00F0FF] text-[#0085FF] mr-1 ml-2"
              textClassName="transition-all duration-500 ease-linear text-transparent bg-clip-text bg-gradient-to-r from-[#0085FF] to-[#1400FF] dark:bg-gradient-to-r dark:from-[#00F0FF] dark:to-[#00A5BC]"
            ></ButtonDark>
          </div>
        </div>
      </header>
    </div>
  );
}

export default CabecalhoHome;
