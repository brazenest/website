import { AsymmetricLayoutVariant } from "./layout"

export type ActionModel = {
  variant?: ButtonVariant
  text: string
  href?: string
  onClick?: () => void
  isContactAction?: boolean
}

export type ButtonModel = {
  variant: ButtonVariant
  text: string
  link: string
}

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'
export type ButtonSizeStyleMap = {
  [key in ButtonSize]: string
}

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary'
export type ButtonVariantStyleMap = {
  [key in ButtonVariant]: string
}

export type CTAButtonModel = ButtonModel & {}

export type LinkModel = {
  href: string,
  content: string | React.ReactNode,
}

export type CardModel = {
  badge?: BadgeModel
  image?: ImageModel
  heading?: string
  text?: string
  bullets?: ListItemModel[]
  link?: LinkModel
}

export type CardSize = 'sm' | 'md' | 'lg'
export type CardSizeStyleMap = {
  [key in CardSize]: {
    title?: string
    content?: string
  }
}

export type CardLayoutVariant = AsymmetricLayoutVariant | 'default'
export type CardLayoutVariantStyleMap = {
  [key in CardLayoutVariant]: {
    container: string
    first: string
    second: string
  }
}

export type ImageModel = {
  src: string
  alt: string
  width: number
  height: number
}

export type ListItemModel = {
  content: React.ReactNode | string
}

export type ListModel = {
  ordered: boolean
  items: ListItemModel[]
}

export type BadgeModel = {
  icon?: string
  text: string
}

export type TagModel = {
  name: string
  slug?: string
}

export type SelectDropdownOption = {
  value: string,
  label: string,
}
