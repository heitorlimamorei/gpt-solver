import ButtonDark from "../ButtonDark";
import Image from "next/image";
import { loginIcon } from "../icons/Icones";
import logoWhite from '../../../public/images/logo-no-background.png'
import logoBlack from '../../public/images/logo-no-background-black.png'
import BotaoTema from "../template/BotaoTema";
import useAppData from "../../data/hook/useAppData";

function CabecalhoHome() {
    const {tema, alternarTema} = useAppData()
    return ( 
        <div className={`dark:bg-[#232323] bg-[#E0E5EC] w-[100vw] h-[10vh]`}>
                <header className="items-center w-[100%] h-[10vh]">
                    <div className="flex flex-row items-center  w-[100%] h-[10vh]">
                        <div className="ml-[2rem] self-center"> 
                            <Image src={logoWhite} alt="" width="400" height="50" className=""></Image>
                        </div>
                        <BotaoTema tema={tema} alternarTema={alternarTema} ClassName="dark:ml-[65rem] ml-[65rem]"/>
                        <ButtonDark 
                        icon={loginIcon} 
                        text="Log In / Sign Up"
                        ClassName={`w-[13rem] h-[50px] font-bold rounded-[41px] self-center ml-[5rem]`}
                        iconClassName="dark:text-[#00F0FF] text-[#0085FF] mr-3"
                        textClassName="text-transparent bg-clip-text bg-gradient-to-r from-[#0085FF] to-[#1400FF] dark:bg-gradient-to-r dark:from-[#00F0FF] dark:to-[#00A5BC]"></ButtonDark>
                    </div>
                </header>
            </div>
    );
}

export default CabecalhoHome;