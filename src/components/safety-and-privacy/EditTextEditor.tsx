'use client'

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles for quill

interface PagesArray {
  title: string;
  content: string;
  slug: string;
  sectionId: string;
  _id?: string | undefined;
}

interface EditTextEditorProps {
  setTextList: React.Dispatch<React.SetStateAction<PagesArray[]>>;
  index: number;
  textList: PagesArray[];
  disable?: boolean
  newPage: boolean
}

const RichTextExample: React.FC<EditTextEditorProps> = ({
  setTextList,
  index,
  textList,
  disable,
  newPage
}) => {
  const [editorState, setEditorState] = useState<string>("");

  const onEditorStateChange = (newEditorState: string): void => {
    setEditorState(newEditorState);
    setTextList((prev) =>
      prev.map((item, idx) =>
        idx === index
          ? {
            ...item,
            content: newEditorState,
          }
          : item
      )
    );
  };

  useEffect(() => {
    const content = textList[index]?.content;
    if (content && content !== editorState) {
      setEditorState(content);
    }
  }, [textList, index, editorState]);

  const toolbarOptions = [
    [{ 'header': '1' }, { 'header': '2' }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'align': [] }],
    ['link'],
    [{ color: ["#edb524", "#FFFFFF", "#000000", "#808080", "#D3D3D3", "#A9A9A9", "#FF0000", "#008000", "#0000FF", "#FFFF00", "#00FFFF", "#FF00FF", "#F08080", "#CD5C5C", "#DC143C", "#8B0000", "#90EE90", "#00FF00", "#228B22", "#006400", "#87CEEB", "#1E90FF", "#4169E1", "#000080", "#FFFFE0", "#FFD700", "#DAA520", "#B8860B", "#FFA500", "#FF8C00", "#FF7F50", "#FF6347", "#E6E6FA", "#DA70D6", "#9370DB", "#9400D3", "#F5F5DC", "#DEB887", "#8B4513", "#D2691E", "#D2B48C", "#FFFFF0", "#F0E68C"] }, { background: ["#edb524", "#FFFFFF", "#000000", "#808080", "#D3D3D3", "#A9A9A9", "#FF0000", "#008000", "#0000FF", "#FFFF00", "#00FFFF", "#FF00FF", "#F08080", "#CD5C5C", "#DC143C", "#8B0000", "#90EE90", "#00FF00", "#228B22", "#006400", "#87CEEB", "#1E90FF", "#4169E1", "#000080", "#FFFFE0", "#FFD700", "#DAA520", "#B8860B", "#FFA500", "#FF8C00", "#FF7F50", "#FF6347", "#E6E6FA", "#DA70D6", "#9370DB", "#9400D3", "#F5F5DC", "#DEB887", "#8B4513", "#D2691E", "#D2B48C", "#FFFFF0", "#F0E68C"] }],
    [{ 'font': [] }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
  ];

  return (
    <div className="border border-lg">
      <ReactQuill
        value={editorState}
        onChange={onEditorStateChange}
        modules={{
          toolbar: toolbarOptions,
        }}
        placeholder="Type your text here"
        readOnly={disable}
      />
    </div>
  );
};

export default RichTextExample;
