import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // fast cached reads; set false if you need real-time
  token: process.env.SANITY_API_READ_TOKEN,
  stega: { enabled: false },
});