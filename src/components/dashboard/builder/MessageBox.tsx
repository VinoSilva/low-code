// Import libraries
import styled from "styled-components";

interface MessageBoxProps {
  text?: string | null;
  visible?: boolean; // Controls visibility of the floating window
}

const Container = styled.div<{
  visible: boolean;
}>`
  position: fixed;
  min-width: 300px;
  bottom: 10%; /* 90% from the top */
  left: 50%; /* Center horizontally */
  transform: translateX(-50%); /* Center adjustment */
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  color: #333;
  z-index: 1000;
  text-align: center;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.2s ease;
  pointer-events: ${({ visible }) => (visible ? "auto" : "none")};
`;

const MessageBox = ({ text, visible = false }: MessageBoxProps) => {
  return <Container visible={visible}>{text}</Container>;
};

export default MessageBox;
