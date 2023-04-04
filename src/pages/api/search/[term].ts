// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { searchPostsQuery } from '../../../../utils/queries'
import { client } from '../../../../utils/client'

type Data = {
  name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'GET'){
    const { term } = req.query;
    const videosQuery = searchPostsQuery(term as string);
    const videos = await client.fetch(videosQuery);
    res.status(200).json(videos)
}
}
