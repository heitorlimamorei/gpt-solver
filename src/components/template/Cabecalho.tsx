import BotaoTema from './BotaoTema'
import useAppData from '../../data/hook/useAppData';
import Avatar from './AvatarUsuario';
import Image from 'next/image';
import logoWhite from "../../../public/images/logo-no-background.png";
import logoBlack from "../../../public/images/logo-no-background-black.png";
import iconWhite from "../../../public/images/icon-white-no-bg.png";
import iconBlack from "../../../public/images/icon-black-no-bg.png";
import Button from '../Button';
interface CabecalhoProps {
    children?: any;
}
export default function Cabecalho(props:CabecalhoProps){
    const {tema, alternarTema} = useAppData()
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
              width="90"
              height="60"
              className=""
            ></Image>
          </div>
          <div className="flex flex-row w-full mt-8 justify-end items-center">
            <BotaoTema tema={tema} alternarTema={alternarTema} ClassName="mr-5 w-[6rem]" />
            <Avatar
                className='dark:shadow-[11px_11px_16px_#1e1e1e,-11px_-11px_16px_#282828]
                shadow-[11px_11px_16px_#bec3c9,-11px_-11px_16px_#ffffff]
                transition-all duration-500 ease-linear
                mr-8'
            />
          </div>
        </div>
      </header>
    </div>
    )
}