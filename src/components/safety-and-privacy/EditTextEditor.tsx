import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState,
} from "draft-js";
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
  textList,
}: {
  setTextList: (updater: (prev: Pages[]) => Pages[]) => void;
  index: number;
  textList: Pages[];
}) => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const onEditorStateChange = (newEditorState: EditorState): void => {
    setEditorState(newEditorState);
    const content = JSON.stringify(
      convertToRaw(newEditorState.getCurrentContent())
    );
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

  useEffect(() => {
    const content = textList[index]?.content;
    if (content && content !== JSON.stringify(convertToRaw(editorState.getCurrentContent()))) {
      try {
        const parsedContent = JSON.parse(content);
        const contentState = convertFromRaw(parsedContent);
        setEditorState(EditorState.createWithContent(contentState));
      } catch (error) {
        console.error("Failed to load content:", error);
      }
    }
  }, [textList, index, editorState]);

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
