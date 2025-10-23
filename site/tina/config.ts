import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  
  // For local development
  contentApiUrlOverride: process.env.TINA_PUBLIC_IS_LOCAL === "true" 
    ? "http://localhost:4001/graphql" 
    : undefined,
  
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "page",
        label: "Course Pages",
        path: "pages",
        format: "mdx",
        match: {
          include: "**/*.mdx",
          exclude: ["api/**", "**/_*.{js,jsx,ts,tsx,json}"],
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: false,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
        ui: {
          router: ({ document }) => {
            const breadcrumbs = document._sys.breadcrumbs;
            const slug =
              breadcrumbs.length === 0
                ? ""
                : breadcrumbs.join("/");
            return `/${slug}`;
          },
        },
      },
    ],
  },
});
