import type { EngineeringProject } from "~/types/content";
import { andacityBookingSystemProject } from "./andacity-booking-system";
import { ancestryDnaKitActivationProject } from "./ancestry-dna-kit-activation";
import { timeshareSearchRentalsProject } from "./timeshare-search-rentals";

export const engineeringProjects: EngineeringProject[] = [
  {
    ...andacityBookingSystemProject,
    description:
      "Search inputs arrived from users and suppliers in inconsistent formats, creating unpredictable search behavior. I designed a canonical query layer and normalized entity model that kept booking behavior stable as the product expanded and suppliers grew.",
    cardDescriptor:
      "Lead full-stack engineer · Search architecture and data modeling",
    cardHighlight:
      "Canonical contracts eliminated edge-case branching logic. New integrations shipped without rewriting search semantics. Architecture-level decisions made feature work faster and safer.",
  },
  {
    ...timeshareSearchRentalsProject,
    description:
      "Dense listings forced users to compare pricing, dates, amenities, and policies under pressure. I rebuilt the search and listing experience around stable hierarchy, predictable comparison, and resilient handling of variable inventory.",
    cardDescriptor:
      "Frontend/product engineer · Search UX and dense listing systems",
    cardHighlight:
      "Stable card structure made inventory easier to scan and trust. Responsive comparison patterns reduced layout drift. Future offer variation could follow rules instead of one-off exceptions.",
  },
  {
    ...ancestryDnaKitActivationProject,
    description:
      "A sensitive consumer activation flow needed explicit state, predictable validation, and calmer recovery paths. I rebuilt the frontend experience around reusable patterns that could scale without making users feel uncertain.",
    cardDescriptor: "Frontend systems engineer · High-trust activation flow",
    cardHighlight:
      "Clear progress, consistent validation, and reusable UI primitives reduced uncertainty in a high-volume trust-sensitive flow. The system became easier for both users and teams to reason about.",
  },
];
