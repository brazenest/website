import { $, Slot, component$, useSignal, useTask$ } from '@builder.io/qwik'
import { Form, globalAction$ } from '@builder.io/qwik-city'
import { SiteMark } from '~/components/brand/SiteMark'
import { Container } from '~/components/ui/Container'
import {
  CONTACT_INQUIRY_TYPES,
  DEFAULT_CONTACT_FORM_VALUES,
  parseContactFormInput,
  type ContactFormFailure,
} from '~/lib/server/contact/contactForm'
import { sendContactInquiry } from '~/lib/server/contact/sendContactInquiry'

const LINK_TEXT_STYLE = {
  fontSize: 'var(--small-size)',
  lineHeight: 'var(--small-leading)',
  letterSpacing: 'var(--small-tracking)',
}

export const useSubmitContactInquiry = globalAction$(async (_, requestEvent) => {
  const formData = (await requestEvent.parseBody()) as Record<string, unknown>

  if (typeof formData.website === 'string' && formData.website.trim().length > 0) {
    return {
      success: true,
    } as const
  }

  const parsed = parseContactFormInput(formData)

  if ('success' in parsed) {
    return parsed
  }

  try {
    await sendContactInquiry(parsed.input)

    return {
      success: true,
    } as const
  } catch (error) {
    requestEvent.sharedMap.set('contact-form-error', error)

    console.error('Contact inquiry send failed', error)

    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    return {
      success: false,
      formError: import.meta.env.DEV
        ? `Contact send failed: ${errorMessage}`
        : 'The inquiry could not be sent right now. Try again in a minute.',
      fieldErrors: {},
      values: parsed.values,
    } satisfies ContactFormFailure
  }
})

export const ContactInquiryModal = component$(
  ({
    triggerLabel,
    triggerVariant = 'primary',
    triggerClass,
    title = 'Send the work context directly.',
    description = 'This form routes through the site directly instead of exposing a public mailto link.',
  }: ContactInquiryModalProps) => {
    const submitContactInquiryAction = useSubmitContactInquiry()
    const actionValue = submitContactInquiryAction.value
    const isOpen = useSignal(false)
    const showSuccessState = useSignal(false)
    const dialogRef = useSignal<HTMLDialogElement>()
    const values = actionValue?.success === false ? actionValue.values : DEFAULT_CONTACT_FORM_VALUES
    const fieldErrors = actionValue?.success === false ? actionValue.fieldErrors : {}

    useTask$(({ track }) => {
      const actionStatus = track(() => submitContactInquiryAction.value?.success)
      const dialog = dialogRef.value

      if (actionStatus === false) {
        isOpen.value = true
        if (dialog && !dialog.open) {
          dialog.showModal()
        }
      }

      if (actionStatus === true) {
        isOpen.value = true
        showSuccessState.value = true
        if (dialog && !dialog.open) {
          dialog.showModal()
        }
      }
    })

    const openModal = $(() => {
      showSuccessState.value = false
      isOpen.value = true
      const dialog = dialogRef.value
      if (dialog && !dialog.open) {
        dialog.showModal()
      }
    })

    const closeModal = $(() => {
      isOpen.value = false
      const dialog = dialogRef.value
      if (dialog?.open) {
        dialog.close()
      }
    })

    return (
      <div class="relative z-20">
        {triggerVariant === 'text-link' ? (
          <button
            type="button"
            onClick$={openModal}
            class={triggerClass ?? 'ui-link inline-flex items-center gap-[var(--stack-gap-sm)] group'}
            style={LINK_TEXT_STYLE}
          >
            <span>{triggerLabel}</span>
            <span
              aria-hidden="true"
              class="transition-transform duration-[var(--motion-duration-quick)] ease-[var(--motion-easing-quick)] motion-reduce:transform-none group-hover:translate-x-0.5"
            >
              →
            </span>
          </button>
        ) : (
          <button
            type="button"
            onClick$={openModal}
            class={getTriggerClass(triggerVariant, triggerClass)}
          >
            {triggerLabel}
          </button>
        )}

        <dialog
          ref={dialogRef}
          onClose$={() => {
            isOpen.value = false
          }}
          onCancel$={() => {
            isOpen.value = false
          }}
          onClick$={(event) => {
            if (event.target === event.currentTarget) {
              isOpen.value = false
              const dialog = dialogRef.value
              if (dialog?.open) {
                dialog.close()
              }
            }
          }}
          class="contact-inquiry-modal m-0 h-full w-full max-h-none max-w-none border-0 bg-transparent p-0"
        >
          <div class="flex min-h-full items-start justify-center overflow-y-auto px-4 pb-4 pt-20 md:px-6 md:pb-6 md:pt-24">
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-form-title"
              aria-describedby="contact-form-description"
              class="relative z-10 flex max-h-[calc(100dvh-6rem)] w-full max-w-3xl flex-col overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--border)] bg-[var(--bg)] shadow-[var(--shadow-elevated)] md:max-h-[calc(100dvh-7rem)]"
            >
              <div class="flex items-start justify-between gap-4 border-b border-[var(--border)] px-5 py-5 md:px-6 md:py-6">
                <div class="flex flex-col gap-2">
                  <p class="ui-meta-label">Project Inquiry</p>
                  <h2 id="contact-form-title" class="text-2xl font-semibold tracking-tight md:text-3xl">
                    {title}
                  </h2>
                  <p id="contact-form-description" class="max-w-[62ch] text-sm leading-6 text-[var(--muted)] md:text-base">
                    {description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick$={closeModal}
                  class="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-subtle)] px-3 py-2 text-sm font-medium text-[var(--fg)] transition-colors duration-[var(--motion-duration-quick)] ease-[var(--motion-easing-quick)] hover:bg-[var(--surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2"
                >
                  Close
                </button>
              </div>

              <div class="overflow-y-auto px-5 py-5 md:px-6 md:py-6">
                {showSuccessState.value ? (
                  <div class="flex flex-col gap-5">
                    <div class="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-4 text-sm leading-6 text-[var(--fg)] md:text-base">
                      Inquiry sent. If the work looks aligned, the follow-up will be direct and specific.
                    </div>

                    <div class="ui-cta-group flex-col items-stretch gap-3 sm:flex-row sm:items-start sm:gap-2">
                      <button type="button" onClick$={closeModal} class="ui-button-link ui-button-link--primary w-full sm:w-auto">
                        Close
                      </button>
                    </div>
                  </div>
                ) : (
                  <Form action={submitContactInquiryAction} class="flex flex-col gap-6">
                    <label class="sr-only" aria-hidden="true">
                      Website
                      <input name="website" type="text" autoComplete="off" tabIndex={-1} />
                    </label>

                    {actionValue?.success === false && actionValue.formError && (
                      <div class="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-3 text-sm leading-6 text-[var(--fg)]">
                        {actionValue.formError}
                      </div>
                    )}

                    <div class="grid gap-5 md:grid-cols-2">
                      <ContactField label="Name" error={fieldErrors.name}>
                        <input name="name" type="text" value={values.name} autoComplete="name" required minLength={2} maxLength={80} class={getContactFieldClass()} />
                      </ContactField>

                      <ContactField label="Email" error={fieldErrors.email}>
                        <input name="email" type="email" value={values.email} autoComplete="email" required class={getContactFieldClass()} />
                      </ContactField>

                      <ContactField label="Organization" error={fieldErrors.company}>
                        <input name="company" type="text" value={values.company} autoComplete="organization" maxLength={120} class={getContactFieldClass()} />
                      </ContactField>

                      <ContactField label="Inquiry Type" error={fieldErrors.inquiryType}>
                        <select name="inquiryType" value={values.inquiryType} class={getContactFieldClass()}>
                          {CONTACT_INQUIRY_TYPES.map((option) => (
                            <option key={option} value={option} selected={values.inquiryType === option}>{option}</option>
                          ))}
                        </select>
                      </ContactField>

                      <ContactField label="Project URL" error={fieldErrors.projectUrl}>
                        <input name="projectUrl" type="url" value={values.projectUrl} placeholder="https://" class={getContactFieldClass()} />
                      </ContactField>

                      <ContactField label="Timeline" error={fieldErrors.timeline}>
                        <input name="timeline" type="text" value={values.timeline} placeholder="Launch window, deadline, or general timing" maxLength={120} class={getContactFieldClass()} />
                      </ContactField>

                      <ContactField label="Message" error={fieldErrors.message} class="md:col-span-2">
                        <textarea name="message" rows={6} required minLength={40} maxLength={5000} class={getContactFieldClass()}>
                          {values.message}
                        </textarea>
                      </ContactField>
                    </div>

                    <div class="flex flex-col gap-3 border-t border-[var(--border)] pt-5 sm:flex-row sm:items-start sm:justify-between">
                      <p class="max-w-[46ch] text-sm leading-6 text-[var(--muted)]">
                        Include the goal, deliverables, constraints, and why the fit makes sense. That is enough for a useful first reply.
                      </p>

                      <div class="ui-cta-group flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-start sm:gap-2">
                        <button type="submit" class="ui-button-link ui-button-link--primary w-full sm:w-auto">
                          Send Inquiry
                        </button>
                        <button type="button" onClick$={closeModal} class="ui-button-link ui-button-link--ghost w-full sm:w-auto">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </div>
            </div>
          </div>
        </dialog>
      </div>
    )
  },
)

const getContactFieldClass = () => {
  return 'rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-3 text-base text-[var(--fg)]'
}

const ContactField = component$(({ label, error, class: className }: ContactFieldProps) => {
  return (
    <label class={className ? `flex flex-col gap-2 text-sm font-medium text-[var(--fg)] ${className}` : 'flex flex-col gap-2 text-sm font-medium text-[var(--fg)]'}>
      <span>{label}</span>
      <Slot />
      {error && <span class="text-sm leading-6 text-[var(--muted)]">{error}</span>}
    </label>
  )
})

function getTriggerClass(variant: ContactInquiryTriggerVariant, className?: string) {
  const baseClass = `ui-button-link ${variant === 'primary'
    ? 'ui-button-link--primary'
    : variant === 'secondary'
      ? 'ui-button-link--secondary'
      : 'ui-button-link--ghost'}`

  return className ? `${baseClass} ${className}` : baseClass
}

type ContactInquiryTriggerVariant = 'primary' | 'secondary' | 'ghost' | 'text-link'

type ContactInquiryModalProps = {
  triggerLabel: string
  triggerVariant?: ContactInquiryTriggerVariant
  triggerClass?: string
  title?: string
  description?: string
}

type ContactFieldProps = {
  label: string
  error?: string
  class?: string
}

export const Footer = component$(() => {
  return (
    <footer class="border-t border-[var(--border)] bg-[var(--surface-subtle)]">
      <Container>
        <div class="grid gap-8 py-10 md:grid-cols-3 md:gap-10 md:py-14">
          <div class="flex flex-col gap-3">
            <a
              href="/"
              class="inline-flex w-fit items-center gap-2 text-base font-semibold tracking-tight transition-colors duration-[var(--motion-duration-quick)] ease-[var(--motion-easing-quick)] hover:text-[var(--muted)] focus-visible:rounded-[var(--radius-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2"
            >
              <SiteMark class="h-7 w-7 shrink-0" />
              <span>Alden Gillespy</span>
            </a>
            <p class="max-w-[28ch] text-sm leading-6 text-[var(--muted)]">
              Software engineering and cinematic production, structured as one practice.
            </p>
          </div>

          <div class="flex flex-col gap-3">
            <p class="text-sm font-semibold tracking-tight">Navigation</p>
            <nav aria-label="Footer" class="flex flex-col gap-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About' },
                { href: '/work', label: 'Work' },
                { href: '/blog', label: 'Blog' },
                { href: '/engineering', label: 'Engineering' },
                { href: '/production', label: 'Production' },
                { href: '/packages', label: 'Packages' },
                { href: '/contact', label: 'Contact' },
                { href: '/resume', label: 'Resume' },
              ].map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  class="rounded-[var(--radius-lg)] text-sm text-[var(--muted)] transition-colors duration-[var(--motion-duration-quick)] ease-[var(--motion-easing-quick)] hover:text-[var(--fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:text-[var(--fg)]"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          <div class="flex flex-col gap-3">
            <p class="text-sm font-semibold tracking-tight">Contact</p>
            <p class="max-w-[30ch] text-sm leading-6 text-[var(--muted)]">
              Engineering work, production inquiries, and selected opportunities.
            </p>
            <div>
              <ContactInquiryModal triggerLabel="Start a project conversation" triggerVariant="text-link" />
            </div>
          </div>
        </div>

        <div class="border-t border-[var(--border)] py-5 text-sm text-[var(--muted)]">
          <p>© {new Date().getFullYear()} Alden Gillespy</p>
        </div>
      </Container>
    </footer>
  )
})
