import NextImage from 'next/image'
import { Page } from '@/components/newton/layout/Page'
import { Card } from '@/components/newton/ui/Card'
import { Panel } from '@/components/newton/layout/Panel'
import { Section } from '@/components/newton/layout/Section'
import { ActionModel } from '@/types/ui'
import { HeroSection } from '@/components/newton/HeroSection'
import { ContactCTASection } from '@/components/newton/contact/ContactCTASection'
import { SectionHeading } from '@/components/newton/layout/SectionHeading'
import { BlogLatestPosts } from '@/components/newton/BlogLatestPosts'
import { AsymmetricLayout } from '@/components/newton/layout/AsymmetricLayout'
import { CardList } from '@/components/newton/layout/CardList'

export default function HomePage() {

	const heroActions: ActionModel[] = [
		{
			variant: 'primary',
			text: 'Contact Me',
			isContactAction: true,
		},
		{
			variant: 'secondary',
			text: 'Learn About Me',
			href: '/about',
		},
	]

	const closingCtaActions: ActionModel[] = [
		{
			variant: 'secondary',
			text: 'Learn About Me',
			href: '/about',
		},
	]

	return (
		<Page id="home-page">


			<HeroSection
				backgroundImage={{
					src: "/assets/images/home-page/hero-engineering-dark-2.png",
					alt: "Some swirls of shades of blue mixed with light, infused with tech influenced shapes pointing toward the middle.",
					width: 1024,
					height: 1024,
				}}
				title="I build interfaces with product-grade engineering and cinematic polish."
				subtitle="Full-stack software engineer, web designer, and video producer — bridging resilient systems with visuals that feel intentional."
				actions={heroActions}
				pageTitleClassName="text-gray-200"
				subtitleClassName="text-blue-300 dark:text-sky-300"
			/>


			<Section id="split-intro">
				<SectionHeading
					title="One creator, dual disciplines, two lenses, one singular vision."
					subtitle="Bridging software engineering and video production to craft seamless digital experiences where scalable code architecture meets visual storytelling, functional design meets emotionality, and technical reliability meets creative expression."
					thumbnail={{
						src: "/assets/images/home/intro-thumbnail.jpg",
						alt: "A collage of images including a man facing two camera lenses pointed at opposite directions, with on one side a bank of computers and monitors with a robotic arm, and one the other a motion picture production set with a man wearing a hoodie and headphones behind a production video camera and a man and woman couple in the distant background.",
						width: 400,
						height: 200,
					}}
				/>
				
				<CardList>
					<Card
						title="Product-grade engineering"
						actions={[
							{
								text: 'Learn More',
								href: '#',
							}
						]}
					>
						<p>Building production-ready web experiences with React, Next.js, TypeScript, and thoughtful system design.</p>
						<ul className="list-disc list-inside space-y-1.25 my-6.5 text-sm text-gray-700 dark:text-gray-300">
							<li>Scalable front-end architectures</li>
							<li>Design systems and component libraries</li>
							<li>Robust data flows and API integration</li>
							<li>Accessibility, performance, and reliability</li>
							<li>Testing and debugging strategies</li>
						</ul>
					</Card>
					<Card
						title="Cinematic storytelling"
						actions={[
							{
								text: 'Learn More',
								href: '#',
							}
						]}
					>
						<p>Planning, shooting, and editing visual narratives that support products, brands, and people.</p>
						<ul className="list-disc list-inside space-y-1.25 my-6.5 text-sm text-gray-700 dark:text-gray-300">
							<li>Direction, storyboarding, and shot planning</li>
							<li>Camera operation, lighting, and framing</li>
							<li>Post-production and motion graphics</li>
							<li>Color grading and sound design</li>
							<li>Edit and delivery for web & film</li>
						</ul>
					</Card>
				</CardList>

			</Section>


			<Section id="approach-overview">
				<SectionHeading
					title="My dual approach: where code meets creativity."
					subtitle="Integrating robust engineering with cinematic storytelling to deliver engaging digital experiences that combine technical excellence, visual polish, and user-centered design—creating products that function flawlessly and resonate emotionally."
					thumbnail={{
						src: "/assets/images/home/dual-approach-thumbnail.jpg",
						alt: "A collage of images including a humanoid robot in front of an image of a rocketship, a couple of men working at a computer with multiple monitors, a man wearing a hoodie behind a production video camera, and an image of a human head looking left superimposed with a role of film slightly unfurled.",
						width: 400,
						height: 200,
					}}
				/>

				<Panel id="approach-overview--panel" className="space-y-10">

					<AsymmetricLayout
						variant="two-thirds-right"
						first={
							<NextImage
								src="/assets/images/roles/software-engineer/approach-overview_technical-precision.jpg"
								alt="Software engineer working at a multi-monitor setup with code displayed on screens"
								width={800}
								height={533}
							/>
						}
						second={
							<span className="prose text-gray-600 dark:text-gray-400 leading-6">
								<h2 className="font-heading! text-gray-800 dark:text-gray-200 leading-6.75">Technical Precision Meets Creative Vision</h2>
								<p>
									I am a fiercely creative person who believes in the power of combining technical precision with artistic vision to create meaningful digital experiences. My approach is rooted in understanding the user&apos;s journey and crafting interfaces that are both functional and emotionally resonant.
								</p>
								<p>
									Every project begins with deep research into user needs and business objectives. I believe that great software isn&apos;t just about elegant code—it is about solving real problems with solutions that feel intuitive and delightful to use.
								</p>
							</span>
						}
					/>

					<AsymmetricLayout
						variant="two-thirds-left"
						first={
							<NextImage
								src="/assets/images/roles/video-producer/approach-overview_video-editor.jpg"
								alt="Video editor working at a large monitor setup with an editing software program running"
								width={800}
								height={533}
							/>
						}
						second={
							<span className="prose text-gray-600 dark:text-gray-400 leading-6">
								<h2 className="font-heading text-gray-800 dark:text-gray-200 leading-6.75">Bringing Cinematic Vision to Digital Experiences</h2>
								<p>
									On the engineering side, I prioritize writing clean, maintainable code that adheres to best practices and industry standards. I leverage modern frameworks and tools to build scalable applications that perform reliably under various conditions.
								</p>
								<p>
									My development process emphasizes thorough testing, comprehensive documentation, and modular architecture that can evolve with changing requirements. I focus on creating systems that are not only robust today but can adapt and scale tomorrow.
								</p>
							</span>
						}
					/>

					<AsymmetricLayout
						variant="two-thirds-right"
						first={
							<NextImage
								src="/assets/images/roles/photographer/approach-overview_photographer-editor.jpg"
								alt="A man sitting at his laptop with photographs in a photo-editing software program"
								width={800}
								height={533}
							/>
						}
						second={
							<span className="prose text-gray-600 dark:text-gray-400 leading-6">
								<h2 className="font-heading text-gray-800 dark:text-gray-200 leading-6.75">Storytelling Through Visual Design and Motion</h2>
								<p>
									From a cinematic perspective, I focus on storytelling through visual design and motion. I utilize principles of cinematography, such as composition, lighting, and pacing, to create engaging narratives that captivate users and enhance their interaction with the product.
								</p>
								<p>
									Every visual element serves a purpose in the larger narrative—from the subtle animations that guide user attention to the carefully chosen color palettes that evoke specific emotions. I treat each interface as a stage where the user is the protagonist of their own story.
								</p>
							</span>
						}
					/>

				</Panel>

			</Section>


			<BlogLatestPosts />


			<ContactCTASection
				id="closing-contact-cta"
				heading="Let's bring your vision to life."
				text="Whether you need a robust web application, compelling visual content, or both—I deliver solutions that perform flawlessly and captivate your audience. Let's discuss your project and create something extraordinary together."
				actions={closingCtaActions}
			/>


		</Page >

	)
}
