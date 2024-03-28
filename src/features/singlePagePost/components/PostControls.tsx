import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useNavigate } from 'react-router-dom';

import { putLikeCount, selectPostLikeCount } from '../singlePagePostSlice';
import { toggleComments } from '@/features/commentList/commentListSlice';
import {
  deleteBookmark,
  postBookmark,
  selectBookmarkActionState,
  selectIsPostBookmarked,
} from '@/features/profile/profileSlice';
import { enterEditMode } from '@/features/postForm/postFormSlice';

import Bookmark from '@/components/icons/Bookmark';
import DotMenu from '@/components/general/DotMenu';
import { MenuItem, MenuItemDanger, MenuItemSuccess } from '@/components/styled/MenuItem';
import {
  ControlsContainer,
  ControlsIcon,
  LikeCount,
  LikeWrapper,
  Wrapper,
} from './PostControls.styled';
import { deletePost } from '@/features/postList/postListSlice';
import Dialog from '@/components/general/Dialog';
import DeleteConfirm from '@/components/general/DeleteConfirm';

type PostControlsProps = { postId: string; isAuthor: boolean };

const PostControls = ({ postId, isAuthor }: PostControlsProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const isBookmarked = useAppSelector(selectIsPostBookmarked(postId)) as boolean;
  const likeCount = useAppSelector(selectPostLikeCount);
  const bookmarkActionState = useAppSelector(selectBookmarkActionState);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const handleEditModeClick = (): void => {
    dispatch(enterEditMode(postId));
    setIsMenuOpen(false);
    navigate('/post-form');
  };

  const handleOpenDeleteModal = (): void => {
    setIsDeleteModalOpen(true);
    setIsMenuOpen(false);
  };

  const handleCloseDeleteModal = (): void => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteClick = async (): Promise<void> => {
    const response = await dispatch(deletePost(postId)).unwrap();

    if (response) navigate('/');
  };

  const handleMuteAuthorClick = (): void => {
    // TODO:
    setIsMenuOpen(false);
  };

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
          {isAuthor && (
            <MenuItemSuccess onClick={handleEditModeClick}>Edit Post</MenuItemSuccess>
          )}
          <MenuItem onClick={handleMuteAuthorClick}>Mute this author</MenuItem>
          {isAuthor && (
            <MenuItemDanger onClick={handleOpenDeleteModal}>Delete Post</MenuItemDanger>
          )}
        </DotMenu>
        <Dialog isModalOpen={isDeleteModalOpen} onModalClose={handleCloseDeleteModal}>
          <DeleteConfirm
            headerText="Are you sure you want to delete this post?"
            onCancel={handleCloseDeleteModal}
            onDelete={handleDeleteClick}
          />
        </Dialog>
      </ControlsContainer>
    </Wrapper>
  );
};

export default PostControls;
