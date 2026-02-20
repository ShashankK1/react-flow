import { Handle, Position } from "@xyflow/react";
import { useState } from "react";

const Node = (props) => {
  const { id, data } = props || {};
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="relative">
      <div
        className="p-3 rounded-lg border border-gray-300 bg-white min-w-[120px] text-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Handle type="target" position={Position.Top} />

        <div className="font-semibold text-xs">{data.label}</div>
        {data.description ? (
          <div className="text-[8px] text-gray-500 max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
            AAAA{data.description}
          </div>
        ) : null}
        {isHovered && data?.onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              data?.onDelete(id);
            }}
            className="absolute -top-2 -right-2 w-4 h-4 bg-red-600 text-white text-[10px] rounded-full flex items-center justify-center cursor-pointer border-none"
          >
            ✕
          </button>
        )}

        {data.isStart && (
          <div className="absolute -top-2 -left-2 w-6 h-6 bg-green-600 text-white text-xs font-semibold rounded-full flex items-center justify-center">
            S
          </div>
        )}

        <Handle type="source" position={Position.Bottom} />
      </div>
    </div>
  );
};

export default Node;
