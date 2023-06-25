import Image from "next/image";
import Button from "../Button";
import controller from "../../../public/images/controller.png";
import Passo1 from "../../../public/images/Passo1.png";
import Passo2 from "../../../public/images/Passo2.png";
import Passo3 from "../../../public/images/passo3.png";
import { signIn, useSession } from "next-auth/react"

function BodyHome() {
  return (
    <div className=" dark dark:bg-[#232323]  flex flex-col items-center w-full h-full ">
      <div className="flex flex-col items-center transition-all duration-500 ease-linear lg:flex-col  w-full h-full dark:bg-[#232323] bg-[#E0E5EC] dark:text-white text-black">
        <div className="flex flex-col items-center w-[90%] lg:w-[40%] lg:h-[30rem]">
          <div className="flex flex-col md:flex-row md:w-[90vw] items-center justify-center w-full h-full bg-[#232323] rounded-2xl shadow-[10px_10px_30px_#0e0e0e,-10px_-10px_30px_#383838]">
            <div
              className={`flex flex-col items-center justify-center h-[50%] md:h-full md:w-[40%] transition-all`}
            >
              <Image
                className=""
                src={controller}
                alt="Controle"
                width="280"
                height="200"
              ></Image>
            </div>
            <div className="flex flex-col md:h-full place-content-center justify-self-end bg-[#191919] rounded-b-2xl w-full h-[50%]">
              <h1 className="self-center text-lg font-bold">Tenha controle</h1>
              <h1 className="self-center text-lg font-bold">
                sobre suas finanças
              </h1>
              <Button 
              onClick={() => signIn('auth0')}
              ClassName="transition-all duration-1000 md:h-[10%] md:w-[40%] rounded-full justify-self-center self-center w-[80%] h-[40%] mt-8 p-4 hover:font-bold hover:w-[83%] hover:h-[43%]">
                Começar agora
              </Button>
            </div>
          </div>
        </div>
        </div>
    </div>
  );
}

export default BodyHome;
