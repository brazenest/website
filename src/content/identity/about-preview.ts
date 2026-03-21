import type { AboutPreviewContent } from '~/types/content'

export const aboutPreviewContent: AboutPreviewContent = {
  eyebrow: 'About Alden',
  heading: 'Why the Work Splits in Two',
  paragraphs: [
    'My work is multidisciplinary by necessity, not branding. I build software for real production environments, shape product architecture, and also plan, shoot, and edit visual pieces where timing, coverage, and story have to hold up under constraints.',
    'The overlap matters: engineering sharpens systems thinking, reliability, and tool design; production sharpens judgment, sequencing, and audience awareness. The About page explains the background, the working method, and how those two practices reinforce each other across the projects on this site.',
  ],
  links: [
    {
      label: 'Read More',
      href: '/about',
      variant: 'secondary',
    },
    {
      label: 'View Engineering Work',
      href: '/engineering',
      variant: 'primary',
    },
    {
      label: 'View Production Work',
      href: '/production',
      variant: 'ghost',
    },
  ],
}
