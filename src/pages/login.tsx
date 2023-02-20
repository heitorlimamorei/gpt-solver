import BodyHome from "../components/home/BodyHome";
import CabecalhoHome from "../components/home/CabecalhoHome";
import useAppData from "../data/hook/useAppData";

function Login() {
    const {tema, alternarTema} = useAppData()
    return (
        <div className={`${tema} w-full dark:bg-[#232323] bg-[#E0E5EC]`}>
            <div className=" w-full pb-10 dark:bg-[#232323] bg-[#E0E5EC] ">
                <CabecalhoHome/>
                <BodyHome/>
            </div>
        </div>    
    );
}

export default Login;