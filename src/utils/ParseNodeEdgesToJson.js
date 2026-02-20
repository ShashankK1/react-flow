const parseViewBasedOnNodesAndEdges = (nodes, edges) => {
  const nodeMap = {};
  nodes.forEach((node) => {
    nodeMap[node.id] = {
      id: node.id,
      data: {
        displayId: node.data?.displayId,
        label: node.data?.label,
        description: node.data?.description,
        incoming: [],
        outgoing: [],
      },
    };
  });

  edges.forEach((edge) => {
    if (nodeMap[edge.source]) {
      nodeMap[edge.source].data.outgoing.push({
        id: edge.target,
        label: edge.label,
      });
    }
    if (nodeMap[edge.target]) {
      nodeMap[edge.target].data.incoming.push({
        id: edge.source,
      });
    }
  });

  return Object.values(nodeMap);
};

export default parseViewBasedOnNodesAndEdges;
