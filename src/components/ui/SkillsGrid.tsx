import type { SkillGroup } from "@/types/content";
import { Tag } from "@/components/ui/Tag";

export function SkillsGrid({ groups }: { groups: SkillGroup[] }) {
  return (
    <div className="grid gap-8 sm:grid-cols-3">
      {groups.map((group) => (
        <div key={group.id}>
          <h3 className="mb-3 text-sm font-medium tracking-wide text-muted uppercase">
            {group.label}
          </h3>
          <div className="flex flex-wrap gap-2">
            {group.skills.map((skill) => (
              <Tag key={skill}>{skill}</Tag>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
