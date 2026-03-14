import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { TechnologyIcon } from "~/components/ui";
import type { TechnologyItem } from "~/lib/content";

type TechnologyItemProps = {
  item: TechnologyItem;
};

export const TechnologyItemComponent = component$<TechnologyItemProps>(({ item }) => {
  return (
    <li class="link-list-item">
      <Link href={item.href ?? "/uses"} class="link-list-label technology-link inline-flex items-center gap-[0.6rem]">
        <span class="technology-link__icons" aria-hidden="true">
          {item.icons.map((icon) => (
            <TechnologyIcon key={`${item.name}-${icon}`} kind={icon} />
          ))}
        </span>
        <span>{item.name}</span>
      </Link>
      <span class="meta-text font-mono">{item.category}</span>
    </li>
  );
});