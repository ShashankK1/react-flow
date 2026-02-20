import { useState } from "react";
import clsx from "clsx";
import SidebarContent from "../SidebarContent";

const Sidebar = (props) => {
  const {
    addNewNode,
    selectedNode,
    handleEdit,
    error,
    handleRemoveEdge,
    edges,
    nodes,
    handleAddEdge,
  } = props || {};
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={clsx(
        "flex flex-col h-screen border-r border-gray-300 transition-all duration-300 px-4 relative text-black max-h-screen overflow-y-scroll",
        isOpen ? "w-96" : "w-16",
      )}
    >
      <div className="w-full bg-white sticky z-10 top-0 left-0">
        <button
          className="left-4 p-2 hover:bg-gray-200 rounded w-fit"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "← Collapse" : "→"}
        </button>
      </div>
      <SidebarContent
        addNewNode={addNewNode}
        isOpen={isOpen}
        selectedNode={selectedNode}
        handleEdit={handleEdit}
        error={error}
        edges={edges}
        handleRemoveEdge={handleRemoveEdge}
        nodes={nodes}
        handleAddEdge={handleAddEdge}
      />
    </div>
  );
};

export default Sidebar;
