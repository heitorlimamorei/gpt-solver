'use client';
import { useSession } from 'next-auth/react';

import SurveyForm from '@/components/survey/SurveyForm';

interface ISurveyProps {
  params: {
    id: string;
  };
}

interface ISurveyFormType {
  anyError: boolean;
  easyToUse: boolean;
  goodAtAll: boolean;
  suggestion: string;
}

const api = 'https://gpt-solver-backend.onrender.com';

export default function Survey(props: ISurveyProps) {
  return (
    <SurveyForm
      title="Pesquisa de satisfação"
      onClose={() => {
        'closed';
      }}
    />
  );
}
