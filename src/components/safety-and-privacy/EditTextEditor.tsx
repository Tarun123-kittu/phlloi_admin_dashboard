import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles for quill

interface PagesArray {
  title: string;
  content: string;
  slug: string;
  sectionId: string;
  _id: string;
}

interface EditTextEditorProps {
  setTextList: React.Dispatch<React.SetStateAction<PagesArray[]>>;
  index: number;
  textList: PagesArray[];
  disable: boolean
}

const RichTextExample: React.FC<EditTextEditorProps> = ({
  setTextList,
  index,
  textList,
  disable
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
    ['link', 'image', 'video'],
    [{ 'color': [] }, { 'background': [] }],
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
