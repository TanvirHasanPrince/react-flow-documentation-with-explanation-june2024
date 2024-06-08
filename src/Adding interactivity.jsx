import { useCallback } from "react";
import { Handle } from "reactflow";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
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

/*
In this code block, I am telling what my nodes are going to look like initially, basically, what the inside of the node should look like. 

*/

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", style: { stroke: "#fd2d54" } },
  { id: "e2-3", source: "2", target: "3", style: { stroke: "#fd2d54" } },
];

/*
These are the edges of the node. Stroke-- This is the color: style: { stroke: "#fd2d54"
From the id----> e2-3, I am telling this line will go from node 2 to node 3. The souce and target are doing exactly that as well. 
*/

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
      // For this custom node, this is the style.
    >
      {data.label}
      {/* This is the lable that is showing up inside the node.  */}
      <Handle
        type="source"
        position="right"
        style={{ background: "#22c1c3" }}
        // Handles are mainly the point where the node is getting connected.
      />
      <Handle type="target" position="left" style={{ background: "#22c1c3" }} />
    </div>
  );
};

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // These are the inital states of the nodes. When I change they will change their position and everything so I am using the hooks given by the react-flow.

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params }, eds)),
    [setEdges]
  );

  /*
The onConnect function, defined using the useCallback hook, handles the creation of new edges between nodes in a ReactFlow diagram. It takes connection parameters and updates the list of edges by adding the new connection  The function is memoized to optimize performance, ensuring it only changes when the setEdges state setter function changes, thereby preventing unnecessary re-renders.
  */

  const nodeTypes = {
    custom: CustomNode, // Register your custom node type
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(to right, #eeaeca, #94bbe9)", // Gradient background
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
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
