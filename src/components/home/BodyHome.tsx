import { MoneyIcon, MoneyIconC } from "../icons/Icones";
import Box from "./Box";
import Image from "next/image";
import Button from "../Button";
import controller from "../../../public/images/controller.png";
import RoundedImage from "./RoundedImage";
import Passo1 from "../../../public/images/passo1.png";
import Passo2 from "../../../public/images/passo2.png";
import Passo3 from "../../../public/images/passo3.png";
import { signIn, useSession } from "next-auth/react"

function BodyHome() {
  return (
    <div className=" dark dark:bg-[#232323]  flex flex-col items-center w-full h-full ">
      <div className="flex flex-col items-center transition-all duration-500 ease-linear lg:flex-col  w-full h-full dark:bg-[#232323] bg-[#E0E5EC] dark:text-white text-black">
        <div className="flex flex-col items-center w-[90%] lg:w-[40%] lg:h-[30rem]">
          <div className="flex flex-col items-center justify-center w-full h-full bg-[#232323] rounded-2xl shadow-[10px_10px_30px_#0e0e0e,-10px_-10px_30px_#383838]">
            <div
              className={`flex flex-col items-center justify-center h-[50%] transition-all`}
            >
              <Image
                className=""
                src={controller}
                alt="Controle"
                width="280"
                height="200"
              ></Image>
            </div>
            <div className="flex flex-col place-content-center justify-self-end bg-[#191919] rounded-b-2xl w-full h-[50%]">
              <h1 className="self-center text-lg font-bold">Tenha controle</h1>
              <h1 className="self-center text-lg font-bold">
                sobre suas finanças
              </h1>
              <Button 
              onClick={() => signIn('auth0')}
              ClassName="transition-all duration-1000 rounded-full justify-self-center self-center w-[80%] h-[40%] mt-8 p-4 hover:font-bold hover:w-[83%] hover:h-[43%]">
                Começar agora
              </Button>
            </div>
          </div>
        </div>
        <h1 className="text-3xl mx-5  my-10 self-start font-extrabold">
            Ajuste suas finanças em apenas 3 passos!
        </h1>
        <div className="my-10 flex flex-col lg:flex-row  items-center">
          <div className="h-[15rem] w-[90%] lg:w-[30%] mx-5 bg-[#232323] shadow-[10px_10px_30px_#0e0e0e,-10px_-10px_30px_#383838]  rounded-2xl p-5">
            <h3 className="font-bold text-lg ">
              Escolha entre Calculadora e Planilhas
            </h3>
            <Image
              className=""
              src={Passo1}
              alt="Planilhas ou Calculadora"
              width="600"
              height="195"
            ></Image>
          </div>
          <div className="h-[15rem] w-[90%] lg:w-[30%] mx-5 bg-[#232323] shadow-[10px_10px_30px_#0e0e0e,-10px_-10px_30px_#383838]  rounded-2xl p-5">
            <h3 className="font-bold text-lg ">Crie uma Planilha</h3>
            <Image
              className=""
              src={Passo2}
              alt="Botão de criar planilha"
              width="600"
              height="195"
            ></Image>
          </div>
          <div className="h-[15rem] w-[90%] lg:w-[30%]  mx-5 bg-[#232323] shadow-[10px_10px_30px_#0e0e0e,-10px_-10px_30px_#383838]  rounded-2xl p-5">
            <h3 className="font-bold text-lg ">Crie seu primeiro gasto</h3>
            <Image
              className=""
              src={Passo3}
              alt="Botão de criar planilha"
              width="600"
              height="195"
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BodyHome;
