import RoundedImage from "./RoundedImage";
import Button from "../Button";
import controller from "../../../public/images/bitmap.png";
import Image from "next/image";

function BodyHome() {
  return (
    <div className=" dark bg-[#232323]  flex items-center w-full h-full">
      <div className="flex items-center transition-all duration-500 ease-linear lg:flex-row flex-col w-full h-full dark:bg-[#232323] text-white text-black">
        <div className="flex items-center w-[90%] h-[30rem]">
          <div className="flex flex-col items-center justify-center w-full h-full bg-[#232323] rounded-2xl shadow-[18px_18px_55px_#0e0e0e,-18px_-18px_55px_#383838]">
            <div
              className={`flex flex-col items-center justify-center h-[50%] transition-all`}
            >
              <Image
                className=""
                src={controller}
                alt="Controle"
                width="300"
                height="200"
              ></Image>
            </div>
            <div className="flex flex-col place-content-center justify-self-end bg-[#191919] rounded-b-2xl w-full h-[50%]">
              <h1 className="self-center text-lg font-bold">Tenha controle</h1>
              <h1 className="self-center text-lg font-bold">
                sobre suas finanças
              </h1>
              <Button ClassName="transition-all duration-1000 rounded-full justify-self-center self-center w-[80%] h-[40%] mt-8 p-4 hover:font-bold hover:w-[83%] hover:h-[43%]">
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
