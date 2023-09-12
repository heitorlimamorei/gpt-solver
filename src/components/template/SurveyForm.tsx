import StarsRating from './StarsRating';
import Input from '../input';
import { useState, memo } from 'react';
import Button from '../Button';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import { surveyFeedBackSubmitProps } from '../../types/feedBackTypes';

interface SurveryFormProps {
  title: string;
  onClose: () => void;
  onSubmit: (payload: surveyFeedBackSubmitProps) => Promise<void>;
}

const SurveyForm = (props: SurveryFormProps) => {
  const { title, onClose } = props;
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');
  const [improve, setImprove] = useState<string>('')
  const [didPlanBefore, setDidPlanBefore] = useState<string>(null);
  const [improveManagement, setImproveManagement] = useState<number>(null);
  const [familyUse, setFamilyUse] = useState(null);
  const [continueUse, setContinueUse] = useState(null)

  const handleRating = (newRating: number) => {
    setRating(newRating);
  };

  const handleChange = (event) => {
    setReview(event.target.value);
  };
  const handleImprove = (event) => {
    setImprove(event.target.value)
  }

  const handleSubmit = async () => {
    if (!review && !!didPlanBefore && !!improveManagement && rating === 0 && !improve && !!familyUse && !!continueUse) return;

    const did_pan_before = didPlanBefore == 'Sim' ? true : false;
    const family_recomendation = familyReomendadtion == 'Sim' ? true : false
    const continue_use = continueUse == 'Sim' ? true : false

    await props.onSubmit({
      stars: rating,
      text: review,
      improvement: improve,
      family_used: family_recomendation,
      continued_using: continue_use,
      did_pan_before,
      financial_management_improved: improveManagement,
    });

    onClose();
  };
  console.log(improve)
  return (
    <div className="flex items-center flex-col w-full h-full">
      <div className="flex items-center justify-center">
        <h1 className="dark:text-gray-100 font-bold mt-4 md:text-2xl">{title}</h1>
      </div>
      <div className="flex flex-col item">
        <div
          className="max-w-xl  mx-auto  my-10 p-10 bg-[#E0E5EC] dark:bg-[#232323] rounded-xl dark:shadow-[12px_12px_32px_#0f0f0f,-12px_-12px_32px_#373737]
        shadow-[12px_12px_32px_#5e6063,-12px_-12px_32px_#ffffff] dark:text-white"
        >
          <div className="mb-6">
            <StarsRating onRating={handleRating} totalStars={5} />
          </div>
          <div className="mb-1">
            <MultipleChoiceQuestion
              question="Já fez planejamento financeiro antes ?"
              options={['Sim', 'não']}
              handleOptionChange={setDidPlanBefore}
            />
          </div>
          <div className="mb-3">
            <MultipleChoiceQuestion
              question="De 0 a 10, quanto você acha que o app te ajudou a planejar melhor suas finanças?"
              options={[0, 2, 5, 8, 10]}
              handleOptionChange={setImproveManagement}
            />
          </div>
            <div>
              <MultipleChoiceQuestion
                question="Você adicionou pessoas da familia à sua planilha?"
                options={['Sim', 'Não']}
                handleOptionChange={setFamilyUse}
              />
            </div>
            <div>
              <MultipleChoiceQuestion 
              question='Você continuou utilizando o app após o período de experiência?'
              options={['Sim', 'Não']}
              handleOptionChange={setContinueUse}/>
            </div>
            <div>
              <MultipleChoiceQuestion 
              question='Você continuou utilizando o app após o período de experiência?'
              options={['Sim', 'Não']}
              handleOptionChange={setContinueUse}/>
            </div>
            <div className="mt-1">
            <label htmlFor="review">
              Escreva uma avaliação sobre o que você achou do app para ajudar-nos a melhorar!
            </label>
            <div className="mt-3">
              <Input
                id="review"
                name="review"
                type="text"
                value={review}
                placeholder="Sua review aqui!"
                onChange={handleChange}
              />
            </div>
            <div className="mt-1">
            <label htmlFor="review">
              Quais pontos você acha que devemos melhorar?
            </label>
            <div className="mt-3">
              <Input
                id="improve"
                name="improve"
                type="text"
                value={improve}
                placeholder="Sua sugestão aqui!"
                onChange={handleImprove}
              />
            </div>
            </div>
          </div>
          <div className="flex mt-3 justify-between">
            <Button
              ClassName="px-4 py-1 rounded-md mr-5"
              onClick={handleSubmit}
              text="Enviar"
              textClassName="px-4 py-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0085FF] to-[#1400FF] dark:bg-gradient-to-r dark:from-[#00F0FF] dark:to-[#00A5BC]"
              iconClassName={''}
              icon={undefined}
            ></Button>
            <Button
              ClassName="px-4 py-1 rounded-md"
              onClick={onClose}
              text="Fechar"
              textClassName="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff0000] to-[#ff5252] dark:bg-gradient-to-r dark:from-[#ff0000] dark:to-[#ff5252]"
              iconClassName={''}
              icon={undefined}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(SurveyForm);
