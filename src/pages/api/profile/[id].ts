// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { singleUserQuery, userCreatedPostsQuery, userLikedPostsQuery } from '../../../../utils/queries';
import { client } from '../../../../utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'GET'){
        const { id } = req.query;
        const query = singleUserQuery(id as string);
        const userVideosQuery = userCreatedPostsQuery(id as string);
        const userLikedVideosQuery = userLikedPostsQuery(id as string);
        const user = await client.fetch(query);
        const userVideos = await client.fetch(userVideosQuery);
        const userLikedVideos = await client.fetch(userLikedVideosQuery);
        res.status(200).json({user: user[0], userVideos: userVideos, userLikedVideos: userLikedVideos});
    }
}
