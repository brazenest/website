import { component$ } from '@builder.io/qwik'
import { LinkText } from './LinkText'

export const TextLink = component$(({ href, label, class: className }: TextLinkProps) => {
  return <LinkText href={href} label={label} showArrow class={className} />
})

type TextLinkProps = {
  href: string
  label: string
  class?: string
}