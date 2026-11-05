import { Timeline } from "../components/Timeline";
import { career } from "../data/portfolio";

export function CareerSection() {
  return (
    <div id="career">
      <Timeline
        events={career}
        title="Career Journey"
        subtitle="An evolving path of leadership, innovation, and impact"
      />
    </div>
  );
}
