import { AImodels } from '@/types/aimodels';

type modelMapType = {
  [key in AImodels]: { model: string; supplier: string };
};

const modelsMap: modelMapType = {
  'gpt-4o': {
    model: 'gpt-4o-2024-08-06',
    supplier: 'openai',
  },
  'gpt-4o mini': {
    model: 'gpt-4o-mini-2024-07-18',
    supplier: 'openai',
  },
  o1: {
    model: 'o1-preview-2024-09-12',
    supplier: 'openai',
  },
  'o1 mini': {
    model: 'o1-mini-2024-09-12',
    supplier: 'openai',
  },
  'o3 mini': {
    model: 'o3-mini-2025-01-31',
    supplier: 'openai',
  },
};

export default modelsMap;
