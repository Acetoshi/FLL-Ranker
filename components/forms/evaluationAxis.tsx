"use client";
import { EvalAxis, EvaluationState } from "./interfaces";

export default function EvaluationAxis({
  axis,
  evaluation,
  setEvaluation,
}: {
  axis: EvalAxis;
  evaluation: EvaluationState;
  setEvaluation: React.Dispatch<React.SetStateAction<EvaluationState>>;
}) {

  // This function updates the state based on the rating that was selected
  const handleRatingChange = (index: number, section: number) => {
    const newEvaluation = structuredClone(evaluation);
    newEvaluation[axis.reference][section].score = index;

    // if score isn't 4, no need to comment in the exceed column
    if (index<4) {
      newEvaluation[axis.reference][section].comment = "";
    }

    setEvaluation(newEvaluation);
  };

  // This function updates the state based on the comment that was entered
  const handleTextEdit = (event: React.ChangeEvent<HTMLTextAreaElement>, section: number) => {

    const newEvaluation = structuredClone(evaluation);
    // if there's a comment, the score is necessarily 4
    newEvaluation[axis.reference][section].score = 4;
    newEvaluation[axis.reference][section].comment = event.target.value;
    setEvaluation(newEvaluation);
  }


  return (
    <fieldset>
      <legend className="flex flex-row items-center min-h-16 pl-4 w-full border-t-2 border-black">
        <p>
          <strong>{axis.title}</strong> {` - ${axis.subtitle}`}
        </p>
      </legend>
      <ul className="grid grid-cols-4 justify-items-center justify-center w-full border-t-2 border-black">
        {axis.firstSubSection.map((el, index) => (
          <li
            key={el}
            className="p-3 w-full flex items-center ps-4 border-r-2 border-black"
          >
            <input
              type="radio"
              className="cursor-pointer"
              name={`${axis.title}-1`}
              id={el}
              checked={evaluation[axis.reference][0].score == index + 1}
              onChange={() => handleRatingChange(index + 1, 0)}
            />
            <label htmlFor={el} className="ml-2 cursor-pointer">
              {el}
            </label>
          </li>
        ))}

        <li className="p-3 w-full flex items-center ps-4">
          <input
            type="radio"
            className="cursor-pointer"
            name={`${axis.title}-1`}
            id="size_3"
            checked={evaluation[axis.reference][0].score == 4}
            onChange={() => handleRatingChange(4, 0)}
          />
           <textarea className="w-full h-full ml-4" value={evaluation[axis.reference][0].comment} onChange={e => handleTextEdit(e,0)} placeholder={evaluation[axis.reference][0].score == 4?"Why does the team exceed ?":""}/>
        </li>
      </ul>
      <ul className="grid grid-cols-4 justify-items-center justify-center w-full border-t-2 border-black">
        {axis.secondSubSection.map((el, index) => (
          <li
            key={el}
            className="p-3 w-full flex items-center ps-4 border-r-2 border-black"
          >
            <input
              type="radio"
              className="cursor-pointer"
              name={`${axis.title}-2`}
              id={el}
              checked={evaluation[axis.reference][1].score == index + 1}
              onChange={() => handleRatingChange(index + 1, 1)}
            />
            <label htmlFor={el} className="ml-2 cursor-pointer">
              {el}
            </label>
          </li>
        ))}

        <li className="p-3 w-full flex items-center ps-4">
          <input
            type="radio"
            className="cursor-pointer"
            name={`${axis.title}-2`}
            id="size_3"
            checked={evaluation[axis.reference][1].score == 4}
            onChange={() => handleRatingChange(4, 1)}
          />
          <textarea className="w-full h-full ml-4" value={evaluation[axis.reference][1].comment} onChange={e => handleTextEdit(e,1)} placeholder={evaluation[axis.reference][1].score == 4?"Why does the team exceed ?":""}/>
        </li>
      </ul>
    </fieldset>
  );
}
