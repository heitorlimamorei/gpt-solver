import BodyHome from "../components/home/BodyHome";
import CabecalhoHome from "../components/home/CabecalhoHome";
import useAppData from "../data/hook/useAppData";

function Login() {
  const { tema, alternarTema } = useAppData();
  return (
    <div className={`dark:bg-[#232323] bg-[#E0E5EC] overflow-y-hidden`}>
      <div className="transition-all duration-500 ease-linear dark:bg-[#232323] bg-[#E0E5EC]">
        <CabecalhoHome tema={tema} alternarTema={alternarTema} />
        <BodyHome />
      </div>
    </div>
  );
}

export default Login;
