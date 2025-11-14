// lib/contentful.ts

import { createClient } from "contentful";

// Ensure your environment variables are set in .env.local
const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;
const CONTENTFUL_PREVIEW_ACCESS_TOKEN =
  process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;

if (!SPACE_ID || !ACCESS_TOKEN || !CONTENTFUL_PREVIEW_ACCESS_TOKEN) {
  throw new Error(
    "Contentful credentials must be defined in your environment variables."
  );
}

// 1. Initialize the Contentful Client
export const client = createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
});

export const previewClient = createClient({
  host: "preview.contentful.com",
  space: SPACE_ID,
  accessToken: CONTENTFUL_PREVIEW_ACCESS_TOKEN,
});
