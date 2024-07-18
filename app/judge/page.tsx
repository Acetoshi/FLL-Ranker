import EvaluationGrid from "../../components/forms/evaluationGrid";
import innovationFormEn from "../formContent/innovationFormEn.json"
import { createClient } from '@/utils/supabase/server';

export default async function judge() {

  const supabase = createClient();
  const { data: evaluation } = await supabase.from('innovation_scoresheet').select('*')
  console.info(evaluation)



  return (
    <>
      <h1>INNOVATION PROJECT</h1>
      <ul>
        <li>TEAM ID : 1</li>
        <li>TEAM NAME : Collège Saint-Fiacre</li>
        <li>JUDGING ROOM : 1</li>
      </ul>

      <h2>INSTRUCTIONS</h2>
      <p>
        Teams should communicate to the judges their achievement in each of the
        following criteria. This rubric should be filled out according to the
        Innovation Project presentation. Judges are required to tick one box on
        each separate row to indicate the level the team has achieved. If the
        team EXCEEDS, a short comment in the exceeds column is required
      </p>
      <EvaluationGrid evalAxes={innovationFormEn}/>
      <input type='text' defaultValue={evaluation?evaluation[0].global_positive_feedback:"couldn't fetch data"}></input>
    </>
  );
}
