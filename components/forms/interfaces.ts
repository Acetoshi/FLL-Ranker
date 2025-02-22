// Typescript prop validation
export interface EvalAxis {
  title: string;
  subtitle: string;
  reference: "identify" | "design" | "create" | "iterate" | "communicate";
  firstSubSection: string[];
  secondSubSection: string[];
}

export interface EvaluationItem {
  score: number | null;
  comment: string;
}

// this is the interface for the evaluation state, inside of the form
export interface EvaluationState {
  identify: EvaluationItem[];
  design: EvaluationItem[];
  create: EvaluationItem[];
  iterate: EvaluationItem[];
  communicate: EvaluationItem[];
  globalPositiveFeedback: string;
  globalNegativeFeedback: string;
  judgePrivateNotes: string;
}

// this is the interface for the data that is fetched from the db
export interface EvaluationDB {
  id: number;
  judging_session_id: number;
  team_id: number;
  identify_problem_def: number | null;
  identify_problem_def_comment: string;
  identify_evidence_of_research: number | null;
  identify_evidence_of_research_comment: string;
  design_project_plan: number | null;
  design_project_plan_comment: string;
  design_all_involved: number | null;
  design_all_involved_comment: string;
  create_clear_model: number | null;
  create_clear_model_comment: string;
  create_explanation_of_innovation: number | null;
  create_explanation_of_innovation_comment: string;
  iterate_sharing_of_solution: number | null;
  iterate_sharing_of_solution_comment: string;
  iterate_evidence_improvement: number | null;
  iterate_evidence_improvement_comment: string;
  communicate_explanation_clarity: number | null;
  communicate_explanation_clarity_comment: string;
  communicate_pride: number | null;
  communicate_pride_comment: string;
  global_positive_feedback: string;
  global_negative_feedback: string;
  judge_private_notes: string;
}
