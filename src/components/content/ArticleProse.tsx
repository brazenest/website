import { Slot, component$ } from '@builder.io/qwik'
import { cn } from '~/fns/cn'

export const ArticleProse = component$((props: ArticleProseProps) => {
  const classes = cn(
    'article-prose',
    props.variant === 'compact' ? 'article-prose--compact' : undefined,
    props.class,
  )

  if (props.tag === 'article') {
    return props.html ? (
      <article class={classes} dangerouslySetInnerHTML={props.html} />
    ) : (
      <article class={classes}>
        <Slot />
      </article>
    )
  }

  return props.html ? (
    <div class={classes} dangerouslySetInnerHTML={props.html} />
  ) : (
    <div class={classes}>
      <Slot />
    </div>
  )
})

type ArticleProseProps = {
  class?: string
  html?: string
  tag?: 'article' | 'div'
  variant?: 'default' | 'compact'
}