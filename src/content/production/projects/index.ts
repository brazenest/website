import type { ProductionProject } from '~/types/content'
import { bellagioFountainFilmProject } from './bellagio-fountain-film'
import { founderProfileLaunchFilmProject } from './founder-profile-launch-film'
import { nightMarketSocialCampaignProject } from './night-market-social-campaign'

export const productionProjects: ProductionProject[] = [
  {
    ...bellagioFountainFilmProject,
    description:
      'A live-performance short built from unpredictable fountain choreography. I developed an adaptive coverage strategy to translate real-time events into a clear visual sequence, using restrained editorial pacing and low-light framing discipline to reveal structure in chaos.',
    cardContext: 'Observational short · Director/Shooter/Editor · Live night exterior',
    cardDemonstrates:
      'Strategic coverage planning under unpredictable timing. Framing discipline in low-light conditions. Rhythm and pacing as narrative tools that reveal structure and intention.',
  },
  {
    ...founderProfileLaunchFilmProject,
    description:
      'A founder-led launch film that shaped strategic messaging into an authentic on-camera narrative. I structured the interview to surface genuine voice while maintaining message precision, balancing authenticity with communication clarity.',
    cardContext: 'Launch narrative · End-to-end production · Interview direction and edit',
    cardDemonstrates:
      'Interview prompting techniques that yield usable narrative beats. Story structure that serves both authenticity and strategic positioning. Editorial judgment under timeline and approval pressure.',
  },
  {
    ...nightMarketSocialCampaignProject,
    description:
      'A multi-format campaign package delivered from a single production window. I designed platform-aware coverage planning and modular editorial approach that allowed one shoot to serve multiple formats while maintaining consistent brand voice and pacing.',
    cardContext: 'Social campaign system · Creative development/production/edit',
    cardDemonstrates:
      'Multi-format content planning and efficient production. Coverage strategy that enables flexible, high-quality edits for each platform. Consistent visual and narrative voice across diverse outputs.',
  },
]