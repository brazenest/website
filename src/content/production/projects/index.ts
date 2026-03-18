import type { ProductionProject } from '~/types/content'
import { bellagioFountainFilmProject } from './bellagio-fountain-film'
import { founderProfileLaunchFilmProject } from './founder-profile-launch-film'
import { nightMarketSocialCampaignProject } from './night-market-social-campaign'

export const productionProjects: ProductionProject[] = [
  {
    ...bellagioFountainFilmProject,
    description:
      'A live-performance short where I translated unpredictable fountain choreography into a clear visual sequence through adaptive coverage and restrained editorial pacing.',
    cardContext: 'Observational short · Director/Shooter/Editor · Live night exterior',
    cardDemonstrates:
      'Coverage strategy under unpredictable timing, low-light framing discipline, and rhythm control in post.',
  },
  {
    ...founderProfileLaunchFilmProject,
    description:
      'A founder-led launch film where I shaped strategy into an interview-driven narrative that balanced message precision with an authentic on-camera voice.',
    cardContext: 'Launch narrative · End-to-end production · Interview direction and edit',
    cardDemonstrates:
      'Story structuring, interview prompting for usable beats, and editorial clarity under timeline pressure.',
  },
  {
    ...nightMarketSocialCampaignProject,
    description:
      'A multi-deliverable campaign package built from one production window, with format-aware coverage and platform-specific pacing across social cutdowns.',
    cardContext: 'Social campaign system · Creative development/production/edit',
    cardDemonstrates:
      'Multi-format framing planning, modular coverage for flexible edits, and consistent mood across outputs.',
  },
]