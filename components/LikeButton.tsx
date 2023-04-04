import React, {useState, useEffect }from 'react'
import { MdFavorite } from 'react-icons/md'
import  useAuthStore  from '../store/authStore'

interface IProps {
  handleLike: () => void;
  handleDislike: () => void;
  likes: any[];
}

const LikeButton = ({handleLike, handleDislike, likes}: IProps) => {
    const [liked , setLiked] = useState(false);
    const { userProfile }: any = useAuthStore()
    const filteredLikes = likes?.filter((like) => like._ref === userProfile?._id)


    useEffect(() => {
      if(filteredLikes?.length > 0) {
        setLiked(true)
      } else {
        setLiked(false)
      }
    }, [filteredLikes, likes])
  return (
    <div className='flex gap-6'>
      <div className='mt-4 flex flex-col justify-center items-center cursor-pointer'>
        {liked ? (
            <div className='bg-primary rounded-full p-2 md:p-4 text-[#F51997]'
            onClick={handleDislike}>
                <MdFavorite className='text-lg md:text-2xl'/>
            </div>
        ) : (
          <div className='bg-primary rounded-full p-2 md:p-4'
          onClick={handleLike}>
              <MdFavorite className='text-lg md:text-2xl'/>
          </div>
        )}
        <p className='text-md font-semibold'>{likes?.length || 0}</p>
      </div>
    </div>
  )
}

export default LikeButton
