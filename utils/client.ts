import { createClient, ClientConfig } from '@sanity/client';

export const client = createClient({
  projectId: 'e72oef5g',
  dataset: 'production',
  apiVersion: '2023-03-25',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
} as ClientConfig);
