import { component$ } from '@builder.io/qwik'
import type { StructuredDataObject } from '~/types/seo'

/**
 * Renders one or more structured data objects as JSON-LD script tags.
 *
 * Accepts either a single structured data object or an array of objects,
 * and safely serializes each to JSON for inclusion in the document head.
 *
 * Usage:
 * ```jsx
 * <StructuredData data={buildPersonStructuredData()} />
 * // or multiple:
 * <StructuredData data={[buildPersonStructuredData(), buildWebSiteStructuredData()]} />
 * ```
 */
export const StructuredData = component$<{
	data: StructuredDataObject | StructuredDataObject[]
}>(({ data }) => {
	// Normalize to array
	const dataArray = Array.isArray(data) ? data : [data]

	return (
		<>
			{dataArray.map((item, index) => (
				<script
					key={`structured-data-${index}`}
					type="application/ld+json"
					dangerouslySetInnerHTML={JSON.stringify(item)}
				/>
			))}
		</>
	)
})
