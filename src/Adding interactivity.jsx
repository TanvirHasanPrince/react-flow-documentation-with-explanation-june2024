import { useCallback } from "react";
import { Handle } from "reactflow";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";

const initialNodes = [
  {
    id: "1",
    type: "custom",
    position: { x: 0, y: 0 },
    data: { label: "Custom Node 1" },
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
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", style: { stroke: "#fd2d54" } },
  { id: "e2-3", source: "2", target: "3", style: { stroke: "#fd2d54" } },
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
      >
        <Controls />
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
          color="#ccc"
          variant={BackgroundVariant.Lines}
        />
      </ReactFlow>
    </div>
  );
}
