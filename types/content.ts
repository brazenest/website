export type ImageModel = {
  src: string
  alt: string
  width: number
  height: number
  preload?: boolean
}

export type ImageLinkModel = ImageModel & {
  href: string
}

export type ImageAlign = 'left' | 'right'
