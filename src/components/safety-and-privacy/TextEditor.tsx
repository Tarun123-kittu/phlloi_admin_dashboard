// RichTextExample.tsx
import React, { useState } from "react";
import dynamic from "next/dynamic";
import ReactQuill from "react-quill"; // Import ReactQuill
import "react-quill/dist/quill.snow.css"; // Import default Quill theme CSS

// types.ts

export interface Pages {
  title: string;
  content: string;
  slug: string;
}


interface RichTextExampleProps {
  setTextList: (updater: (prev: Pages[]) => Pages[]) => void;
  index: number;
}

const RichTextExample: React.FC<RichTextExampleProps> = ({ setTextList, index }) => {
  const [editorValue, setEditorValue] = useState<string>("");

  const handleEditorChange = (value: string): void => {
    setEditorValue(value);

    // Update content in the textList
    setTextList((prev) =>
      prev.map((item, idx) =>
        idx === index
          ? { ...item, content: value } // Directly save the content as plain text
          : item
      )
    );
  };

  return (
    <div className="border border-lg">
      <ReactQuill
        value={editorValue}
        onChange={handleEditorChange}
        modules={{
          toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ align: [] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: ["#edb524", "#FFFFFF", "#000000", "#808080", "#D3D3D3", "#A9A9A9", "#FF0000", "#008000", "#0000FF", "#FFFF00", "#00FFFF", "#FF00FF", "#F08080", "#CD5C5C", "#DC143C", "#8B0000", "#90EE90", "#00FF00", "#228B22", "#006400", "#87CEEB", "#1E90FF", "#4169E1", "#000080", "#FFFFE0", "#FFD700", "#DAA520", "#B8860B", "#FFA500", "#FF8C00", "#FF7F50", "#FF6347", "#E6E6FA", "#DA70D6", "#9370DB", "#9400D3", "#F5F5DC", "#DEB887", "#8B4513", "#D2691E", "#D2B48C", "#FFFFF0", "#F0E68C"] }, { background: ["#edb524", "#FFFFFF", "#000000", "#808080", "#D3D3D3", "#A9A9A9", "#FF0000", "#008000", "#0000FF", "#FFFF00", "#00FFFF", "#FF00FF", "#F08080", "#CD5C5C", "#DC143C", "#8B0000", "#90EE90", "#00FF00", "#228B22", "#006400", "#87CEEB", "#1E90FF", "#4169E1", "#000080", "#FFFFE0", "#FFD700", "#DAA520", "#B8860B", "#FFA500", "#FF8C00", "#FF7F50", "#FF6347", "#E6E6FA", "#DA70D6", "#9370DB", "#9400D3", "#F5F5DC", "#DEB887", "#8B4513", "#D2691E", "#D2B48C", "#FFFFF0", "#F0E68C"] }], // Color changing buttons
            ["link"], // Image and link buttons
            ["blockquote", "code-block"],
            [{ script: "sub" }, { script: "super" }], // Subscript and superscript
            [{ indent: "-1" }, { indent: "+1" }], // Indentation buttons
            [{ direction: "rtl" }], // Right-to-left text direction
          ],
        }}
        theme="snow" // Use the default snow theme
      />
    </div>
  );
};

export default RichTextExample;
