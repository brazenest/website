'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import Select from 'react-select'
import { calculateReadtime } from '@/functions/calculateReadtime'
import { DateSelector } from '@/components/admin/DateSelector'
import { queryApi } from '@/functions/queryApi'
import { SelectDropdownOption } from '@/types/ui'

const ContentEditor = dynamic(() => import('@/components/admin/ContentEditor'), {
	ssr: false,
});

export default function BlogAdminAddArticlePage() {
	const [articleSlug, setArticleSlug] = useState('')
	const [articleSlugIsVirgin, setArticleSlugIsVirgin] = useState(true)
	const [articleTitle, setArticleTitle] = useState('')
	const [articleCategory, setArticleCategory] = useState<SelectDropdownOption | null>(null)
	const [articleExcerpt, setArticleExcerpt] = useState('')
	const [articleDate, setArticleDate] = useState(new Date())
	const [articleBody, setArticleBody] = useState('')

	const handleChangeArticleTitle = (ev) => {
		if (articleSlugIsVirgin) {
			setArticleSlug(ev.target.value
				.replace(/'/g, '')
				.replace(/[^a-zA-Z0-9]/g, '-')
				.replace(/-{2,}/g, '-')
				.replace(/[-]$/, '')
				.toLowerCase()
			)
		}
		setArticleTitle(ev.target.value)
	}
	const handleChangeArticleSlug = (ev) => setArticleSlug(ev.target.value)
	const handleChangeArticleCategory = (newValue) => setArticleCategory(newValue)
	const handleChangeArticleExcerpt = (ev) => setArticleExcerpt(ev.target.value)
	const handleChangeArticleDate = (date) => setArticleDate(new Date(date))

	const handleFormSubmit = (ev) => ev.preventDefault()

	const handleClickSubmit = async () => {
		const data = {
			slug: articleSlug,
			title: articleTitle,
			category: articleCategory!.value,
			excerpt: articleExcerpt,
			date: articleDate.toISOString().split('T')[0],
			readtime: calculateReadtime(articleBody),
			body: articleBody,
		}

		const queryResponse = await queryApi({ endpoint: 'posts', method: 'POST', data })
		if (!queryResponse.ok) {
			console.log('Admin | BlogAdminAddArticlePage(): API response not-ok for adding article |-|', queryResponse.message)
			return
		}

		console.log('Admin | BlogAdminAddArticlePage(): Article added successfully! |-|', queryResponse.data)

		// Reset form
		setArticleSlug('')
		setArticleSlugIsVirgin(true)
		setArticleTitle('')
		setArticleCategory(null)
		setArticleExcerpt('')
		setArticleDate(new Date())
		setArticleBody('')

    // Focus title input after submission
    document.getElementById('blog-admin-add-article-form-input--title')!.focus()
	}

	const options: SelectDropdownOption[] = [
		{ value: 'engineering', label: 'Engineering' },
		{ value: 'cinematic', label: 'Cinematic' },
		{ value: 'process', label: 'Process' },
		{ value: 'other', label: 'Other' },
	]

	return (
		<div className="max-w-6xl mx-auto px-4 py-8">
			<h2 className="text-5xl font-bold mb-10">Add an article</h2>
			<form id="blog-admin-add-article-form" onSubmit={(event) => handleFormSubmit(event)}>
				<div className="max-w-xl my-5 justify-between items-center">
					<span className="grid grid-cols-4 grid-rows-1 my-6 items-center">
						<label htmlFor="title">Title</label>
						<input
							id="blog-admin-add-article-form-input--title"
							type="text"
							name="title"
							size={54}
							tabIndex={1}
							className="col-span-3 p-4 border rounded"
							value={articleTitle}
							onChange={handleChangeArticleTitle}
							autoFocus
						/>
					</span>
					<span className="grid grid-cols-4 grid-rows-1 my-6 items-center">
						<label htmlFor="slug">Slug</label>
						<input
							type="text"
							name="slug"
							size={54}
							tabIndex={2}
							className="col-span-3 p-4 border rounded"
							value={articleSlug}
							onChange={handleChangeArticleSlug}
							onFocus={() => setArticleSlugIsVirgin(false)}
						/>
					</span>
					<span className="grid grid-cols-4 grid-rows-1 my-6 items-center">
						<label htmlFor="category">Category</label>
						<Select<SelectDropdownOption>
							defaultValue={articleCategory}
							onChange={handleChangeArticleCategory}
							options={options}
						/>
            selectedOption = {articleCategory ? articleCategory.value : 'null'}
					</span>
					<span className="grid grid-cols-4 grid-rows-1 my-6 items-center">
						<label htmlFor="excerpt">Excerpt</label>
						<textarea
							name="excerpt"
							rows={4}
							cols={54}
							tabIndex={4}
							className="col-span-3 p-4 border rounded"
							value={articleExcerpt}
							onChange={handleChangeArticleExcerpt}
						/>
					</span>
					<span className="grid grid-cols-4 grid-rows-1 my-6 items-center">
						<label htmlFor="date">Date</label>
						<DateSelector
							value={articleDate}
							handleChange={handleChangeArticleDate}
						/>
					</span>
				</div>
				<ContentEditor
					content={articleBody}
					handleChange={setArticleBody}
				/>
				<button
					type="submit"
					onClick={handleClickSubmit}>
          Submit article
				</button>
			</form>

			<h2 className="text-sm">Usage notes</h2>
			<ul className="list-disc list-inside text-xs">
				<li>For an initial article, as you type into the title field, the slug field will automatically generate an acceptable slug for your article. The autogeneration will cease permanently upon your placing focus on the slug field.</li>
			</ul>
		</div>
	)
}
