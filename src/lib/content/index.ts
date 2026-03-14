import { blogPosts } from "./blog";
import type {
  BlogPostMeta,
  HomePageContent,
  HomeIndexGroup,
  PhotoCatalog,
  PhotoItem,
  Project,
  ResumeEntry,
  ResumeSection,
  AboutPageContent,
  SiteLink,
  SiteSettings,
  SocialLink,
  TechnologyItem,
  UsesGroup,
  UsesItem,
} from "./model";
import { aboutPageContent, homePageContent } from "./pages";
import { photoCatalogs, photos } from "./photos";
import { projects } from "./projects";
import { resumeEntries, resumeSectionOrder } from "./resume";
import {
  homeSecondaryCtas,
  primaryNav,
  resumeAssetHref,
  siteSettings,
} from "./site";
import { socialLinks } from "./social";
import { technologyItems } from "./technologies";
import { usesGroupOrder, usesItems } from "./uses";

const groupItems = <T extends Record<string, unknown>>(
  items: readonly T[],
  key: keyof T,
  order: readonly string[],
) => {
  return order.map((title) => ({
    title,
    items: items.filter((item) => String(item[key]) === title),
  }));
};

export const getSiteSettings = (): SiteSettings => siteSettings;

export const getPrimaryNav = (): SiteLink[] => [...primaryNav];

export const getHomeSecondaryCtas = (): SiteLink[] => [...homeSecondaryCtas];

export const getSocialLinks = (): SocialLink[] => [...socialLinks];

export const getTechnologyItems = (): TechnologyItem[] => [...technologyItems];

export const getHomePageContent = (): HomePageContent => homePageContent;

export const getAboutPageContent = (): AboutPageContent => aboutPageContent;

export const getProjects = (): Project[] => [...projects];

export const getPhotoCatalogs = (): PhotoCatalog[] => [...photoCatalogs];

export const getPhotos = (): PhotoItem[] => [...photos];

export const getFeaturedPhotos = (): PhotoItem[] =>
  photos.filter((photo) => photo.featured);

export const getCurrentProjects = (): Project[] =>
  projects.filter((project) => project.status === "Current");

export const getFeaturedProjects = (): Project[] =>
  projects.filter((project) => project.status === "Featured");

export const getBlogPostMetas = (): BlogPostMeta[] => [...blogPosts];

export const getResumeEntries = (): ResumeEntry[] => [...resumeEntries];

export const getResumeSections = (): ResumeSection[] =>
  groupItems(resumeEntries, "section", resumeSectionOrder);

export const getUsesItems = (): UsesItem[] => [...usesItems];

export const getUsesGroups = (): UsesGroup[] =>
  groupItems(usesItems, "group", usesGroupOrder);

export const getFooterLinks = (): SiteLink[] => {
  const githubLink = socialLinks.find((link) => link.label === "GitHub");
  const links: SiteLink[] = [
    { href: "/photos", label: "Photos" },
    { href: siteSettings.resumeHref, label: "Resume PDF", external: true },
    { href: "/blog", label: "Blog" },
  ];

  if (githubLink?.href) {
    links.push({
      href: githubLink.href,
      label: githubLink.label,
      external: githubLink.external,
    });
  }

  return links;
};

export const getHomeIndexGroups = (): HomeIndexGroup[] => {
  const currentProjects = getCurrentProjects();
  const recentWriting = getBlogPostMetas();

  return [
    {
      title: "Technologies I use",
      items: getTechnologyItems().slice(0, 3).map((item) => ({
        label: item.name,
        note: item.note,
        href: item.href ?? "/uses",
      })),
    },
    {
      title: "Projects I'm working on",
      items: currentProjects.map((project) => ({
        label: project.title,
        note: project.summary,
        href: "/projects",
      })),
    },
    {
      title: "Recent writing",
      items: recentWriting.map((post) => ({
        label: post.title,
        note:
          post.status === "Published"
            ? post.publishedOn
            : `${post.status} post shell / ${post.publishedOn}`,
        href: "/blog",
      })),
    },
    {
      title: "About",
      items: [
        {
          label: siteSettings.role,
          note: `${siteSettings.location} / ${siteSettings.availability}`,
          href: "/about",
        },
        {
          label: "Uses",
          note: "Tools, workflow, and small defaults.",
          href: "/uses",
        },
        {
          label: "Resume snapshot",
          note: "Structured sections backed by shared data.",
          href: "/resume",
        },
        {
          label: "Photos",
          note: "Personal frames and starter catalogs.",
          href: "/photos",
        },
      ],
    },
    {
      title: "Social handles",
      items: socialLinks.map((link) => ({
        label: link.handle ? `${link.label} / ${link.handle}` : link.label,
        note: link.note,
        href: link.href,
        external: link.external,
      })),
    },
    {
      title: "Resume PDF",
      items: [
        {
          label: "Current PDF",
          note: "Downloadable resume file.",
          href: resumeAssetHref,
          external: true,
        },
        {
          label: "Resume page",
          note: "On-site summary rendered from typed content.",
          href: "/resume",
        },
      ],
    },
  ];
};

export type {
  AboutPageContent,
  BlogPostMeta,
  HomePageContent,
  HomeIndexGroup,
  HomeIndexItem,
  MediaAsset,
  PhotoCatalog,
  PhotoItem,
  Project,
  ResumeEntry,
  ResumeSection,
  SiteLink,
  SiteSettings,
  SocialLink,
  TechnologyItem,
  UsesGroup,
  UsesItem,
} from "./model";
