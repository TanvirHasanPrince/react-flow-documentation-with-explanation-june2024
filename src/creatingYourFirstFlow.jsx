import ReactFlow from "reactflow";
import "reactflow/dist/style.css";

// Define the initial nodes for the flow diagram
const initialNodes = [
  { id: "1", position: { x: 50, y: -70 }, data: { label: "1" } }, // Node 1 with position and label
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } }, // Node 2 with position and label
  { id: "3", position: { x: 250, y: 100 }, data: { label: "3" } }, // Node 2 with position and label
];

// Define the initial edges that connect the nodes
const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e1-3", source: "1", target: "3" },
]; // Edge connecting node 1 to node 2

const CreatingYourFirstFlow = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow nodes={initialNodes} edges={initialEdges} />
    </div>
  );
};

export default CreatingYourFirstFlow;
