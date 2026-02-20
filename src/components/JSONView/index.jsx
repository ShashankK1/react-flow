import JSONPretty from "react-json-pretty";
import parseViewBasedOnNodesAndEdges from "../../utils/ParseNodeEdgesToJson";
import { useState } from "react";

const JSONView = ({ nodes, edges }) => {
  const [copied, setCopied] = useState(false);
  const jsonData = parseViewBasedOnNodesAndEdges(nodes, edges);
  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const handleExportToJson = () => {
    const dataStr = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "workflow.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div>
      <div className="absolute right-0 top-0 flex gap-2">
        <button
          className="px-2 py-1 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded text-xs"
          onClick={handleCopy}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
        <button
          className="px-2 py-1 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded text-xs"
          onClick={handleExportToJson}
        >
          Export
        </button>
      </div>
      <JSONPretty data={jsonData} />
    </div>
  );
};

export default JSONView;
