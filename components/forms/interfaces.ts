// Typescript prop validation
export interface EvalAxis {
    title: string;
    subtitle: string;
    firstSubSection: string[];
    secondSubSection: string[];
  }

  export interface EvaluationItem {
    score: number;
    comment: string;
  }
  
  export interface EvaluationState {
    identify: EvaluationItem[];
    design: EvaluationItem[];
    create: EvaluationItem[];
    iterate: EvaluationItem[];
    communicate: EvaluationItem[];
    global_positive_feedback: string;
    global_negative_feedback: string;
  }