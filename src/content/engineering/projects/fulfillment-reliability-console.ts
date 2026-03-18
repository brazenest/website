import type { EngineeringProject } from '~/types/content'

export const fulfillmentReliabilityConsoleProject: EngineeringProject = {
  id: 'fulfillment-reliability-console',
  title: 'Fulfillment Reliability Console',
  slug: 'fulfillment-reliability-console',
  description:
    'An internal reliability console that unified queue telemetry, replay tooling, and incident context so operations and engineering could diagnose and recover failures quickly.',
  techStack: ['Qwik', 'TypeScript', 'Kafka', 'Redis', 'PostgreSQL'],
  sections: [
    {
      title: 'Overview',
      content:
        'This system was built for teams operating order and fulfillment pipelines where failures span asynchronous services. The goal was to make reliability work actionable in one interface instead of scattered across logs, dashboards, and ad-hoc scripts.',
    },
    {
      title: 'Problem Space',
      content:
        'When events failed or stalled, diagnosis depended on tribal knowledge and manual correlation across multiple tools. That increased incident response time, created inconsistent remediation steps, and raised the risk of duplicate downstream actions during recovery.',
    },
    {
      title: 'Role and Scope',
      content:
        'I led architecture and implementation for event correlation, triage workflows, and safe replay controls. I worked with operations and platform teams to define reliability signals, failure classifications, and guardrails for high-risk recovery actions.',
    },
    {
      title: 'System Design Decisions',
      content:
        'I designed a timeline model that stitched queue events, service responses, and manual interventions into a single incident context. Replay operations were gated by idempotency checks and scoped permissions so recovery tooling improved speed without compromising data integrity.',
    },
    {
      title: 'Implementation Complexity',
      content:
        'The difficult part was presenting live reliability state without overloading users with noise. I implemented event aggregation and prioritization rules, predictable filtering semantics, and UI states that made failure mode transitions clear during high-pressure debugging sessions.',
    },
    {
      title: 'Why It Mattered',
      content:
        'The console reduced diagnosis time and made incident handling repeatable across teams. More importantly, it shifted reliability from reactive heroics to an explicit engineering capability supported by durable system controls.',
    },
  ],
  seo: {
    title: 'Fulfillment Reliability Console',
    description:
      'Engineering case study for a reliability console focused on event correlation, safe replay tooling, and scalable incident response workflows.',
  },
}
