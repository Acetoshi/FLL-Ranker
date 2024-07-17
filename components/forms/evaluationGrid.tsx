import EvaluationAxis from './evaluationAxis'

// Typescript prop validation
interface EvalAxis {
  title: string;
  subtitle: string;
  firstSubSection: string[];
  secondSubSection: string[];
}

export default function EvaluationGrid({evalAxes}: {evalAxes : EvalAxis[]}) {
  console.log(evalAxes)
  return (
    <form className='max-w-screen-lg'>
      <ul className="evaluation-title grid grid-cols-4 justify-items-center justify-center">
        <li>BEGINNING 1</li>
        <li>DEVELOPING 2</li>
        <li>ACCOMPLISHED 3</li>
        <li>EXCEEDS 4</li>
      </ul>
      {evalAxes.map(evalAxis=>(<EvaluationAxis axis={evalAxis}/>))}
      
    </form>
  );
}
