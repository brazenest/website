import { Page } from "@/components/newton/layout/Page";
import { Card } from "@/components/newton/ui/Card";

export default function AdminIndexPage() {
	return (
		<Page id="admin--index-page">
			<div id="page-inner-wrap" className="max-w-6xl mx-auto px-4 py-8">
				<h1 className="text-5xl font-bold mb-10">Admin Dashboard</h1>
				<p className="text-lg mb-5">Welcome to the admin dashboard. Here you can manage your content and settings.</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Card>
						<h2 className="text-xl font-medium mb-2.5">Pages</h2>
						<ul className="list-disc list-inside">
							<li><a href="/admin/add-article">Add an article</a></li>
						</ul>
					</Card>
					<Card>
						<h2 className="text-xl font-medium mb-2.5">Site Information</h2>
						<ul className="list-disc list-inside">
							<li>Version: 2.1.0</li>
							<li>Last updated: 2026-02-16</li>
						</ul>
					</Card>
				</div>
			</div>
		</Page>
	)
}