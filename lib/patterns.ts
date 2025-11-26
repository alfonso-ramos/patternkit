import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";

import {
  PatternDualList,
  PatternEditorialExample,
  PatternIntro,
  PatternNarrativeSection,
} from "@/components/patterns/editorial";
import { PatternCodeTabs } from "@/components/patterns/code-tabs";

const PATTERNS_DIR = path.join(process.cwd(), "content", "patterns");

export type PatternFrontmatter = {
  title: string;
  slug: string;
  category: string;
  level: string;
  summary: string;
  tags?: string[];
  diagram?: {
    static?: string;
    animated?: string;
  };
  snippets?: {
    lang: string;
    file: string;
  }[];
  quizId?: string;
  references?: { label: string; url: string }[];
};

export type PatternSummary = {
  slug: string;
  frontmatter: PatternFrontmatter;
};

async function readPatternFile(slug: string) {
  const filePath = path.join(PATTERNS_DIR, `${slug}.mdx`);
  return fs.readFile(filePath, "utf8");
}

export async function getPatternSlugs() {
  const entries = await fs.readdir(PATTERNS_DIR);
  return entries
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export async function getPatternBySlug(slug: string) {
  const source = await readPatternFile(slug);

  const { content, frontmatter } = await compileMDX<PatternFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
    },
    components: {
      PatternIntro,
      PatternNarrativeSection,
      PatternDualList,
      PatternEditorialExample,
      PatternCodeTabs,
    },
  });

  return {
    slug,
    frontmatter,
    content,
  };
}

export async function getPatternSummaries(): Promise<PatternSummary[]> {
  const slugs = await getPatternSlugs();
  const entries = await Promise.all(
    slugs.map(async (slug) => {
      const source = await readPatternFile(slug);
      const { data } = matter(source);
      return {
        slug,
        frontmatter: data as PatternFrontmatter,
      };
    }),
  );

  return entries.sort((a, b) => a.frontmatter.title.localeCompare(b.frontmatter.title));
}
