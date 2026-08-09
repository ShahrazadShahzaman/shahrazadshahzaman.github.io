import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "s49m7ckj",
  dataset: "production",
  apiVersion: "2026-08-08",
  useCdn: false,
});