export type SectionWidth = 'default' | 'wide' | 'full'
export type SectionWidthClassMap = {
  [key in SectionWidth]: string
}

export type PageTitleAlignClassMap = {
  [key in PageTitleAlign]: {
    title: string
    subtitle: string
  }
}

export type PageTitleAlign = 'left' | 'center'

export type HeroSectionAlignClassMap = {
  [key in HeroSectionAlign]: {
    actionsWrap: string
  }
}

export type HeroSectionAlign = 'left' | 'center'

export type AsymmetricLayoutVariant = 'two-thirds-left' | 'two-thirds-right'
export type AsymmetricLayoutVariantStyleMap = {
  [key in AsymmetricLayoutVariant]: {
    container: string
    first: string
    second: string
  }
}

export type CardListType = 'ul' | 'div'
