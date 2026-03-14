import rehypeSanitize from 'rehype-sanitize'
import dynamic from 'next/dynamic'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import { BlogPostBodyModel } from '@/types/blog'

const MDEditor = dynamic(
	() => import("@uiw/react-md-editor"),
	{ ssr: false }
);

export default function ContentEditor({ content, handleChange }: ContentEditorProps) {
	return (
		<div className="content-editor-wrap">
			<MDEditor
				value={content}
				onChange={handleChange}
				previewOptions={{
					rehypePlugins: [[rehypeSanitize]],
				}}
				height={450}
				textareaProps={{ tabIndex: 5 }}
			/>
		</div>
	)
}

type ContentEditorProps = {
  content: BlogPostBodyModel,
  handleChange: (value) => void,
}
