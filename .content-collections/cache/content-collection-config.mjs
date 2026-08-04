// content-collections.ts
import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";
var jobs = defineCollection({
  name: "jobs",
  directory: "content/jobs",
  include: "**/*.md",
  schema: z.object({
    jobTitle: z.string(),
    summary: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    company: z.string(),
    location: z.string(),
    tags: z.array(z.string()),
    content: z.string()
  })
});
var education = defineCollection({
  name: "education",
  directory: "content/education",
  include: "**/*.md",
  schema: z.object({
    school: z.string(),
    summary: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    tags: z.array(z.string()),
    content: z.string()
  })
});
var projects = defineCollection({
  name: "projects",
  directory: "content/projects",
  include: "**/*.md",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    github: z.string().optional(),
    liveUrl: z.string().optional(),
    image: z.string().optional(),
    featured: z.boolean().optional(),
    content: z.string()
  })
});
var experiences = defineCollection({
  name: "experiences",
  directory: "content/experiences",
  include: "**/*.md",
  schema: z.object({
    title: z.string(),
    organization: z.string(),
    period: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    content: z.string()
  })
});
var content_collections_default = defineConfig({
  collections: [jobs, education, projects, experiences]
});
export {
  content_collections_default as default
};
