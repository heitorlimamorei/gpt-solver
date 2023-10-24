import React from 'react';
import Layout from '../../components/template/Layout';
import { useState, useEffect } from 'react';
import variaveis from '../../model/variaveis';
import axios from 'axios';
import StatsCard from '../../components/template/StatsCard';
import { StarIcon } from '../../components/icons/Icones';

export default function Stats() {
  const { BASE_URL } = variaveis;
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${BASE_URL}/api/feedback/statistics`);
      setData(JSON.stringify(response.data));
    };
    fetchData();
  }, [BASE_URL]);
  console.log(JSON.parse(data));
  function getContinuedUsing(data) {
    data = JSON.parse(data);
    let continued = data.Percents.continued_usingPercent;
    const arr = [
      { name: 'Continuou', value: +continued.toFixed() },
      { name: 'Não continuou', value: 100 - continued.toFixed() },
    ];
    return arr;
  }
  function getPlanBefore(data) {
    data = JSON.parse(data);
    let planned = data.Percents.did_pan_beforePercent;
    const arr = [
      { name: 'Tinha planejamento', value: +planned.toFixed() },
      { name: 'Não tinha planejamento', value: 100 - planned.toFixed() },
    ];
    return arr;
  }
  function getShared(data) {
    data = JSON.parse(data);
    let shared = data.Percents.appHasBeenSharedPercent;
    const arr = [
      { name: 'Compartilhou', value: +shared.toFixed() },
      { name: 'Não compartilhou', value: 100 - shared.toFixed() },
    ];
    return arr;
  }
  function getRating(data) {
    data = JSON.parse(data);
    return data.Means.starsMean
  }
  return (
    <Layout titulo="default" subtitulo="default">
      <div className="flex flex-col  md:flex-row">
        <div
          className="my-2 mx-4 shrink-0 transition-all duration-500 ease-linear bg-gradient-to-br from-[#FFFFFF] to-[#B8BCC2] dark:from-[#2A2A2A] dark:to-[#1C1C1C] p-3 flex-1 m-1 rounded-lg flex flex-col text-center lg:mb-5 w-full md:w-fit dark:text-white
    shadow-[4.5px_4.5px_40px_#A5A8AD,_-4.5px_-4.5px_40px_#FFFFFF]
    dark:shadow-[8px_8px_3px_#1C1C1C,_-3px_-3px_16px_#2A2A2A]"
        >
             <p className="font-bold justify-self-start">Média de estrelas:</p>
             <div className="flex flex-row text-5xl h-full w-full justify-self-center"><div className='flex w-full justify-center items-center'>{StarIcon(10)} {getRating(data)} </div></div>
        </div>
        <StatsCard data={getContinuedUsing(data)} StatLabel="Continuaram usando o app:"></StatsCard>
        <StatsCard data={getPlanBefore(data)} StatLabel="Tinham planejamento antes:"></StatsCard>
        <StatsCard data={getShared(data)} StatLabel="Compartilharam o app com alguém:"></StatsCard>
      </div>
    </Layout>
  );
}
