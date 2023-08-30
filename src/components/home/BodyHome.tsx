import Button from "../Button";
import Image from "next/image";
import homeimage from "../../../public/images/homeimage.png";
import { signIn} from "next-auth/react"


function BodyHome() {
  return (
    <div className="h-[80vh]">
      <div className="flex flex-col lg:flex-row">
        <div className="flex  lg:w-[50%]  h-[80vh] p-[40px] flex-col">
        <div className="lg:hidden">
          <Image src={homeimage} width={800} height={800} alt=""></Image>
        </div>
        <div className="h-full mt-10 flex flex-col justify-center ">
            <h1 className="lg:text-7xl text-2xl font-bold mb-[30px] text-white">
              Bem vindo ao Financial Controller!
            </h1>
            <p className="text-white lg:text-xl">
              Aqui você organiza suas finanças de modo rápido, prático e
              acessível
            </p>
            <Button
              text="Comece agora!"
              onClick={() => signIn('auth0')}
              ClassName={`md:w-[13rem] mt-10 w-[80%] lg:self-start self-center h-[70px] font-bold rounded-[41px] lg:text-base text-[15px]`}
              textClassName="transition-all text-xl duration-500 ease-linear text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#00A5BC] "
            ></Button>
          </div>
        </div>
        <div className="lg:ml-[90px] hidden items-center justify-center lg:flex">
          <Image src={homeimage} width={700} height={700} alt=""></Image>
        </div>
      </div>
    </div>
  );
}

export default BodyHome;
