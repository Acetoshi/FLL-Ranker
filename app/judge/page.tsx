import EvaluationGrid from "../../components/forms/evaluationGrid";
// import innovationFormEn from "../formContent/innovationFormEn.json"
import { createClient } from '@/utils/supabase/server';
import { EvalAxis } from "../../components/forms/interfaces";

export default async function judge() {

  const teamId=1;

  const evalAxes: EvalAxis[] = [
    {
      title: "IDENTIFY",
      subtitle: "Team had a clearly defined problem that was well researched.",
      reference: "identify",
      firstSubSection: [
        "Unclear definition of the problem",
        "Partially clear definition of the problem",
        "Clear definition of the problem"
      ],
      secondSubSection: [
        "Minimal evidence of research",
        "Partial evidence of research from one or more sources",
        "Clear, detailed research from a variety of sources"
      ]
    },
    {
      title: "DESIGN",
      subtitle: "Team worked together while creating a project plan and developing their ideas.",
      reference: "design",
      firstSubSection: [
        "Minimal evidence of an effective project plan",
        "Partial evidence of an effective project plan",
        "Clear evidence of an effective project plan"
      ],
      secondSubSection: [
        "Minimal evidence that development process involved all team members",
        "Partial evidence that development process involved all team members",
        "Clear evidence that development process involved all team members"
      ]
    },
    {
      title: "CREATE",
      subtitle: "Team developed an original idea or built on an existing one with a prototype model/drawing to represent their solution.",
      reference: "create",
      firstSubSection: [
        "Minimal explanation of innovation in solution",
        "Simple explanation of innovation in solution",
        "Detailed explanation of innovation in solution"
      ],
      secondSubSection: [
        "Unclear model/drawing that represents the solution",
        "Simple model/drawing that represents the solution",
        "Detailed model/drawing that represents the solution"
      ]
    },
    {
      title: "ITERATE",
      subtitle: "Team shared their ideas with others, collected feedback, and included improvements to their solution.",
      reference: "iterate",
      firstSubSection: [
        "Minimal sharing of their solution with others",
        "Solution shared with at least one person/group",
        "Solution shared with multiple people/groups"
      ],
      secondSubSection: [
        "Minimal evidence of improvements based on feedback",
        "Partial evidence of improvements based on feedback",
        "Clear evidence of improvements based on feedback"
      ]
    },
    {
      title: "COMMUNICATE",
      subtitle: "Team shared an effective presentation of their solution, its impact on others, and celebrated their team’s progress.",
      reference: "communicate",
      firstSubSection: [
        "Unclear explanation of the solution and its potential impact on others",
        "Partially clear explanation of the solution and its potential impact on others",
        "Clear explanation of the solution and its potential impact on others"
      ],
      secondSubSection: [
        "Presentation shows minimal pride or enthusiasm for their work",
        "Presentation shows partial pride or enthusiasm for their work",
        "Presentation clearly shows pride or enthusiasm for their work"
      ]
    }
  ];
  

  const supabase = createClient();
  const { data: evaluationFromDB } = await supabase.from('innovation_scoresheet').select('*').eq('team_id',teamId)

  return (
    <>
      <h1>INNOVATION PROJECT</h1>
      <ul>
        <li>TEAM ID : 1</li>
        <li>TEAM NAME : Collège Saint-Fiacre</li>
        <li>JUDGING ROOM : 1</li>
      </ul>
      <section className="max-w-screen-sm m-8">
      <h2>INSTRUCTIONS</h2>
      <p className="mt-2">
        Teams should communicate to the judges their achievement in each of the
        following criteria. This rubric should be filled out according to the
        Innovation Project presentation. Judges are required to tick one box on
        each separate row to indicate the level the team has achieved. If the
        team EXCEEDS, a short comment in the exceeds column is required
      </p>
      </section>
      <EvaluationGrid evalAxes={evalAxes} data={evaluationFromDB?evaluationFromDB[0]:null} />
       </>
  );
}
