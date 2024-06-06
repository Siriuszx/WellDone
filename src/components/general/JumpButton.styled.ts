import styled from 'styled-components';
import { motion } from 'framer-motion';
import tw from 'twin.macro';

export const Wrapper = styled(motion.div)`
  ${tw`flex flex-col justify-center items-center fixed bottom-8 right-10`}
`;
