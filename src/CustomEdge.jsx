import React from "react";
import { getBezierPath, EdgeLabelRenderer, BaseEdge } from "reactflow";

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style,
  data,
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  // Calculate positions for the source and target labels
  const sourceLabelX = sourceX + (targetX - sourceX) * 0.25;
  const sourceLabelY = sourceY + (targetY - sourceY) * 0.25;
  const targetLabelX = sourceX + (targetX - sourceX) * 0.75;
  const targetLabelY = sourceY + (targetY - sourceY) * 0.75;

  return (
    <>
      <BaseEdge id={id} path={edgePath} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${sourceLabelX}px, ${sourceLabelY}px)`,
            background: "#ffcc00",
            padding: 10,
            borderRadius: 5,
            fontSize: 12,
            fontWeight: 700,
          }}
          className="nodrag nopan"
        >
          {data.sourceLabel}
        </div>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${targetLabelX}px, ${targetLabelY}px)`,
            background: "#ffcc00",
            padding: 10,
            borderRadius: 5,
            fontSize: 12,
            fontWeight: 700,
          }}
          className="nodrag nopan"
        >
          {data.targetLabel}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;
