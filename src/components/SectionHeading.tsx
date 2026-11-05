export function SectionHeading({ title, description, centered = true }: { title: string; description?: string; centered?: boolean }) {
  return (
    <div className={`section-heading ${centered ? "section-heading-centered" : ""}`}>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
