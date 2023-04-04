import { useState } from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

import VideoCard from '../../../components/VideoCard';
import NoResults from '../../../components/NoResults';
import { IUser, Video } from '../../../types';
import { BASE_URL } from '../../../utils';
import useAuthStore  from '../../../store/authStore';
const {allUsers } = useAuthStore.getState();

const Search = ({videos}: {videos: Video[]}) => {
    const [isVideos, setIsVideos] = useState(false);
    const router = useRouter();
    const { term }: any = router.query;
    const vids = isVideos ? 'border-b-2 border-black' : 'text-gray-400';
    const accounts = !isVideos ? 'border-b-2 border-black' : 'text-gray-400';
    const validAccs = allUsers.filter((user: IUser) => user.userName.toLowerCase().includes(term.toLowerCase()));
  return (
    <div className='w-full'>
        <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full'>
            <p className={`text-xl font-semibold cursor-pointer mt-2 ${vids}`} onClick={() => setIsVideos(true)}>Videos</p>
            <p className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`} onClick={() => setIsVideos(false)}>Accounts</p>
        </div>
        {isVideos ? (
            <div className='md:mt-16 flex flex-wrap gap-6 md:justify-start'>
                {videos.length > 0 ? (
                    videos.map((video: Video, index: number) => (
                        <VideoCard key={index} post={video}/>
                    ))
                ) : (
                    <NoResults text={`No video results for ${term}`}/>
                )}
            </div>
        ) : (
            <div>
                <div className='md:mt-2'>
                    {validAccs.length > 0 ? (
                        validAccs.map((user: IUser, index: number) => (
                            <Link href={`/profile/${user._id}`} key={index}>
                                <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200'>
                                    <div>
                                        <Image src={user.image}
                                        width={50}
                                        height={50}
                                        className='rounded-full'
                                        alt='user profile image' />
                                    </div>
                                    <div className='hidden xl:block'>
                                        <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>
                                            {user.userName.replaceAll(' ', '')}
                                            <GoVerified className='text-blue-400'/>  
                                        </p>
                                        <p className='capitalize text-gray-400 text-xs'>
                                            {user.userName}
                                        </p>
                                    </div>
                                </div>
                             </Link>
                        ))
                    ) : (
                        <NoResults text={`No account results for ${term}`}/>
                    )}

                </div>
            </div>
        )}
    </div>
  )
}

export const getServerSideProps = async ({params: { term }}: {params: { term: string}}) => {
    const res = await axios.get(`${BASE_URL}/api/search/${term}`);
    return {
        props: {videos: res.data}
    }
}

export default Search
