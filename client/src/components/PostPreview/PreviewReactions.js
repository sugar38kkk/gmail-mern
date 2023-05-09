import { FaRegComment } from '@react-icons/all-files/fa/FaRegComment';
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { LikeIcon } from '../Icons/Icons';
import AuthModal from '../../components/Modal/AuthModal';
import usePostReaction from '../Post/PostReactions/hooks/usePostReaction';
import { readingTime } from '../../utils';

const PreviewReactions = ({ userId, post, showModal, setShowModal }) => {
  const { id, body, sender } =
    post;
  

  const postLengthRef = useRef();
  useEffect(() => {
    const span = postLengthRef.current;
    span.innerText = readingTime(body);
  }, [body]);



  return (
    <div className='preview__reactions'>
      <div className='preview__reactions--left'>
        <Link to={`/posts}/${id}`} className='reactions__total'>
          <i>
            <LikeIcon size='2rem' />
          </i>
          <span>
            <span className='reactions__text'>Reactions</span>
          </span>
        </Link>
        <Link to={`/posts//${id}`} className='comments__total'>
          <i>
            <FaRegComment size='2rem' />
          </i>
          <span>
            <span className='reactions__text'>Comments</span>
          </span>
        </Link>
        <AuthModal onClose={() => setShowModal(false)} show={showModal} />
      </div>
      <div className='preview__reactions--right'>
        <span className='read-time' ref={postLengthRef} />

      </div>
    </div>
  );
};

export default PreviewReactions;
