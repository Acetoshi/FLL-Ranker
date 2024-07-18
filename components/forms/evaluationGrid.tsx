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
        <li className='text-center'>BEGINNING <br/>1</li>
        <li className='text-center'>DEVELOPING <br/>2</li>
        <li className='text-center'>ACCOMPLISHED <br/>3</li>
        <li className='text-center'>EXCEEDS <br/>4</li>
      </ul>
      {evalAxes.map(evalAxis=>(<EvaluationAxis axis={evalAxis}/>))}
      
    </form>
  );
}
