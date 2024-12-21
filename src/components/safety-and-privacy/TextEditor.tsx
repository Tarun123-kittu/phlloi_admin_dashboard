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
            [{ color: [] }, { background: [] }], // Color changing buttons
            ["link", "image"], // Image and link buttons
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
