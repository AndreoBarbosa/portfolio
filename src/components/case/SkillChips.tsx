import { skills } from '../../data/sysmed'

export default function SkillChips() {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span
          key={skill}
          className="glass inline-block font-mono text-xs tracking-wide text-muted px-4 py-2 rounded-chip transition-colors duration-200 hover:border-amber/40 hover:text-amber/80"
        >
          {skill}
        </span>
      ))}
    </div>
  )
}
