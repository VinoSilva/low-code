// Import libraries
import Modal, { ModalProps } from "@components/shared/Modal";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

// Import types
import type { Node, NodeTypes, NodeTypesEnum } from "types/node.type";

// Import components
import MenuItem, { MenuItemType } from "@components/shared/MenuItem";

// Import constants
import { NODES_VALUE } from "@constants/node.constant";

interface AddMenuProps extends ModalProps {
  onAdd: (val: NodeTypes) => void;
}

const AddMenuHeader = styled.div`
  /* padding: 8px; */
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 16px;
`;

const MENU: MenuItemType[] = [
  {
    label: "Email",
    value: NODES_VALUE.EMAIL_NODE,
  },
  {
    label: "Log",
    value: NODES_VALUE.LOG_NODE,
  },
  {
    label: "Calculation",
    value: NODES_VALUE.CALC_NODE,
  },
];

const MenuItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  /* padding: 20px; */
`;

const AddNodeMenu = ({ onAdd, onClose, ...props }: AddMenuProps) => {
  const onClickAdd = (value: string) => {
    const data: Node = {
      position: { x: 1, y: 1 },
      id: uuidv4(),
      data: { label: value },
      type: value as unknown as NodeTypesEnum,
    };

    switch (value as unknown as NodeTypesEnum) {
      case "CALCULATION":
        onAdd({
          ...data,
          input1: 1,
          input2: 1,
          operator: "*",
        });
        break;
      case "EMAIL":
        onAdd({
          ...data,
          body: "",
          subject: "",
          recipient: "",
        });
        break;
      case "LOG":
        onAdd({
          ...data,
          text: "",
        });
        break;
      default:
        break;
    }

    if (onClose) {
      onClose();
    }
  };

  return (
    <Modal onClose={onClose} {...props}>
      <MenuItemContainer>
        <AddMenuHeader>NODES</AddMenuHeader>
        {MENU.map(({ label, value }) => (
          <MenuItem
            key={value}
            label={label}
            value={value}
            onSelect={onClickAdd}
          />
        ))}
      </MenuItemContainer>
    </Modal>
  );
};

export default AddNodeMenu;
