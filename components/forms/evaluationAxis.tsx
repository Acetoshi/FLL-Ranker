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
  const handleRatingChange = (index: number, section: number) => {
    console.log(evaluation[axis.reference][0].score, "  ", index);
    const newEvaluation = structuredClone(evaluation);
    newEvaluation[axis.reference][section].score = index;
    setEvaluation(newEvaluation);
    console.log("clicked", axis.reference);
  };

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
            name={`${axis.title}-1`}
            id="size_3"
            checked={evaluation[axis.reference][0].score == 4}
            onChange={() => handleRatingChange(4, 0)}
          />
           <textarea className="w-full h-full ml-4" placeholder={evaluation[axis.reference][0].score == 4?"Why does the team exceed ?":""}/>
        </li>
      </ul>
      <ul className="grid grid-cols-4 justify-items-center justify-center w-full border-t-2 border-black">
        {axis.secondSubSection.map((el, index) => (
          <li
            key={el}
            className="p-3 w-full flex items-center ps-4 border-r-2  border-black"
          >
            <input
              type="radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
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
            name={`${axis.title}-2`}
            id="size_3"
            checked={evaluation[axis.reference][1].score == 4}
            onChange={() => handleRatingChange(4, 1)}
          />
          <textarea className="w-full h-full ml-4" placeholder={evaluation[axis.reference][1].score == 4?"Why does the team exceed ?":""}/>
        </li>
      </ul>
    </fieldset>
  );
}
