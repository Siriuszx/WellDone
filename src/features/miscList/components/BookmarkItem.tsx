import Post from '@/types/Post';
import {
  AuthorIcon,
  AuthorName,
  BookmarkTitle,
  Header,
  MiscInfo,
  PostDate,
  TimeToRead,
  WrapperItem,
} from './BookmarkItem.styled';
import { StyledLink } from './BookmarkContainer.styled';

const BookmarkItem = ({ _id, author, title, body, date }: Post) => {
  return (
    <WrapperItem>
      <Header>
        <AuthorIcon src="/portrait-placeholder.png" alt="Author Icon" />
        <AuthorName>{author.username}</AuthorName>
      </Header>
      <StyledLink to={`/posts/${_id}`}>
        <BookmarkTitle>{title}</BookmarkTitle>
      </StyledLink>
      <MiscInfo>
        <PostDate date={date} />
        <TimeToRead bodyLength={body.length} />
      </MiscInfo>
    </WrapperItem>
  );
};

export default BookmarkItem;
