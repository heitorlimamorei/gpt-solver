import Layout from '../components/template/Layout';
import { useRouter } from 'next/router';
import {
  CalculatorIconWhite,
  CalculatorIconBlack,
  TableIconWhite,
  TableIconBlack,
} from '../components/icons/Icones';
import useAppData from '../data/hook/useAppData';
import MessagePopup from '../components/MessagePopup';
function Home() {
  const { tema, alternarTema } = useAppData();
  const router = useRouter();
  async function planilhas() {
    router.push('/sheet');
  }
  async function calculadora() {
    router.push('/calculadora');
  }
  return (
    <div className="h-full w-full">
      <Layout titulo="" subtitulo="">
        <div className="flex flex-col lg:flex-row w-full h-[90vh]">
          <MessagePopup />
          <button
            className="flex items-center justify-items-center lg:w-[49.5%] lg:h-full w-full h-[49.5%]"
            onClick={calculadora}
          >
            <div className="w-full flex flex-col items-center justify-items-center">
              <div className="w-fit h-fit">
                <div className="transition-all dark:bg-[#232323] w-fit p-5 dark:shadow-[16px_16px_32px_#0e0e0e,-16px_-16px_32px_#383838] shadow-[16px_16px_32px_#5a5c5e,-16px_-16px_32px_#ffffff] hover:p-10 bg-[#E0E5EC] rounded-full">
                  {tema == 'dark' ? CalculatorIconWhite(6) : CalculatorIconBlack(6)}
                </div>
              </div>

              <div className="dark:bg-[#232323] dark:text-white dark:shadow-[5px_5px_10px_#0e0e0e,-5px_-5px_10px_#383838] shadow-[5px_5px_10px_#5a5c5e,-5px_-5px_10px_#ffffff] w-fit p-2 bg-[#E0E5EC] rounded-full mt-7">
                Calculadora
              </div>
            </div>
          </button>
          <div className="h-[1%] w-full lg:w-[0.2%] lg:h-full dark:bg-white bg-black"></div>
          <button
            className="flex  items-center justify-items-center lg:w-[49.5%] lg:h-full w-full h-[49.5%]"
            onClick={planilhas}
          >
            <div className="w-full flex flex-col items-center justify-items-center">
              <div className="w-fit h-fit">
                <div className="transition-all dark:bg-[#232323] w-fit p-5 dark:shadow-[16px_16px_32px_#0e0e0e,-16px_-16px_32px_#383838] shadow-[16px_16px_32px_#5a5c5e,-16px_-16px_32px_#ffffff] hover:p-10 bg-[#E0E5EC] rounded-full">
                  {tema == 'dark' ? TableIconWhite(6) : TableIconBlack(6)}
                </div>
              </div>

              <div className="dark:bg-[#232323] dark:text-white dark:shadow-[5px_5px_10px_#0e0e0e,-5px_-5px_10px_#383838] shadow-[5px_5px_10px_#5a5c5e,-5px_-5px_10px_#ffffff] w-fit p-2 bg-[#E0E5EC] rounded-full mt-7">
                Planilhas
              </div>
            </div>
          </button>
        </div>
      </Layout>
    </div>
  );
}

export default Home;
