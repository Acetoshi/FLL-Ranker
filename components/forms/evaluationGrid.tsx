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
        comment: data ? data.identify_problem_def_comment : "",
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
        comment: data ? data.iterate_sharing_of_solution_comment : "",
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
    judgePrivateNotes: data ? data.judge_private_notes : "",
  };

  const [evaluation, setEvaluation] = useState<EvaluationState>(initialState);

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const updatedEvaluation = {
      identify_problem_def: evaluation.identify[0].score,
      identify_evidence_of_research: evaluation.identify[1].score,
      identify_problem_def_comment: evaluation.identify[0].comment,
      identify_evidence_of_research_comment: evaluation.identify[1].comment,

      design_project_plan: evaluation.design[0].score,
      design_all_involved: evaluation.design[1].score,
      design_project_plan_comment: evaluation.design[0].comment,
      design_all_involved_comment: evaluation.design[1].comment,

      create_clear_model: evaluation.create[0].score,
      create_explanation_of_innovation: evaluation.create[1].score,
      create_clear_model_comment: evaluation.create[0].comment,
      create_explanation_of_innovation_comment: evaluation.create[1].comment,

      iterate_sharing_of_solution: evaluation.iterate[0].score,
      iterate_evidence_improvement: evaluation.iterate[1].score,
      iterate_sharing_of_solution_comment: evaluation.iterate[0].comment,
      iterate_evidence_improvement_comment: evaluation.iterate[1].comment,

      communicate_explanation_clarity: evaluation.communicate[0].score,
      communicate_pride: evaluation.communicate[1].score,
      communicate_explanation_clarity_comment:
        evaluation.communicate[0].comment,
      communicate_pride_comment: evaluation.communicate[1].comment,

      global_positive_feedback: evaluation.globalPositiveFeedback,
      global_negative_feedback: evaluation.globalNegativeFeedback,

      judge_private_notes: evaluation.judgePrivateNotes,
    };

    const supabase = createClient();

    const { error } = await supabase
      .from("innovation_scoresheet")
      .update(updatedEvaluation)
      .eq("team_id", teamId);

    console.log(error?.code);

    closeModal("dialog-validate");
  };

  // this function validates the content of the form
  function validate(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    // first make sure that all categories actually have been ranked
    if (
      evaluation.identify[0].score &&
      evaluation.identify[1].score &&
      evaluation.design[0].score &&
      evaluation.design[1].score &&
      evaluation.create[0].score &&
      evaluation.create[1].score &&
      evaluation.iterate[0].score &&
      evaluation.iterate[1].score &&
      evaluation.communicate[0].score &&
      evaluation.communicate[1].score &&
      evaluation.globalNegativeFeedback &&
      evaluation.globalPositiveFeedback
    ) {
      // the as HTMLDialogElement is called to enable typescript to build the app
      const dialog = document.getElementById(
        "dialog-validate"
      ) as HTMLDialogElement;

      dialog && dialog.showModal();
    } else {
      // the as HTMLDialogElement is called to enable typescript to build the app
      const dialog = document.getElementById(
        "dialog-incomplete"
      ) as HTMLDialogElement;

      dialog && dialog.showModal();
    }
    console.log(evaluation);
  }

  // this function closes the modal based on its id
  function closeModal(id: string) {
    const dialog = document.getElementById(id) as HTMLDialogElement;
    dialog && dialog.close();
  }

  // This handles changes in the positive and negative feedback text areas
  function handleChange(
    event: React.ChangeEvent<HTMLTextAreaElement>,
    target: string
  ) {
    // created a deep copy of the state
    const newEvaluation = structuredClone(evaluation);

    // update the right state key, depending on the target parameter
    if (target === "positive") {
      newEvaluation.globalPositiveFeedback = event.target.value;
    } else if (target === "negative") {
      newEvaluation.globalNegativeFeedback = event.target.value;
    } else if (target === "private-notes") {
      newEvaluation.judgePrivateNotes = event.target.value;
    }

    // update the state
    setEvaluation(newEvaluation);
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
            <strong>APPRÉCIATION GLOBALE</strong> - Ces commentaires seront
            paratagés aux équipes, soyez bienveillants.
          </p>
        </section>

        <ul className="evaluation-title grid grid-cols-2 justify-items-center justify-center border-t-2 border-black">
          <li className="text-center p-3 flex flex-col w-full border-r-2 border-black w-full min-h-48">
            <p>BON TRAVAIL</p>
            <textarea
              className="h-full"
              placeholder={
                "Quels sont les points positifs que vous avez remarqué ?"
              }
              value={evaluation.globalPositiveFeedback}
              onChange={(e) => handleChange(e, "positive")}
            />
          </li>
          <li className="text-center p-3 flex flex-col w-full">
            <p>PENSEZ A</p>
            <textarea
              className="h-full"
              placeholder={"Qu'est ce que l'équipe peut améliorer ?"}
              value={evaluation.globalNegativeFeedback}
              onChange={(e) => handleChange(e, "negative")}
            />
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
            value={evaluation.judgePrivateNotes}
            onChange={(e) => handleChange(e, "private-notes")}
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
            onClick={() => closeModal("dialog-validate")}
            className="focus:outline-none text-white bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
          >
            {" "}
            RETOUR
          </button>
          <button
            onClick={handleSubmit}
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            {" "}
            VALIDER
          </button>
        </section>
      </dialog>

      <dialog id="dialog-incomplete" className="p-8 rounded-2xl">
        <p className="mb-8">
          L'ensemble des critères d'évaluation doit être renseigné
        </p>
        <section className="flex flex-row justify-center">
          <button
            onClick={() => closeModal("dialog-incomplete")}
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            {" "}
            TERMINER L'EVALUATION
          </button>
        </section>
      </dialog>
    </>
  );
}
