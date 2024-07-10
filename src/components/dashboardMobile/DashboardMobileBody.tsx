import Button from '@/components/Button';
import { ClockIcon, CurrencyIcon } from '@/components/icons/Icons';
import { Sheet } from '@/components/sheetMock';

export default function DashboardMobileBody() {
  return (
    <div className="w-full h-[90%]">
      <div className="m-4 rounded-2xl bg-[#121826] h-[13rem] text-white">
        <div className="bg-green-500 rounded-2xl h-1/2 flex flex-col items-center justify-center">
          <h1 className="text-center text-lg">Seu balanço total</h1>
          <p className="text-center text-4xl font-bold">R$2000,80</p>
        </div>
        <div className="bg-[#121826] h-1/2 rounded-b-2xl flex flex-row justify-between px-6">
          <div className="flex flex-col items-center justify-center">
            <Button className="p-0 mb-1">{CurrencyIcon('#FFFFFF', 8)}</Button>
            <label>Adicionar</label>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Button className="p-0 mb-1">{CurrencyIcon('#FFFFFF', 8)}</Button>
            <label>Adicionar</label>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Button className="p-0 mb-1">{ClockIcon('#FFFFFF', 8)}</Button>
            <label>Histórico</label>
          </div>
        </div>
      </div>
      <div className="h-[70%] overflow-y-hidden py-2 px-4">
        <h1 className="font-bold text-3xl">Últimas atividades</h1>
        <ul>
          {Sheet.map((item: any) => (
            <li
              key={item.id}
              className="h-[5rem] border-x-transparent border-t-gray-200 flex flex-col justify-end">
              <div className="flex flex-row justify-between items-center h-full">
                <div>
                  <h1 className="text-xl font-semibold">{item.name}</h1>
                  <p className="text-gray-500">30/06/2023</p>
                </div>
                <div className="flex items-center">
                  <p
                    className={`text-xl font-bold ${item.value > 0 ? 'text-green-500' : 'text-red-600'}`}>
                    R${item.value > 0 ? item.value : item.value * -1}
                  </p>
                </div>
              </div>
              <span className="h-[2px] w-full flex bg-gray-300"></span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
