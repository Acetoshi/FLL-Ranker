import EvaluationGrid from "../components/evaluationGrid";

export default function judge() {
  return (
    <main>
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
      <EvaluationGrid />
    </main>
  );
}
