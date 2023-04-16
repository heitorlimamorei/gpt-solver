export type modeType = 'inss' | 'irpf' | 'juros-compostos' | 'juros-simples' 
export interface ImodeComponent {
    component: React.ReactNode;
    mode: string;
  }