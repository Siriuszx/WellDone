import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectSelectedTopic, setTopic } from '@/features/postList/postListSlice';

import { Topic } from '@/types/Topic';

import { Wrapper } from './TopicItem.styled';
type TopicItemProps = {
  _id: string;
  name: string;
};

const TopicItem = ({ _id, name }: TopicItemProps) => {
  const selectedTopic = useAppSelector(selectSelectedTopic);

  const dispatch = useAppDispatch();

  const handleTopicClick = (): void => {
    dispatch(setTopic({ _id, name } as Topic));
  };

  const isSelected = selectedTopic?._id === _id;

  return (
    <Wrapper $isSelected={isSelected} onClick={handleTopicClick}>
      {name}
    </Wrapper>
  );
};

export default TopicItem;
