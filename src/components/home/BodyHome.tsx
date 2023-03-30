import { MoneyIcon, MoneyIconC } from "../icons/Icones";

function BodyHome() {
  return (
    <div className=" w-full lg:h-[81vh] h-full">
      <div className="transition-all duration-500 ease-linear flex lg:flex-row flex-col w-full h-full dark:bg-[#232323] bg-[#E0E5EC] dark:text-white text-black">
        <div className="flex flex-col items-center w-full h-[60%] lg:w-[40%]">
          <h1 className="lg:w-[80%] mt-10 w-full text-5xl px-3 font-bold ">
            Conheça o Financial Controller!
          </h1>
          <p className="text-lg lg:w-[80%] w-full h-fit mt-5 px-5 ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiulgod tempor incididunt ut labore et dolore magna aliqua. Fusce id
            velit ut tortor pretium viverra suspendisse potenti. Eu lobortis
            elementum nibh tellus molestie nunc non blandit massa. Ornare massa
            eget egestas purus viverra accumsan in nisl nisi. Arcu dui vivamus
            arcu felis. Aliquam ultrices sagittis orci a scelerisque purus
            semper eget duis. Consectetur purus ut faucibus pulvinar elementum
            integer enim neque volutpat. Sem viverra aliquet eget sit amet
            tellus cras adipiscing enim. Magna fringilla urna porttitor rhoncus
            dolor. Mauris rhoncus aenean vel elit scelerisque. Eu scelerisque
            felis imperdiet proin fermentum leo vel orci porta. Sem et tortor
            consequat id porta nibh.
            <br />
            <br />
            Velit ut tortor pretium viverra suspendisse potenti. Ut placerat
            orci nulla pellentesque dignissim enim. Ullamcorper malesuada proin
            libero nunc consequat interdum. Cras semper auctor neque vitae
            tempus. Id eu nisl nunc mi ipsum faucibus. Aenean et tortor at
            risus. Tincidunt tortor aliquam nulla facilisi. Enim ut tellus
            elementum sagittis vitae et leo. Consectetur adipiscing elit ut
            aliquam purus sit. Suspendisse interdum consectetur libero id.
          </p>
        </div>
        <div className="w-full h-[50rem] lg:h-[50rem]  lg:w-[60%] flex items-start mt-[3rem] lg:items-center justify-center transition-all duration-500 ease-linear">
          <div className=" rounded-full dark:shadow-[36px_36px_72px_#0e0e0e,-36px_-36px_72px_#383838] 
          shadow-[36px_36px_72px_#5a5c5e,-36px_-36px_72px_#ffffff] bg-gradient-to-lr from-[#caced4] to-[#f0f5fd] dark:from-[#202020] dark:to-[#252525]">
            <div className="hidden lg:flex">{MoneyIcon()}</div>
            <div className=" lg:hidden">{MoneyIconC()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BodyHome;
