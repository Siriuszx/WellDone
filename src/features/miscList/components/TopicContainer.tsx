import { useAppDispatch, useAppSelector } from '@/app/hooks';
import useHomePageStatus from '@/hooks/useHomeLoadingStatus';
import { useEffect } from 'react';

import { addPushNotification } from '@/features/pushNotification/pushNotificationSlice';
import {
  fetchTopics,
  selectFetchMiscTopicsState,
  selectMiscTopicList,
} from '../miscListSlice';

import { WaterfallPopUp } from '@/styles/animations/WaterfallPopUp';
import { ErrorData } from '@/types/fetchResponse/error/ErrorData';

import { TopicList, Wrapper } from './TopicContainer.styled';
import TopicListLoader from '@/components/loaders/TopicListLoader';
import { PushNotificationType } from '@/types/entityData/StatusNotificationData';
import TopicItem from './TopicItem';
import SectionHeader from './SectionHeader';

const TopicContainer = () => {
  const topicList = useAppSelector(selectMiscTopicList);
  const isLoading = useHomePageStatus();
  const { error } = useAppSelector(selectFetchMiscTopicsState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchTopics()).unwrap();
      } catch (err) {
        dispatch(
          addPushNotification(
            (err as ErrorData).message,
            PushNotificationType.ERROR,
          ),
        );
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <Wrapper>
      {isLoading ? (
        <TopicListLoader />
      ) : error ? (
        <TopicListLoader />
      ) : (
        <>
          <SectionHeader>Recently added topics</SectionHeader>
          <TopicList
            variants={WaterfallPopUp.container}
            initial="hidden"
            animate="visible"
          >
            {topicList.map((topic) => (
              <TopicItem key={topic._id} {...topic} />
            ))}
          </TopicList>
        </>
      )}
    </Wrapper>
  );
};

export default TopicContainer;
