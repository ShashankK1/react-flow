import { useState, useCallback } from "react";
import {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  getIncomers,
  getOutgoers,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import Sidebar from "../../components/Sidebar";
import Canvas from "../../components/Canvas";
import { NodeBuilder } from "../../utils/NodeBuilder";
import parseJsonToNodesEdges from "../../utils/ParseJsonToNodesEdges";

const initialNode = new NodeBuilder()
  .setPosition(100, 100)
  .setLabel("1st Node")
  .setType("custom")
  .setIsStart(true)
  .setDescription("This is the starting node of workflow")
  .build();

const Dasboard = () => {
  const [nodes, setNodes] = useState([initialNode]);
  const [edges, setEdges] = useState([]);
  const [error, setError] = useState({
    id: "",
    description: "",
    label: "",
  });

  const [selectedNode, setSelectedNode] = useState({
    root: null,
    incoming: [],
    outgoing: [],
  });

  const deleteNode = (nodeId) => {
    setSelectedNode({
      root: null,
      incoming: [],
      outgoing: [],
    });
    setNodes((prev) => prev.filter((n) => n.id !== nodeId));
    setEdges((prev) =>
      prev.filter((e) => e.source !== nodeId && e.target !== nodeId),
    );
  };

  const onNodesChange = useCallback(
    (changes) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback((params) => {
    const condition = prompt("Enter transition condition:");
    setSelectedNode({ root: null, incoming: [], outgoing: [] });
    if (!condition) return;

    setEdges((edgesSnapshot) =>
      addEdge(
        {
          ...params,
          label: condition,
        },
        edgesSnapshot,
      ),
    );
  }, []);

  const handleEdit = ({ id, label, description, actualId }) => {
    setNodes((prev) => {
      if (!id) return prev;
      const isDuplicate = prev.some(
        (node) => node.data?.displayId === id && node.id !== actualId,
      );

      if (isDuplicate) {
        setError((prev) => ({
          ...prev,
          id: "Node ID already exists. Please use a unique ID.",
        }));
        return prev;
      }

      if (description?.length <= 0) {
        setError((prev) => ({
          ...prev,
          description: "Description cannot be empty.",
        }));
        return prev;
      }

      if (label?.length <= 0) {
        setError((prev) => ({
          ...prev,
          label: "Label cannot be empty.",
        }));
        return prev;
      }

      setError((prev) => ({ ...prev, description: "", id: "", label: "" }));

      return prev.map((node) => {
        if (node.id === actualId) {
          return {
            ...node,
            data: {
              ...node.data,
              label,
              description,
              displayId: id,
            },
          };
        }
        return node;
      });
    });
  };

  const handleRemoveEdge = (event) => {
    const el = event.target.closest("[data-edgeid]");
    if (!el) return;
    const { edgeid, sourceid, targetid } = el.dataset;
    setEdges((prev) => prev.filter((edge) => edge.id !== edgeid));
    setNodes((prev) => {
      const sourceNode = prev.find((node) => node.id === sourceid);
      const targetNode = prev.find((node) => node.id === targetid);

      if (sourceNode) {
        sourceNode.data = {
          ...sourceNode.data,
          outgoing: (sourceNode.data?.outgoing || []).filter(
            (n) => n.id !== targetid,
          ),
        };
      }

      if (targetNode) {
        targetNode.data = {
          ...targetNode.data,
          incoming: (targetNode.data?.incoming || []).filter(
            (n) => n.id !== sourceid,
          ),
        };
      }

      return [...prev];
    });
  };

  const addNewNode = () => {
    setNodes((prev) => {
      const lastNode = prev.length > 0 ? prev[prev.length - 1] : null;

      const x = lastNode?.position?.x ?? 0;
      const y = (lastNode?.position?.y ?? 0) + 100;

      const newNode = new NodeBuilder()
        .setPosition(x, y)
        .setLabel("New node")
        .setType("custom")
        .setOnDelete(deleteNode)
        .setDescription("This is a newly added node. Click to edit.")
        .build();

      return [...prev, newNode];
    });
  };

  const onNodeClick = (_, node) => {
    const incomingNodes = getIncomers(node, nodes, edges);

    const outgoingNodes = getOutgoers(node, nodes, edges);

    setSelectedNode({
      root: node,
      incoming: incomingNodes,
      outgoing: outgoingNodes,
    });
  };

  const handleAddEdge = (edgeData) => {
    const sourceNodeId = selectedNode.root?.id;
    if (!sourceNodeId) return;

    setEdges((prev) =>
      addEdge(
        {
          source: sourceNodeId,
          target: edgeData.targetId,
          label: edgeData.writingCondition,
        },
        prev,
      ),
    );

    setNodes((prev) =>
      prev.map((node) => {
        if (node.id === sourceNodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              outgoing: [
                ...(node.data?.outgoing || []),
                { id: edgeData.targetId, label: edgeData.writingCondition },
              ],
            },
          };
        }
        if (node.id === edgeData.targetId) {
          return {
            ...node,
            data: {
              ...node.data,
              incoming: [...(node.data?.incoming || []), { id: sourceNodeId }],
            },
          };
        }
        return node;
      }),
    );
  };

  const handleImportJson = (json) => {
    const parsedData = parseJsonToNodesEdges(json);
    setNodes(
      parsedData.nodes?.map((node) => ({
        ...node,
        data: { ...node.data, onDelete: deleteNode },
      })),
    );
    setEdges(parsedData.edges);
    setSelectedNode({
      root: null,
      incoming: [],
      outgoing: [],
    });
  };

  return (
    <div className="flex w-full h-screen">
      <Sidebar
        addNewNode={addNewNode}
        selectedNode={selectedNode}
        edges={edges}
        handleEdit={handleEdit}
        error={error}
        handleRemoveEdge={handleRemoveEdge}
        nodes={nodes}
        handleAddEdge={handleAddEdge}
        handleImportJson={handleImportJson}
      />
      <div className="flex-1">
        <Canvas
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
        />
      </div>
    </div>
  );
};

export default Dasboard;
