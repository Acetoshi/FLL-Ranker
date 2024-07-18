"use client";
import { useState } from "react";
import EvaluationAxis from "./evaluationAxis";
import { EvalAxis, EvaluationState } from "./interfaces";

const handleSubmit = () => {
  console.info("giscard");
};

export default function EvaluationGrid({ evalAxes }: { evalAxes: EvalAxis[] }) {

  const initialState: EvaluationState = {
    identify: [{ score: 0, comment: '' }, { score: 0, comment: '' }],
    design: [{ score: 0, comment: '' }, { score: 0, comment: '' }],
    create: [{ score: 0, comment: '' }, { score: 0, comment: '' }],
    iterate: [{ score: 0, comment: '' }, { score: 0, comment: '' }],
    communicate: [{ score: 0, comment: '' }, { score: 0, comment: '' }],
    global_positive_feedback: '',
    global_negative_feedback: ''
  };

  const [evaluation, setEvaluation] = useState<EvaluationState>(initialState);

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
        <EvaluationAxis axis={evalAxis} evaluation={evaluation}/>
      ))}
      <button type="submit" onClick={handleSubmit}></button>
    </form>
  );
}
