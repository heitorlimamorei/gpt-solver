import ButtonDark from "../ButtonDark";
import Image from "next/image";
import { loginIcon } from "../icons/Icones";
import logoWhite from '../../../public/images/logo-no-background.png'
import logoBlack from '../../../public/images/logo-no-background-black.png'
import BotaoTema from "../template/BotaoTema";
import useAppData from "../../data/hook/useAppData";

function CabecalhoHome() {
    const {tema, alternarTema} = useAppData()
    return ( 
        <div className={`dark:bg-[#232323] bg-[#E0E5EC] w-full h-[10%]`}>
                <header className="items-center w-full h-[10vh]">
                    <div className="flex flex-row items-center  w-full h-[10vh]">
                        <div className="ml-[2rem]"> 
                            <Image src={tema  === "" ? (logoBlack) : (logoWhite)} alt="" width="400" height="50" className=""></Image>
                        </div>
                        <BotaoTema tema={tema} alternarTema={alternarTema} ClassName=""/>
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