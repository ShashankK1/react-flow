import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import AddEdgeCard from "../AddEdgeCard";

const SidebarContent = (props) => {
  const {
    addNewNode,
    isOpen,
    selectedNode,
    handleEdit,
    error,
    handleRemoveEdge,
    edges,
    nodes,
    handleAddEdge,
  } = props || {};

  const [open, setOpen] = useState(isOpen);

  const [editableData, setEditableData] = useState({
    id: "",
    label: "",
    description: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(isOpen);
    }, 100);

    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (selectedNode?.root == null) {
      setEditableData({
        id: "",
        label: "",
        description: "",
      });
      return;
    } else {
      setEditableData({
        id: selectedNode?.root?.data?.displayId,
        label: selectedNode?.root?.data?.label || "",
        description: selectedNode?.root?.data?.description || "",
      });
    }
  }, [selectedNode]);

  useEffect(() => {
    if (!selectedNode) return;

    const actualId = selectedNode?.root?.id;

    const timer = setTimeout(() => {
      handleEdit?.({
        ...editableData,
        actualId,
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [editableData]);

  const handleChange = (field, value) => {
    setEditableData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  return (
    <div className="flex flex-col gap-2 w-full text-black">
      <button
        className="mt-6 w-full h-fit px-2 py-2 bg-blue-600 hover:bg-blue-700 text-white mb-2 rounded"
        onClick={addNewNode}
      >
        {open ? "Add Node" : "+"}
      </button>
      <hr className="my-4 border-gray-300" />
      {open ? (
        <div>
          {selectedNode?.root ? (
            <div>
              <p className="text-sm text-gray-500">Current selected node</p>
              <div className="my-6">
                <TextField
                  label="Node ID"
                  variant="outlined"
                  size="small"
                  value={editableData.id}
                  onChange={(e) => handleChange("id", e.target.value)}
                  fullWidth
                  error={!!error?.id}
                  helperText={error?.id}
                />
              </div>

              <div className="my-6">
                <TextField
                  label="Label"
                  variant="outlined"
                  size="small"
                  value={editableData.label}
                  onChange={(e) => handleChange("label", e.target.value)}
                  fullWidth
                  error={!!error?.label}
                  helperText={error?.label}
                />
              </div>

              <div className="my-6">
                <TextField
                  label="Description"
                  variant="outlined"
                  size="small"
                  value={editableData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  fullWidth
                  multiline
                  rows={3}
                  error={!!error?.description}
                  helperText={error?.description}
                />
              </div>

              <div className="mt-2" onClick={handleRemoveEdge}>
                <h4 className="text-sm text-gray-500 mb-3">Outgoing Edges:</h4>
                {selectedNode?.outgoing?.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {edges
                      ?.filter((edge) => edge.source === selectedNode?.root?.id)
                      ?.map((edge) => (
                        <div
                          key={edge.id}
                          className="flex gap-2 justify-between items-center"
                        >
                          <div>{edge.label}</div>
                          <div
                            data-edgeid={edge.id}
                            data-sourceid={edge.source}
                            data-targetid={edge.target}
                            className="h-5 w-5 rounded-full text-white bg-red-400 flex items-center justify-center cursor-pointer hover:bg-red-500"
                          >
                            -
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No outgoing nodes</p>
                )}
              </div>
              <hr className="my-4 border-gray-300" />

              <AddEdgeCard
                nodes={nodes}
                handleAddEdge={handleAddEdge}
                selectedNode={selectedNode}
              />
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              Select a node to see details
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default SidebarContent;
