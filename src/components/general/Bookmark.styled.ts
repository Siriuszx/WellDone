import styled from 'styled-components';

export const BookmarkIcon = styled.img`
  width: 24px;
  height: 24px;

  fill: #fff;
  transition: filter 100ms;

  cursor: pointer;

  &:hover {
    filter: invert(75%) sepia(0%) saturate(303%) hue-rotate(333deg) brightness(102%)
      contrast(82%);
  }
`;