import styled from 'styled-components';

export const Wrapper = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;

  position: fixed;
  top: 0;
  right: 0;

  width: 400px;
  height: 100dvh;
  padding: 0 1rem;
  background-color: ${({ theme }) => theme.color.comments_bg_primary};
  box-shadow: 0 0 2em rgb(0 0 0 / 0.3);

  transition: transform 500ms;
  transform: ${(props) => (props.$isOpen ? 'translateX(0)' : 'translateX(450px)')};

  overflow: -moz-scrollbars-vertical;
  overflow-y: scroll;

  & > * {
    padding: 1.5rem 0;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }
`;

export const Header = styled.h2`
  font-size: 1.3rem;
`;

export const WrapperList = styled.ol`
  display: flex;
  flex-direction: column;
`;

export const WrapperControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 0.3rem;
`;