import React, { useState } from "react";
import dynamic from "next/dynamic";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface Pages {
  title: string;
  content: string;
  slug: string;
}

const Editor: any = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const RichTextExample = ({
  setTextList,
  index,
}: {
  setTextList: (updater: (prev: Pages[]) => Pages[]) => void; 
  index: number;
}) => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const onEditorStateChange = (newEditorState: EditorState): void => {
    setEditorState(newEditorState);
    const content = JSON.stringify(convertToRaw(newEditorState.getCurrentContent()));
    setTextList((prev) =>
      prev.map((item, idx) =>
        idx === index
          ? {
              ...item,
              content,
            }
          : item
      )
    );
  };

  return (
    <div className="border border-lg">
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
    </div>
  );
};

export default RichTextExample;
