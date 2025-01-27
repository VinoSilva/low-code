// Import libraries
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";

// Import types
import {
  Edge,
  Node,
  NodeTypes,
  TEmailNode,
  TLogNode,
  TMathNode,
} from "types/node.type";
import type { NodeProps } from "./Nodes/CustomNode";
import type { PinMouseEvent, PinType } from "./Pin";
import type { TPosition } from "types/canvas.type";

// Import constants
import { DeleteIcon, PlayIcon, StopIcon } from "@components/shared/icons";

// Import hooks
import useBoolean from "@hooks/useBoolean";

// Import components
import FloatingButton from "@components/shared/FloatingButton";
import MathNode, { TMathNodeValues } from "./Nodes/MathNode";
import EmailNode, { TEmailNodeValues } from "./Nodes/EmailNode";
import LogNode from "./Nodes/LogNode";
import AddNodeMenu from "./AddNodeMenu";
import DrawEdge from "./DrawEdge";
import NodeEdge from "./NodeEdge";
import { Log } from "types/log.type";
import MessageBox from "./MessageBox";
import { useMutation } from "@tanstack/react-query";
import { createLogs } from "@services/log.service";
import { TCreateLogRequest, TCreateLogResponse } from "types/api/log.api.type";
import { MUTATION } from "@constants/query";

// Helper function to delay execution
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const Wrapper = styled.div`
  position: fixed;
  min-width: 100vw;
  min-height: 100vh;
  top: 0px;
  left: 0px;
  overflow: scroll;
`;

const Board = styled.div<{ $isGrabbing?: boolean }>`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-size: 30px 30px;
  background-image: radial-gradient(
    circle,
    ${(props) => props.theme.colors.grey.main} 2px,
    ${(props) => props.theme.colors.grey.light} 1px
  );
  cursor: ${(props) => (props.$isGrabbing ? "isGrabbing" : "grab")};
`;

const WRAPPER_ID = "wrapper";
const BOARD_ID = "board";

const initialNodes: NodeTypes[] = [
  {
    id: "1",
    type: "EMAIL",
    data: { label: "Email Node" },
    position: { x: 100, y: 100 },
    recipient: "test@hotmail.com",
    subject: "Greetings",
    body: "Hello World",
  },
  {
    id: "2",
    type: "CALCULATION",
    data: { label: "Calculation Node" },
    position: { x: 600, y: 100 },
    input1: 2,
    input2: 2,
    operator: "*",
  },
];

const connections: Edge[] = [
  { from: "1", to: "2" }, // Output of Add node goes to Alert node
];

const Canvas = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(connections);

  const [isGrabbing, setIsisGrabbing] = useState<boolean>(false);
  const [clickedPosition, setClickedPosition] = useState<{
    x: number;
    y: number;
  }>({ x: -1, y: -1 });

  const { value: showContextMenu, toggle: toggleShowContextMenu } =
    useBoolean();

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<{
    from: string;
    to: string;
  } | null>(null);
  const [rightClickPos, setRightClickPos] = useState<{
    x: number;
    y: number;
  }>({ x: -1, y: -1 });
  const scaleRef = useRef<number>(1);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const logRefs = useRef<Omit<Log, "timestamp" | "logId">[]>([]);

  const [currentMessage, setCurrentMessage] = useState<string | null>(null);

  // Add or replace an edge
  const addEdge = useCallback((from: string, to: string) => {
    setEdges((prevEdges) => {
      // Remove any existing edge starting from the same node
      const filteredEdges = prevEdges.filter((edge) => edge.from !== from);
      // Add the new edge
      return [...filteredEdges, { from, to }];
    });
  }, []);

  const nodeMap = useMemo(() => {
    const map: { [k: string]: Node } = {};
    nodes.forEach((node) => {
      const { id } = node;
      map[id] = node;
    });
    return map;
  }, [nodes]);

  const [selectedPin, setSelectedPin] = useState<{
    nodeId: string;
    type: PinType;
  }>();

  const hoveredPin = useRef<{ nodeId: string; type: PinType } | undefined>(
    undefined
  );

  useEffect(() => {
    if (selectedPin) {
      const mouseUp = () => {
        if (hoveredPin.current) {
          const outId =
            selectedPin.type === "in"
              ? hoveredPin.current.nodeId
              : selectedPin.nodeId;
          const inId =
            selectedPin.type === "in"
              ? selectedPin.nodeId
              : hoveredPin.current.nodeId;

          addEdge(outId, inId);
        }

        setSelectedPin(undefined);
        hoveredPin.current = undefined;
      };

      window.addEventListener("mouseup", mouseUp);

      return () => {
        window.removeEventListener("mouseup", mouseUp);
      };
    }
  }, [selectedPin, addEdge]);

  useEffect(() => {
    const boardElement = document.getElementById(BOARD_ID);

    if (boardElement) {
      const zoomFunc = (e: WheelEvent) => {
        let scale = scaleRef.current + e.deltaY * -0.005;
        scale = Math.min(Math.max(1, scale), 2);

        boardElement.style.transform = `scale(${scale})`;
        boardElement.style.marginTop = `${(scale - 1) * 50}vh`;
        boardElement.style.marginLeft = `${(scale - 1) * 50}vw`;

        scaleRef.current = scale;
      };

      boardElement.addEventListener("wheel", zoomFunc, { passive: false });

      return () => {
        boardElement.removeEventListener("wheel", zoomFunc);
      };
    }
  }, []);

  const onMouseDownOnBoard = () => {
    setIsisGrabbing(true);
  };

  const onMouseUpOnBoard = () => {
    setIsisGrabbing(false);
  };

  const onMouseMoveOnBoard = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (isGrabbing) {
        const deltaX = e.clientX - clickedPosition.x;
        const deltaY = e.clientY - clickedPosition.y;

        const boardWrapperElement = document.getElementById(WRAPPER_ID);
        if (boardWrapperElement) {
          boardWrapperElement.scrollBy(-deltaX, -deltaY);
          setClickedPosition({ x: e.clientX, y: e.clientY });
        }
      }
    },
    [clickedPosition, isGrabbing]
  );

  const onSelectNode = useCallback((id: string | null) => {
    setSelectedNodeId(id);
    setSelectedEdge(null);
  }, []);

  const onPinSelected: PinMouseEvent = useCallback(({ nodeId, type }) => {
    setSelectedPin({ nodeId, type });
  }, []);

  const onPinHovered: PinMouseEvent = useCallback(
    ({ nodeId, type }) => {
      if (
        selectedPin &&
        selectedPin.type !== type &&
        selectedPin.nodeId !== nodeId
      ) {
        hoveredPin.current = { nodeId, type };
      }
    },
    [selectedPin]
  );

  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);
  const isRunning = useRef<boolean>(false);

  const onClickPlay = useCallback(() => {
    setIsPlaying(true);
    isRunning.current = true;
  }, []);

  const { mutate: createLogsMutation } = useMutation<
    TCreateLogResponse,
    Error,
    TCreateLogRequest
  >({
    mutationKey: [MUTATION.LOGS.CREATE],
    mutationFn: ({ data }) => createLogs({ data }),
  });

  const onClickStop = useCallback(() => {
    setCurrentMessage(null);
    setIsPlaying(false);
    isRunning.current = false;
    setCurrentPlayingId(null);

    createLogsMutation({ data: [...logRefs.current] });
    logRefs.current = [];
  }, [createLogsMutation]);

  useEffect(() => {
    const func = async () => {
      if (isPlaying && selectedNodeId) {
        let node = nodeMap[selectedNodeId];

        while (node) {
          if (!isRunning.current) {
            break;
          }

          setCurrentPlayingId(node.id);

          if (node.type === "CALCULATION") {
            const { input1, input2, operator } = node as TMathNode;

            let output = 0;

            if (operator === "*") {
              output = input1 * input2;
            } else if (operator === "+") {
              output = input1 * input2;
            }

            logRefs.current.push({
              nodeId: node.id,
              inputs: [input1 + "", operator as string, input2 + ""],
              output: `The result is ${output}`,
              status: "Success",
              errorMessage: "",
              nodeType: node.type,
            });

            setCurrentMessage(`The result is ${output}`);
          } else if (node.type === "EMAIL") {
            const { recipient, subject, body } = node as TEmailNode;

            const output = `${recipient}, ${subject}, ${body}`;

            logRefs.current.push({
              nodeId: node.id,
              inputs: [recipient, subject, body],
              output: output,
              status: "Success",
              errorMessage: "",
              nodeType: node.type,
            });
            setCurrentMessage(output);
          } else if (node.type === "LOG") {
            const { text } = node as TLogNode;

            logRefs.current.push({
              nodeId: node.id,
              inputs: [text],
              output: text,
              status: "Success",
              errorMessage: "",
              nodeType: node.type,
            });
            setCurrentMessage(text);
          }

          const findNextEdge = edges.find((el) => el.from === node.id);
          await delay(3000);

          if (findNextEdge) {
            node = nodeMap[findNextEdge.to];
          } else {
            onClickStop();
          }
        }
      }
    };

    func();
  }, [isPlaying, selectedNodeId, nodeMap, edges, onClickStop]);

  const onClickDeleteNode = useCallback(() => {
    if (selectedNodeId) {
      setNodes((prev) => prev.filter((el) => el.id !== selectedNodeId));

      setEdges((prev) =>
        prev.filter(
          (el) => el.from !== selectedNodeId && el.to !== selectedNodeId
        )
      );

      setSelectedNodeId(null);
    }
  }, [selectedNodeId]);

  const onClickDeleteEdge = useCallback(() => {
    if (selectedEdge) {
      setEdges((prevEdges) =>
        prevEdges.filter((edge) => edge.from !== selectedEdge.from)
      );
    }
  }, [selectedEdge]);

  const onMoved = useCallback(
    ({ newPosition, nodeId }: { newPosition: TPosition; nodeId: string }) => {
      const index = nodes.findIndex((el) => el.id === nodeId);

      if (index !== -1) {
        const data = nodes[index];
        const node: Node = { ...data };
        node.position = newPosition;
        const newNodes = [...nodes];

        newNodes[index] = node;

        setNodes(newNodes);
      }
    },
    [nodes]
  );

  const onChange = useCallback(
    (
      values: TMathNodeValues | TEmailNodeValues | { text: string },
      index: number
    ) => {
      const node = nodes[index];

      if (node) {
        const arr = JSON.parse(JSON.stringify(nodes)) as Node[];

        arr[index] = {
          ...node,
          ...values,
        };

        setNodes(arr);
      }
    },
    [nodes]
  );

  const renderNodes = useCallback(() => {
    return nodes.map((nodeProps, index) => {
      const { id, position, type } = nodeProps;
      const props: NodeProps = {
        id,
        onSelect: onSelectNode,
        x: position.x,
        y: position.y,
        $selected: id === selectedNodeId,
        onPinHovered,
        onPinSelected,
        onMoved,
        $playing: id === currentPlayingId,
      };

      switch (type) {
        case "CALCULATION":
          return (
            <MathNode
              key={id}
              input1={(nodeProps as TMathNode).input1}
              input2={(nodeProps as TMathNode).input2}
              operator={(nodeProps as TMathNode).operator}
              onChange={(val) => {
                onChange(val, index);
              }}
              {...props}
            />
          );
          break;
        case "LOG":
          return (
            <LogNode
              key={id}
              text={(nodeProps as TLogNode).text}
              onChange={(value) => {
                onChange({ text: value }, index);
              }}
              {...props}
            />
          );
          break;
        case "EMAIL":
          return (
            <EmailNode
              key={id}
              recipient={(nodeProps as TEmailNode).recipient}
              body={(nodeProps as TEmailNode).body}
              subject={(nodeProps as TEmailNode).subject}
              onChange={(values) => {
                onChange(values, index);
              }}
              {...props}
            />
          );
          break;
      }
    });
  }, [
    nodes,
    onSelectNode,
    selectedNodeId,
    onPinHovered,
    onPinSelected,
    onMoved,
    onChange,
    currentPlayingId,
  ]);

  const renderEdges = useCallback(() => {
    return edges.map(({ from, to }) => (
      <NodeEdge
        key={`${from}-${to}`}
        fromId={`${from}-out`}
        toId={`${to}-in`}
        selected={from === selectedEdge?.from && to === selectedEdge?.to}
        onSelectEdge={() => {
          setSelectedEdge({ from, to });
          setSelectedNodeId(null);
        }}
        onDeselectEdge={() => {
          setSelectedEdge(null);
        }}
      />
    ));
  }, [edges, selectedEdge]);

  const onRightClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.type === "contextmenu") {
      setRightClickPos({ x: e.clientX, y: e.clientY });
    }

    if (e.type === "contextmenu" && !showContextMenu) {
      toggleShowContextMenu();
    }

    e.preventDefault();
    e.stopPropagation();
  };

  const renderNodeModal = useCallback(() => {
    if (!showContextMenu) {
      return <></>;
    }

    return (
      <AddNodeMenu
        x={rightClickPos.x}
        onClose={toggleShowContextMenu}
        y={rightClickPos.y}
        onAdd={(node) => {
          setNodes((prev) => [
            ...prev,
            {
              ...node,
              position: {
                x: rightClickPos.x,
                y: rightClickPos.y,
              },
            },
          ]);
        }}
      />
    );
  }, [
    showContextMenu,
    rightClickPos.x,
    rightClickPos.y,
    toggleShowContextMenu,
  ]);

  const renderDrawEdge = useCallback(() => {
    if (!selectedPin) {
      return <></>;
    }

    return (
      <DrawEdge
        pinData={{ nodeId: selectedPin.nodeId, type: selectedPin.type }}
      />
    );
  }, [selectedPin]);

  const renderDeleteButton = useCallback(() => {
    if (isPlaying) {
      return <></>;
    }

    if (selectedNodeId) {
      return (
        <FloatingButton
          onClick={onClickDeleteNode}
          style={{ top: 30, right: 20, marginRight: 20 }}
        >
          <DeleteIcon />
        </FloatingButton>
      );
    }

    if (selectedEdge) {
      return (
        <FloatingButton
          onClick={onClickDeleteEdge}
          style={{ top: 30, right: 20, marginRight: 20 }}
        >
          <DeleteIcon />
        </FloatingButton>
      );
    }

    return <></>;
  }, [
    onClickDeleteNode,
    onClickDeleteEdge,
    selectedNodeId,
    selectedEdge,
    isPlaying,
  ]);

  const renderPlayButton = useCallback(() => {
    return (
      <FloatingButton
        onClick={isPlaying ? onClickStop : onClickPlay}
        style={{
          top: 30,
          right: 80,
          marginRight: 20,
          visibility: selectedNodeId || isPlaying ? "visible" : "hidden",
        }}
      >
        {isPlaying ? <StopIcon /> : <PlayIcon />}
      </FloatingButton>
    );
  }, [isPlaying, onClickPlay, onClickStop, selectedNodeId]);

  return (
    <Wrapper id={WRAPPER_ID}>
      <Board
        id={BOARD_ID}
        onMouseDown={onMouseDownOnBoard}
        onMouseUp={onMouseUpOnBoard}
        onMouseMove={onMouseMoveOnBoard}
        $isGrabbing={isGrabbing}
        onContextMenu={onRightClick}
      >
        {renderEdges()}
        {renderNodes()}
        {renderNodeModal()}
        {renderDrawEdge()}
        {renderPlayButton()}
        {renderDeleteButton()}
        <MessageBox text={currentMessage} visible={!!currentMessage} />
      </Board>
    </Wrapper>
  );
};

export default Canvas;
