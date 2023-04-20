import { MoneyIcon, MoneyIconC } from "../icons/Icones";
import Box from "./Box";
import RoundedImage from "./RoundedImage";

function BodyHome() {
  return (
    <div className=" dark flex w-full lg:h-[81vh] h-full">
      <div className="transition-all duration-500 ease-linear flex lg:flex-row flex-col w-full h-full dark:bg-[#232323] bg-[#E0E5EC] dark:text-white text-black">
        <div className="flex flex-col items-center w-full h-[60%] lg:w-[60%]">
          <h1 className="lg:w-[80%] mt-10 w-full text-5xl px-3 font-bold ">
            Conheça o Financial Controller!
          </h1>
          <p className="text-lg lg:w-[80%] w-full h-fit mt-5 px-5 ">
           Você possui controle financeiro ? Se a resposta for não, o Financial controller pode te ajudar a entender para aonde está indo o seu dinheiro.
           O App pode ser usado individualmente ou em equipes para construir controles de gastos completos. O App é 100% gratuito, venha conhecer!
          </p>
        </div>
        <div className="w-full h-[50rem] lg:h-[50rem]  lg:w-[40%] flex  lg:items-center  transition-all duration-500 ease-linear">
        <Box>
          <RoundedImage src="/images/fcmobilescreen.png" alt="Placeholder" />
          </Box>           
        </div>
      </div>
    </div>
  );
}

export default BodyHome;
