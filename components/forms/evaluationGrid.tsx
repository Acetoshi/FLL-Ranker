"use client";
import { useState } from "react";
import EvaluationAxis from "./evaluationAxis";
import { EvalAxis, EvaluationState, EvaluationDB } from "./interfaces";
import { createClient } from "@/utils/supabase/client";

export default function EvaluationGrid({
  evalAxes,
  data,
  teamId,
}: {
  evalAxes: EvalAxis[];
  data: EvaluationDB | null;
  teamId: number;
}) {
  const initialState: EvaluationState = {
    identify: [
      {
        score: data && data.identify_problem_def,
        comment: data ? data.identify_problem_comment : "",
      },
      {
        score: data && data.identify_evidence_of_research,
        comment: data ? data.identify_evidence_of_research_comment : "",
      },
    ],
    design: [
      {
        score: data && data.design_project_plan,
        comment: data ? data.design_project_plan_comment : "",
      },
      {
        score: data && data.design_all_involved,
        comment: data ? data.design_all_involved_comment : "",
      },
    ],
    create: [
      {
        score: data && data.create_clear_model,
        comment: data ? data.create_clear_model_comment : "",
      },
      {
        score: data && data.create_explanation_of_innovation,
        comment: data ? data.create_explanation_of_innovation_comment : "",
      },
    ],
    iterate: [
      {
        score: data && data.iterate_sharing_of_solution,
        comment: data ? data.iterate_sharing_of_solution_coment : "",
      },
      {
        score: data && data.iterate_evidence_improvement,
        comment: data ? data.iterate_evidence_improvement_comment : "",
      },
    ],
    communicate: [
      {
        score: data && data.communicate_explanation_clarity,
        comment: data ? data.communicate_explanation_clarity_comment : "",
      },
      {
        score: data && data.communicate_pride,
        comment: data ? data.communicate_pride_comment : "",
      },
    ],
    globalPositiveFeedback: data ? data.global_positive_feedback : "",
    globalNegativeFeedback: data ? data.global_negative_feedback : "",
  };

  const [evaluation, setEvaluation] = useState<EvaluationState>(initialState);

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const updatedEvaluation = {
      identify_problem_def: evaluation.identify[0].score,
      identify_evidence_of_research: evaluation.identify[1].score,

      design_project_plan: evaluation.design[0].score,
      design_all_involved: evaluation.design[1].score,

      create_clear_model: evaluation.create[0].score,
      create_explanation_of_innovation: evaluation.create[1].score,

      iterate_sharing_of_solution: evaluation.iterate[0].score,
      iterate_evidence_improvement: evaluation.iterate[1].score,

      communicate_explanation_clarity: evaluation.communicate[0].score,
      communicate_pride: evaluation.communicate[1].score,
    };

    const supabase = createClient();

    const { error } = await supabase
      .from("innovation_scoresheet")
      .update(updatedEvaluation)
      .eq("team_id", teamId);

    console.log(error?.code);

    closeModal();
  };

  // this function validates the content of the form
  function validate(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    // the as HTMLDialogElement is called to enable typescript to build the app
    const dialog = document.getElementById(
      "dialog-validate"
    ) as HTMLDialogElement;
    e.preventDefault();
    dialog && dialog.showModal();
  }

  // this function closes the modal
  function closeModal() {
    const dialog = document.getElementById(
      "dialog-validate"
    ) as HTMLDialogElement;
    dialog && dialog.close();
  }

  return (
    <>
      <form className="max-w-screen-lg border-2 border-black rounded-2xl">
        <ul className="evaluation-title grid grid-cols-4 justify-items-center justify-center">
          <li className="text-center p-3 border-r-2  border-black w-full">
            <strong>BEGINNING</strong> <br />1
          </li>
          <li className="text-center p-3 border-r-2  border-black w-full">
            <strong>DEVELLOPPING</strong> <br />2
          </li>
          <li className="text-center p-3 border-r-2  border-black w-full">
            <strong>ACCOMPLISHED</strong>
            <br />3
          </li>
          <li className="text-center p-3">
            <strong>EXCEEDS</strong> <br />4
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

        <section className="flex flex-row items-center min-h-16 pl-4 w-full border-t-2 border-black">
          <p>
            <strong>APPRÉCIATION GLOBALE</strong> - ces commentaires seront
            paratagés aux équipes, soyez bienveillants.
          </p>
        </section>

        <ul className="evaluation-title grid grid-cols-2 justify-items-center justify-center border-t-2 border-black">
          <li className="text-center p-3 flex flex-col w-full border-r-2 border-black w-full min-h-48">
            <p>BON TRAVAIL</p>
            <textarea className="h-full" placeholder={"jimmy"} />
          </li>
          <li className="text-center p-3 flex flex-col w-full">
            <p>PENSEZ A</p>
            <textarea className="h-full" placeholder={"jimmy"} />
          </li>
        </ul>

        <section className="flex flex-row items-center min-h-16 pl-4 w-full border-t-2 border-black">
          <p>
            <strong>NOTES JURY</strong> - ces notes ne seront pas partagées aux
            équipes
          </p>
        </section>

        <section className="flex flex-col p-3 items-center min-h-16 w-full border-t-2 border-black min-h-48">
          <textarea
            className="w-full min-h-48"
            placeholder={
              "Notez quelque chose pour vous souvenir de l'équipe, un point d'hésitation sur l'évaluation ?"
            }
          />
        </section>
      </form>
      <button
        type="submit"
        onClick={validate}
        className="m-8 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
      >
        Submit
      </button>
      <dialog id="dialog-validate" className="p-8 rounded-2xl">
        <p className="mb-8">Confirmer la feuille de score ?</p>
        <section className="flex flex-row justify-between">
          <button
            onClick={closeModal}
            className="focus:outline-none text-white bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
          >
            {" "}
            RETOUR
          </button>
          <button
            onClick={handleSubmit}
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
          >
            {" "}
            VALIDER
          </button>
        </section>
      </dialog>
    </>
  );
}
