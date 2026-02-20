import { ReactFlow, Background } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import Node from "../Node";

const nodeTypes = {
  custom: Node,
};

const Canvas = (props) => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, onNodeClick } =
    props || {};
  return (
    <div className="w-full h-full text-black">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        fitView
      >
        <Background />
      </ReactFlow>
    </div>
  );
};

export default Canvas;
