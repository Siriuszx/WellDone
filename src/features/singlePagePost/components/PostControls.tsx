import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { putLikeCount, selectPostLikeCount } from '../singlePagePostSlice';
import { toggleComments } from '@/features/commentList/commentListSlice';
import {
  deleteBookmark,
  postBookmark,
  selectBookmarkActionState,
  selectProfileBookmarks,
} from '@/features/profile/profileSlice';

import {
  ControlsContainer,
  ControlsIcon,
  LikeCount,
  LikeWrapper,
  MenuItem,
  Wrapper,
} from './PostControls.styled';
import Bookmark from '@/components/icons/Bookmark';
import DotMenu from '@/components/general/DotMenu';

type PostControlsProps = { postId: string };

const PostControls = ({ postId }: PostControlsProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const userBookmarks = useAppSelector(selectProfileBookmarks);
  const likeCount = useAppSelector(selectPostLikeCount);

  const bookmarkActionState = useAppSelector(selectBookmarkActionState);

  const dispatch = useAppDispatch();

  const onLikeClick = (): void => {
    dispatch(putLikeCount(postId));
  };

  const handleBookmarkAdd = (): void => {
    if (!bookmarkActionState.isLoading) dispatch(postBookmark(postId));
  };

  const handleBookmarkRemove = (): void => {
    if (!bookmarkActionState.isLoading) dispatch(deleteBookmark(postId));
  };

  const onCommentsClick = (): void => {
    dispatch(toggleComments());
  };

  const handleDropdownToggle = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDropdownClose = (): void => {
    setIsMenuOpen(false);
  };

  const isBookmarked = userBookmarks?.some((p) => p === postId) || false;

  const onBookmarkClick = isBookmarked ? handleBookmarkRemove : handleBookmarkAdd;

  return (
    <Wrapper>
      <ControlsContainer>
        <LikeWrapper>
          <ControlsIcon
            onIconClick={onLikeClick}
            src="/thumb-up-outline.svg"
            alt="Like Icon"
          />
          <LikeCount>{likeCount ? likeCount : ''}</LikeCount>
        </LikeWrapper>
        <ControlsIcon
          onIconClick={onCommentsClick}
          src="/comment-outline.svg"
          alt="Toggle Comments Icon"
        />
      </ControlsContainer>
      <ControlsContainer>
        <Bookmark onBookmarked={onBookmarkClick} isBookmarked={isBookmarked} />
        <DotMenu
          isAlignedLeft={false}
          onToggle={handleDropdownToggle}
          onMenuClose={handleDropdownClose}
          isOpen={isMenuOpen}
        >
          <MenuItem onClick={handleDropdownClose}>Mute this author</MenuItem>
          <MenuItem onClick={handleDropdownClose}>Mute this publication</MenuItem>
        </DotMenu>
      </ControlsContainer>
    </Wrapper>
  );
};

export default PostControls;
