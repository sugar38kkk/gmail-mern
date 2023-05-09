import React from 'react';
import { AiFillHeart } from '@react-icons/all-files/ai/AiFillHeart';
import { AiOutlineHeart } from '@react-icons/all-files/ai/AiOutlineHeart';
import { FaRegBookmark } from '@react-icons/all-files/fa/FaRegBookmark';
import { FaBookmark } from '@react-icons/all-files/fa/FaBookmark';
import {VscMailRead} from '@react-icons/all-files/vsc/VscMailRead'
import {VscMail} from '@react-icons/all-files/vsc/VscMail'
import {VscTrash} from '@react-icons/all-files/vsc/VscTrash'
import {VscStarEmpty} from '@react-icons/all-files/vsc/VscStarEmpty'
import {VscStarFull} from '@react-icons/all-files/vsc/VscStarFull'

const LikeIcon = ({ state, color, size }) => {
  const Heart = state ? AiFillHeart : AiOutlineHeart;
  return (
    <Heart
      size={size}
      color={color}
      fill='currentColor'
      stroke='currentColor'
      style={{ cursor: 'pointer' }}
    />
  );
};

const BookmarkIcon = ({ state, color, size }) => {
  const Bookmark = state ? FaBookmark : FaRegBookmark;
  return (
    <Bookmark
      size={size}
      color={color}
      fill='currentColor'
      stroke='currentColor'
      style={{ cursor: 'pointer' }}
    />
  );
};

const MailReadIcon = ({ color, size }) => {
  return (
    <VscMailRead
      size={size}
      color={color}
      fill='currentColor'
      stroke='currentColor'
      style={{ cursor: 'pointer' }}
    />
  );
};

const MailIcon = ({ color, size }) => {
  return (
    <VscMail
      size={size}
      color={color}
      fill='currentColor'
      stroke='currentColor'
      style={{ cursor: 'pointer' }}
    />
  );
};

const TrashIcon = ({ color, size }) => {
  return (
    <VscTrash
      size={size}
      color={color}
      fill='currentColor'
      stroke='currentColor'
      style={{ cursor: 'pointer' }}
    />
  );
};

const StarEmpty = ({ color, size }) => {
  return (
    <VscStarEmpty
      size={size}
      color={color}
      fill='currentColor'
      stroke='currentColor'
      style={{ cursor: 'pointer' }}
    />
  );
};

const StarFull = ({ color, size }) => {
  return (
    <VscStarFull
      size={size}
      color={color}
      fill='currentColor'
      stroke='currentColor'
      style={{ cursor: 'pointer' }}
    />
  );
};

export { LikeIcon, BookmarkIcon, MailReadIcon, MailIcon, TrashIcon, StarEmpty, StarFull };
