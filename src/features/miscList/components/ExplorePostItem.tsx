import { setTopic } from '@/features/postList/postListSlice';
import { useAppDispatch } from '@/app/hooks';

import { Author } from '@/types/Author';
import { Topic } from '@/types/Topic';

import {
  AuthorIcon,
  Header,
  PostTitle,
  StyledLink,
  TopicName,
  TopicWrapper,
  WrapperItem,
  AuthorName,
} from './ExplorePostItem.styled';

type ExplorePostItemProps = {
  _id: string;
  author: Author;
  title: string;
  body: string;
  date: string;
  topic: Topic;
};

const ExplorePostItem = ({ _id, author, title, topic }: ExplorePostItemProps) => {
  const dispatch = useAppDispatch();

  const handleTopicClick = (): void => {
    dispatch(setTopic(topic));
  };

  return (
    <WrapperItem>
      <Header>
        <StyledLink to={`/authors/${author._id}`}>
          <AuthorIcon src="/portrait-placeholder.png" alt="Author Icon" />
          <AuthorName>{author.username}</AuthorName>
        </StyledLink>
        <TopicWrapper>
          in
          <TopicName onClick={handleTopicClick}>{topic.name}</TopicName>
        </TopicWrapper>
      </Header>
      <StyledLink to={`/posts/${_id}`}>
        <PostTitle>{title}</PostTitle>
      </StyledLink>
    </WrapperItem>
  );
};

export default ExplorePostItem;