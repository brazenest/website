import NextImage from 'next/image'
import { Page } from "@/components/newton/layout/Page"
import { Card } from '@/components/newton/ui/Card'
import { Section } from '@/components/newton/layout/Section'
import { HeroSection } from '@/components/newton/HeroSection'
import { Panel } from '@/components/newton/layout/Panel'
import { SectionHeading } from '@/components/newton/layout/SectionHeading'
import { ContactCTASection } from '@/components/newton/contact/ContactCTASection'

export default function AboutMePage() {

	const pageId = "about-me"

	const rolesImages = {
		roleA: {
			src: '/assets/images/about-me/role-a-full-stack-software-engineer_3x2.png',
			alt: 'Photo of a software engineer working on a laptop with code on the screen',
			width: 800,
			height: 533,
		},
		roleB: {
			src: '/assets/images/about-me/role-b-video-producer-editor.jpeg',
			alt: 'Photo of a video producer working on a laptop with a camera on the screen',
			width: 800,
			height: 533,
		},
	}

	return (
		<Page id={pageId}>
			<HeroSection
				id="about-page-hero"
				align="left"
				title="I'm Alden Gillespy, a full-stack software engineer, web designer, video producer, and creative storyteller."
				subtitle="I am bridging the worlds of software engineering and video production to craft seamless digital experiences for the world."
				backgroundImage={{
					src: "/assets/images/profile/IMG_1603.JPG",
					alt: "Alden Gillespy from a low angle outdoors with clouds in the sky",
					width: 2400,
					height: 1600,
				}}
			/>

			<Section id="intro">
				<SectionHeading title="Let Me Introduce Myself" subtitle="My background is a very diverse landscape and deliberately hybrid." />
				<Panel id="intro-panel" className="md:columns-2 prose dark:prose-invert text-gray-600 dark:text-gray-400 max-w-none leading-6">
					<p className="mb-4">As a young student of creativity, I studied <strong>Computer Science</strong> at the University of Florida and subsequently earned a <strong>Film & Video Production</strong> degree from Full Sail University. Those two identities collided early in my life and have never separated.</p>
					<p className="mb-4">I’ve worked as a full-stack engineer on <strong>high-visibility, high-impact projects</strong> including a consumer-scale onboarding flow used by millions annually. I’ve also spent years shooting, editing, and producing videos designed to communicate ideas visually, memorably, and at a professional level. My YouTube channel has been enjoyed by <strong>over 260,000 viewers.</strong></p>



					<p className="mb-4">
						As a full-stack software engineer and video producer, <strong>I thrive on the intersection of technology and creativity.</strong> My journey is marked by a dual-role approach, where I blend my technical skills with my creative flair to deliver impactful solutions.
					</p>
					<p className="mb-4">
						With a background in both software engineering and video production, I bring a unique perspective to my work. <strong>I am passionate about creating digital experiences</strong> that not only meet technical requirements but also captivate audiences through compelling design and storytelling.
					</p>
					<p className="mb-4">Outside of work, you’ll probably find me experimenting with new camera setups, writing about product and design, or solving problems no one asked me to solve — <strong>because that’s what engineers do.</strong></p>
				</Panel>
			</Section>
			<Section id="roles">
				<SectionHeading title="My dual-role approach to work and life" subtitle="Two modes, different toolchains, same expectation for reliability, clarity, and intention." />
				<Panel id="roles-panel">

					<div className="grid md:grid-cols-2 gap-6 text-start text-gray-700">
						<Card
							title="Role A: Full-Stack Software Engineer and Web Designer"
							image={rolesImages.roleA}
						>
							<p className="mb-4"><em>React, Next.js, TypeScript, Node, and pragmatic system design — from prototypes to production systems.</em></p>
							<p>
								In my professional journey, <strong>I embrace a dual-role approach</strong> that harmonizes the technical and creative aspects of my work. As a software engineer, I focus on building robust and scalable applications, ensuring that every line of code is optimized for performance and reliability.
							</p>
						</Card>
						<Card
							title="Role B: Video Producer and Cinematic Visual Storyteller"
							image={rolesImages.roleB}
						>
							<p className="mb-4"><em>Narrative-focused shoots, pacing, and color work that support products, brands, and people.</em></p>
							<p>
								Simultaneously, <strong>my creative side drives me</strong> to design visually appealing interfaces and produce engaging video content. This blend of skills allows me to approach projects with a holistic perspective, ensuring that both functionality and aesthetics are prioritized.
							</p>
						</Card>
					</div>

					<p className="max-w-3xl mx-auto mt-13.25 py-1.5 text-lg text-gray-700 dark:text-gray-300">
						<strong>By balancing these two roles,</strong> I am able to deliver comprehensive solutions that not only meet technical requirements but also captivate audiences through compelling design and storytelling with a unique balance of art and science.
					</p>
				</Panel>


			</Section>

			<Section id="more-description">
				<SectionHeading
					title="A path that runs through both code and camera."
					subtitle="I’ve spent years bouncing between engineering, design, and production — the throughline is making things feel considered." />
				<Panel id="more-description--panel">
					<div className="grid lg:grid-cols-2 gap-6">
						<div className="more-description--image lg:col-span-1">
							<NextImage
								src="/assets/images/about-me/more-description-image.jpg"
								alt="A collage of images depicting various aspects of software engineering and video production"
								width={800}
								height={1200}
							/>
						</div>
						<div className="more-description--text lg:col-span-1 prose mx-auto text-gray-700 dark:text-gray-300 leading-6">
							<p>Whether I’m engineering a product or producing a video, my philosophy stays the same: <strong>clarity over complexity, craft over shortcuts, and emotion over decoration.</strong> Code should feel as intentional as narrative editing. Interfaces should have rhythm. Great experiences — whether interactive or cinematic — are invisible when they work and unforgettable when they’re well-designed.</p>

							<p>I believe the best digital products feel less like software and more like stories you move through. <strong>Every transition, every interaction, every frame should serve a purpose.</strong> Just like in film, pacing and structure matter. What you choose not to include matters just as much as what you do. My goal is always to remove friction, reduce cognitive load<strong></strong>, and let people focus on what they came for.</p>

							<p>Today, I bridge those worlds<strong></strong> for companies and creatives who value high-quality work that doesn’t feel templated or generic. I architect and design full-stack web experiences using <strong>TypeScript, React, Next.js, Node, Tailwind, and AWS</strong> — building systems that are scalable, maintainable, and designed to evolve. I care about design systems, performance, accessibility, and long-term maintainability, not just shipping something that works today.</p>

							<p>At the same time, I create visual content using the <strong>language of film: camera, color, composition, light, and pacing.</strong> I think in terms of shots and emotional beats — how visuals guide attention and how subtle motion communicates meaning. Whether I’m behind a camera or a code editor, I’m always thinking about how people feel while experiencing what I’ve built.</p>

							<p>I don’t see design, engineering, and storytelling as separate disciplines, but as parts of the same system. <strong>Strategy informs structure.</strong> Structure informs visuals. Visuals reinforce meaning — and meaning is what people remember.</p>

							<p>In every project, <strong>I bring both sides of my brain</strong>: the engineer who builds systems that scale, and the filmmaker who knows how to make people care. I build for impact<strong></strong> — not just technical success, but emotional resonance — because the best products don’t just solve problems, they create connection.</p>
						</div>
					</div>

				</Panel>
			</Section>

			<ContactCTASection
				id="about-me--closing-cta"
				heading="Available for roles blending code and creative storytelling."
				text="Whether you need someone deep in the code, helping shape the interface, or working on visuals that explain it, I’m open to full-time roles and select freelance work where the mix of engineering and cinematic storytelling truly matters."
				actions={[
					{
						text: 'View Work',
						href: '/work',
						variant: 'secondary',
					},
				]}
			/>

		</Page >
	)
}