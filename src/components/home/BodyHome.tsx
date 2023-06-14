import Image from "next/image";
import Button from "../Button";
import image from "../../../public/images/landingPageImage.png"
import controller from "../../../public/images/controller.png";
import Passo1 from "../../../public/images/Passo1.png";
import Passo2 from "../../../public/images/Passo2.png";
import Passo3 from "../../../public/images/passo3.png";
import { signIn, useSession } from "next-auth/react"

function BodyHome() {
  return (
    <div className=" dark dark:bg-[#232323]  flex flex-col items-center w-full h-full ">
      <div className="h-[85vh] flex flex-row bg-[#232323] w-full">
          <div className="flex flex-col items-center mt-[15rem]  h-full w-[40%]">
            <div className="ml-[10rem] mb-[5rem]">
              <h1 className=" w-[30rem] text-4xl font-bold text-white">Bem-Vindo ao FinancialController!</h1>
              <p className="w-[30rem] text-white mt-3">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas quae, sint suscipit illo dolores facere pariatur fugiat quis cumque ea voluptas, ipsum quia odio dolorum voluptates itaque autem est nobis.</p>
              <Button
                ClassName="md:w-[13rem] w-[35%] h-[50px] self-start mt-10 font-bold rounded-[41px] transition-all duration-500 ease-linear lg:text-base text-[9px]"
                text="Experimente agora!"
                textClassName="transition-all duration-500 ease-linear text-transparent bg-clip-text bg-gradient-to-r from-[#0085FF] to-[#1400FF] dark:bg-gradient-to-r dark:from-[#00F0FF] dark:to-[#00A5BC]"
              >

              </Button>
            </div>
          </div>
          <div className="ml-[15rem]">
            <Image  alt="Imagem Pagina Inicial" src={image} width={970} height={880}>
            </Image>
          </div>
      </div>
    </div>
  );
}

export default BodyHome;
