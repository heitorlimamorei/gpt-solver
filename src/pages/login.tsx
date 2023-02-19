import ButtonDark from "../components/ButtonDark";
import Image from "next/image";
import { loginIcon } from "../components/icons/Icones";
import logo from '../../public/images/logo-no-background.png'

function Login() {
    return (
        <div className={`bg-[#232323] w-[100vw] h-[100vh]`}>
            <header className="items-center w-[100%] h-[10vh]">
                <div className="flex flex-row w-[100%] h-[10vh]">
                    <div className="ml-[2rem] self-center">
                        <Image src={logo} alt="" width="400" height="50" className=""></Image>
                    </div>

                    <ButtonDark 
                    icon={loginIcon} 
                    text="Log In / Sign Up"
                    ClassName={`w-[13rem] h-[50px] font-bold rounded-[41px] self-center `}
                    iconClassName="text-[#00F0FF] mr-3"
                    textClassName="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#00A5BC]"></ButtonDark>
                </div>
            </header>
        </div>
    );
}

export default Login;