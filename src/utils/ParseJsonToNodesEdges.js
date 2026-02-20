const parseJsonToNodesEdges = (json) => {
  const nodes = [];
  const edges = [];
  const nodeMap = {};
  let newX = 100;
  let newY = 100;
  json.forEach((item) => {
    const isStart = item.data.isStart || newY === 100 ? true : false;
    nodes.push({
      id: item.id,
      data: {
        label: item.data.label,
        description: item.data.description,
        displayId: item.data.displayId,
        isStart: isStart,
      },
      position: { x: newX, y: newY },
      type: "custom",
    });
    nodeMap[item.id] = item;
    newY += 100;
  });

  json.forEach((item) => {
    item.data.outgoing.forEach((outgoing) => {
      edges.push({
        id: `e${item.id}-${outgoing.id}`,
        source: item.id,
        target: outgoing.id,
        label: outgoing.label,
      });
    });
  });

  return { nodes, edges };
};

export default parseJsonToNodesEdges;
