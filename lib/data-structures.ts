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

const DATA_STRUCTURES_DIR = path.join(process.cwd(), "content", "data-structures");

export type DataStructureFrontmatter = {
  title: string;
  slug: string;
  type: string;
  level: string;
  summary: string;
  tags?: string[];
  bigO?: Record<string, string>;
  snippets?: {
    lang: string;
    file: string;
  }[];
  references?: { label: string; url: string }[];
};

export type DataStructureSummary = {
  slug: string;
  frontmatter: DataStructureFrontmatter;
};

async function readDataStructureFile(slug: string) {
  const filePath = path.join(DATA_STRUCTURES_DIR, `${slug}.mdx`);
  return fs.readFile(filePath, "utf8");
}

export async function getDataStructureSlugs() {
  const entries = await fs.readdir(DATA_STRUCTURES_DIR);
  return entries
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export async function getDataStructureBySlug(slug: string) {
  const source = await readDataStructureFile(slug);

  const { content, frontmatter } = await compileMDX<DataStructureFrontmatter>({
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

export async function getDataStructureSummaries(): Promise<DataStructureSummary[]> {
  const slugs = await getDataStructureSlugs();
  const entries = await Promise.all(
    slugs.map(async (slug) => {
      const source = await readDataStructureFile(slug);
      const { data } = matter(source);

      return {
        slug,
        frontmatter: data as DataStructureFrontmatter,
      };
    }),
  );

  return entries.sort((a, b) => a.frontmatter.title.localeCompare(b.frontmatter.title));
}
