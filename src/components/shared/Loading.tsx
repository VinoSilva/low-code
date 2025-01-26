// Import libraries
import styled, { keyframes } from "styled-components";

// Import constants
import { LoadingIcon } from "@constants/icons";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Rotate = styled.div`
  display: flex;
  animation: ${rotate} 1s linear infinite;
  justify-content: center;
  align-items: center;
  scale: 2;
`;

const Loading = () => {
  return (
    <Rotate>
      <LoadingIcon />
    </Rotate>
  );
};

export default Loading;
