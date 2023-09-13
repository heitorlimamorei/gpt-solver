import StarsRating from './StarsRating';
import Input from '../input';
import { useState, memo, useCallback } from 'react';
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
  const [featuresImprovement, setFeaturesImprovement] = useState<string>('');
  const [didPlanBefore, setDidPlanBefore] = useState<string>(null);
  const [improveManagement, setImproveManagement] = useState<number>(null);
  const [appHasBeenShared, setAppHasBeenShared] = useState<string>(null);
  const [continueUse, setContinueUse] = useState<string>(null);

  const handleRating = useCallback((newRating: number) => {
    setRating(newRating);
  }, []);

  const handleChange = useCallback((event) => {
    setReview(event.target.value);
  }, []);

  const handleImprove = useCallback((event) => {
    setFeaturesImprovement(event.target.value);
  }, []);

  const handleDidPlanBeforeChange = useCallback((c: string) => {
    setDidPlanBefore(c);
  }, []);

  const handleimproveManagementChange = useCallback((c: number) => {
    setImproveManagement(c);
  }, []);

  const handleappHasBeenSharedChange = useCallback((c: string) => {
    setAppHasBeenShared(c);
  }, []);

  const handleappcontinueUseChange = useCallback((c: string) => {
    setContinueUse(c);
  }, []);

  const handleSubmit = async () => {
    if (
      !review &&
      !!didPlanBefore &&
      !!improveManagement &&
      rating === 0 &&
      !featuresImprovement &&
      !!appHasBeenShared &&
      !!continueUse
    )
      return;

    const did_pan_before = didPlanBefore == 'Sim' ? true : false;
    const family_recomendation = appHasBeenShared == 'Sim' ? true : false;
    const continue_use = continueUse == 'Sim' ? true : false;

    await props.onSubmit({
      stars: rating,
      text: review,
      featuresImprovement: featuresImprovement,
      appHasBeenShared: family_recomendation,
      continued_using: continue_use,
      did_pan_before,
      financial_management_improved: improveManagement,
    });

    onClose();
  };

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
              selectedOption={didPlanBefore}
              question="Já fez planejamento financeiro antes ?"
              options={['Sim', 'não']}
              handleOptionChange={handleDidPlanBeforeChange}
            />
          </div>
          <div className="mb-3">
            <MultipleChoiceQuestion
              selectedOption={improveManagement}
              question="De 0 a 10, quanto você acha que o app te ajudou a planejar melhor suas finanças?"
              options={[0, 2, 5, 8, 10]}
              handleOptionChange={handleimproveManagementChange}
            />
          </div>
          <div className="mb-3">
            <MultipleChoiceQuestion
              selectedOption={appHasBeenShared}
              question="Você já indicou a plataforma a alguem ?"
              options={['Sim', 'Não']}
              handleOptionChange={handleappHasBeenSharedChange}
            />
          </div>
          <div className="mb-3">
            <MultipleChoiceQuestion
              selectedOption={continueUse}
              question="Você continuou utilizando o app após o período de experiência?"
              options={['Sim', 'Não']}
              handleOptionChange={handleappcontinueUseChange}
            />
          </div>
          <div className="mt-1">
            <label htmlFor="review">Quais pontos você acha que devemos melhorar?</label>
            <div className="mt-3">
              <Input
                id="improve"
                name="improve"
                type="text"
                value={featuresImprovement}
                placeholder="Sua sugestão aqui!"
                onChange={handleImprove}
              />
            </div>
          </div>
          <div className="my-6">
            <label htmlFor="review">
              Escreva uma avaliação geral sobre o que você achou do app.
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
