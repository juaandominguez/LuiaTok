import React, { useState, useEffect, useRef } from 'react'
import { Video } from '../types'
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import {BsPlay ,BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';


interface IProps{
    post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }) => {
  const [isHover, setIsHover] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoPress = () => {
    if (isPlaying) {
      videoRef?.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef?.current?.play();
      setIsPlaying(true);
    }
  }

  useEffect(() =>{
    if(videoRef?.current){
      videoRef.current.muted = isMuted;
    }  
  }, [isMuted])
  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6 w-full'>
      <div>
        <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
            <div className='md:w-16 md:h-16 w-10 h-10'>
                <Link href={`/profile/${post.postedBy._id}`}>
                    <>
                    <Image 
                    width={62}
                    height={62}
                    className='rounded-full'
                    src={post.postedBy.image}
                    alt='profile photo'
                    layout='responsive'
                    />
                    </>
                </Link>
            </div>
            <div>
                <Link href={`/profile/${post.postedBy._id}`}>
                <div className='flex items-center pt-2 md:pt-4'>
                  <p className='flex gap-2 items-center md:text-md font-bold text-primary'>{post.postedBy.userName} {' '}
                    <GoVerified className='text-blue-400 text-md' />
                  </p>
                  <p className='ml-2 capitalize font-medium text-xs text-gray-500 hidden md:block'>{post.postedBy.userName}</p>
                </div>
                </Link>
            </div>
        </div>
      </div>

      <div className='lg:ml-20 flex gap-4 relative items-center justify-center w-full'>
        <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} 
        className='rounded-3xl'>
          <Link href={`/detail/${post._id}`}>
            <div>
              <p className='text-s text-secondary text-center'>{post.caption}</p>
            </div>
            <video 
            //autoPlay
            preload='metadata'
            playsInline={true}
            x5-playsinline={true}
            webkit-playsinline={true}
            loop
            ref={videoRef}
            className='lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-gray-100'
            >
              <source src={`${post.video.asset.url}#t=0.001`} type="video/mp4"></source>
            </video>
          </Link>

          {isHover && (
            <div className='absolute cursor-pointer flex gap-10 p-3 -translate-y-12 md:-translate-y-16 pb-0'>
              {isPlaying ? (
                <button onClick={onVideoPress} style={{ zIndex: 1 }}>
                  <BsFillPauseFill className='text-black text-2xl lg:text-4xl' />
                </button>) : (
                  <button onClick={onVideoPress}>
                  <BsFillPlayFill className='text-black text-2xl lg:text-4xl'/>
                </button>
                )
              }
              {isMuted ? (
                <button onClick={() => setIsMuted(false)} style={{ zIndex: 1 }}>
                  <HiVolumeOff className='text-black text-2xl lg:text-4xl' />
                </button>) : (
                  <button onClick={() => setIsMuted(true)}>
                  <HiVolumeUp className='text-black text-2xl lg:text-4xl'/>
                </button>
                )
              }
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoCard
