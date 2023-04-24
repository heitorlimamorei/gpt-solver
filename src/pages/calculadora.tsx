import Layout from "../components/template/Layout";
import OpcaoCalculo from "../components/OpcaoCalculo";
function Calculadora() {
  return (
    <Layout titulo="" subtitulo="">
      <div className="dark:text-white mt-5 h-[85.5vh]">
        <h1 className="text-2xl font-bold">Escolha o cálculo desejado!</h1>
        <div className="flex flex-col lg:flex-row mt-5">
        <OpcaoCalculo url="inss" name="INSS"></OpcaoCalculo>
        <OpcaoCalculo url="irpf" name="Imposto de Renda"></OpcaoCalculo>
        <OpcaoCalculo url="salario-liquido" name="Salário Líquido"></OpcaoCalculo>
        </div>
      </div>
    </Layout>
  );
}

export default Calculadora;
