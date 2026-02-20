import React, { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

const AddEdgeCard = (props) => {
  const { nodes, selectedNode, handleAddEdge } = props || {};

  const [edgeData, setEdgeData] = useState({
    target: null,
    writingCondition: "",
  });

  const buttonDisable = !edgeData.target || !edgeData.writingCondition;

  const handleConditionChange = (event) => {
    setEdgeData((prev) => ({
      ...prev,
      writingCondition: event.target.value,
    }));
  };

  const handleTargetChange = (_, value) => {
    setEdgeData((prev) => ({
      ...prev,
      target: value,
    }));
  };

  const filterEdgesForSelectedNode =
    nodes?.filter(
      (node) =>
        node.id !== selectedNode?.root?.id &&
        !selectedNode?.outgoing?.some((n) => n.id === node.id),
    ) || [];

  return (
    <div className="flex flex-col gap-3 mt-6">
      <TextField
        label="Edge condition"
        variant="outlined"
        size="small"
        value={edgeData.writingCondition}
        onChange={handleConditionChange}
        fullWidth
      />

      <Autocomplete
        options={filterEdgesForSelectedNode}
        value={edgeData.target}
        onChange={handleTargetChange}
        getOptionLabel={(option) => option?.data?.displayId || ""}
        renderInput={(params) => (
          <TextField {...params} label="Search target Node" size="small" />
        )}
      />

      <button
        className="w-full px-2 py-2 bg-blue-600 hover:bg-blue-700 text-white mb-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={buttonDisable}
        onClick={() =>
          handleAddEdge({
            ...edgeData,
            targetId: edgeData.target.id,
          })
        }
      >
        Add edge
      </button>
    </div>
  );
};

export default AddEdgeCard;
