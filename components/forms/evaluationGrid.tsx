"use client";
import { useState } from "react";
import EvaluationAxis from "./evaluationAxis";
import { EvalAxis, EvaluationState, EvaluationDB } from "./interfaces";
import { createClient } from "@/utils/supabase/client";


export default function EvaluationGrid({
  evalAxes,
  data,
}: {
  evalAxes: EvalAxis[];
  data: EvaluationDB | null;
}) {
  const initialState: EvaluationState = {
    identify: [
      { score: data && data.identify_problem_def, comment: "" },
      { score: 0, comment: "" },
    ],
    design: [
      { score: 0, comment: "" },
      { score: 0, comment: "" },
    ],
    create: [
      { score: 0, comment: "" },
      { score: 0, comment: "" },
    ],
    iterate: [
      { score: 0, comment: "" },
      { score: 0, comment: "" },
    ],
    communicate: [
      { score: 0, comment: "" },
      { score: 0, comment: "" },
    ],
    global_positive_feedback: "",
    global_negative_feedback: "",
  };

  const [evaluation, setEvaluation] = useState<EvaluationState>(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedEvaluation = {
      identify_problem_def :evaluation.identify[0].score
    }

    const supabase = createClient();

    const { error } = await supabase
      .from("innovation_scoresheet")
      .update(updatedEvaluation)
      .eq('team_id',1);

    console.log(error?.code)

    const response = {};
  };

  return (
    <form className="max-w-screen-lg">
      <ul className="evaluation-title grid grid-cols-4 justify-items-center justify-center">
        <li className="text-center">
          BEGINNING <br />1
        </li>
        <li className="text-center">
          DEVELOPING <br />2
        </li>
        <li className="text-center">
          ACCOMPLISHED <br />3
        </li>
        <li className="text-center">
          EXCEEDS <br />4
        </li>
      </ul>
      {evalAxes.map((evalAxis) => (
        <EvaluationAxis
          axis={evalAxis}
          evaluation={evaluation}
          setEvaluation={setEvaluation}
          key={evalAxis.title}
        />
      ))}
      <button type="submit" onClick={handleSubmit}>
        {" "}
        Submit{" "}
      </button>
    </form>
  );
}
