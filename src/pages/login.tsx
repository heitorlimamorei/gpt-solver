import BodyHome from "../components/home/BodyHome";
import CabecalhoHome from "../components/home/CabecalhoHome";
import useAppData from "../data/hook/useAppData";

function Login() {
  const { tema, alternarTema } = useAppData();
  return (
    <div className={`w-full h-full bg-[#232323]`}>
      <div className=" w-full h-full transition-all duration-500 ease-linear bg-[#232323] pb-[4.15rem]">
        <CabecalhoHome tema={tema} alternarTema={alternarTema} />
        <BodyHome />
      </div>
    </div>
  );
}

export default Login;
