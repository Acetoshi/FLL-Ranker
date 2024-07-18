"use client"
import {EvalAxis, EvaluationState} from './interfaces'

export default function EvaluationAxis({ axis, evaluation, setEvaluation }: { axis: EvalAxis, evaluation : EvaluationState, setEvaluation:React.Dispatch<React.SetStateAction<EvaluationState>>}) {
  // TODO a function to get the right part of "evaluation"


  const handleRatingChange = (index: number) => {
    console.log(evaluation.identify[0].score, '  ', index )
    const newEvaluation = structuredClone(evaluation)
    newEvaluation.identify[0].score=index;
    setEvaluation(newEvaluation)
    console.log('clicked', axis.reference)
  }

  return (
    <fieldset>
      <legend className="flex flex-row items-center min-h-16 pl-4">
        <h3>{axis.title}</h3> <p>{` - ${axis.subtitle}`}</p>
      </legend>
      <ul className="grid grid-cols-4 justify-items-center justify-center">
        {axis.firstSubSection.map((el, index) => (
          <li
            key={el}
            className="p-3 w-full flex items-center ps-4 border border-gray-200 dark:border-gray-700"
          >
            <input
              type="radio"
              name={`${axis.title}-1`}
              id={el}
              checked={evaluation.identify[0].score==index+1}
              onChange={()=>handleRatingChange(index+1)}
              value="small"
            />
            <label htmlFor={el} className="ml-2">
              {el}
            </label>
          </li>
        ))}

        <li className="p-3 w-full flex items-center ps-4 border border-gray-200 dark:border-gray-700">
          <input
            type="radio"
            name={`${axis.title}-1`}
            id="size_3"
            value="large"
            checked={evaluation.identify[0].score==4}
            onChange={()=>handleRatingChange(4)}
          />
          <input type="text" />
        </li>
      </ul>
      <ul className="grid grid-cols-4 justify-items-center justify-center">
        {axis.secondSubSection.map((el, index) => (
          <li
            key={el}
            className="p-3 w-full flex items-center ps-4 border border-gray-200 dark:border-gray-700"
          >
            <input
              type="radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              name={`${axis.title}-2`}
              id={el}
              value="small"
            />
            <label htmlFor={el} className="ml-2">
              {el}
            </label>
          </li>
        ))}

        <li className="p-3 w-full flex items-center ps-4 border border-gray-200 dark:border-gray-700">
          <input
            type="radio"
            name={`${axis.title}-2`}
            id="size_3"
            value="large"
          />
          <input type="text" />
        </li>
      </ul>
    </fieldset>
  );
}
