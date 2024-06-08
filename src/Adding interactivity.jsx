import { useCallback } from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import { ControlButton, Handle } from "reactflow";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import CustomEdge from "./CustomEdge"; // Import your custom edge component
import "reactflow/dist/style.css";

const initialNodes = [
  {
    id: "1",
    type: "custom",
    position: { x: 0, y: 0 },
    data: { label: "Custom Node " },
  },
  {
    id: "2",
    type: "custom",
    position: { x: 0, y: 100 },
    data: { label: "Custom Node 2" },
  },
  {
    id: "3",
    type: "custom",
    position: { x: 200, y: 100 },
    data: { label: "Custom Node 3" },
  },

  {
    id: "4",
    type: "custom",
    position: { x: 500, y: 500 },
    data: { label: "Custom Node 4" },
  },
];

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    style: { stroke: "#fd2d54" },
    data: { sourceLabel: "Start of Edge 1", targetLabel: "End of Edge 1" },
    type: "custom", // specify the type of edge
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    style: { stroke: "#fd2d54" },
    data: { sourceLabel: "Start of Edge 2", targetLabel: "End of Edge 2" },
    type: "custom", // specify the type of edge
  },

  {
    id: "e3-4",
    source: "3",
    target: "4",
    style: { stroke: "#fd2d54" },
    data: { sourceLabel: "Start of Edge 3", targetLabel: "End of Edge 3" },
    type: "custom", // specify the type of edge
  },
];

const CustomNode = ({ data }) => {
  return (
    <div
      style={{
        padding: "10px",
        border: "2px solid #fc466b",
        borderRadius: "5px",
        backgroundColor: "#eeaeca",
        color: "#333",
        boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
      }}
    >
      {data.label}
      <Handle
        type="source"
        position="right"
        style={{ background: "#22c1c3" }}
      />
      <Handle type="target" position="left" style={{ background: "#22c1c3" }} />

      <Handle type="target" position="top" style={{ background: "#22c1c3" }} />

      <Handle
        type="target"
        position="bottom"
        style={{ background: "#22c1c3" }}
      />
    </div>
  );
};

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params }, eds)),
    [setEdges]
  );

  const nodeTypes = {
    custom: CustomNode,
  };

  const edgeTypes = {
    custom: CustomEdge,
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(to right, #eeaeca, #94bbe9)",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
      >
        <Controls>
          <ControlButton
            onClick={() => alert("Something magical just happened. ✨")}
          >
            <PlusIcon />
          </ControlButton>
        </Controls>
        <MiniMap />
        <Background
          id="1"
          gap={10}
          color="#f1f1f1"
          variant={BackgroundVariant.Dots}
        />
        <Background
          id="2"
          gap={100}
          color="#22c1c3"
          variant={BackgroundVariant.Lines}
        />
      </ReactFlow>
    </div>
  );
}
