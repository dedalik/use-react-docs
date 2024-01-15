import { useTextareaAutoSize } from "@dedalik/use-react";
import React, { useState, ChangeEvent } from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";

const TextareaAutoSize: React.FC = () => {
  const [text, setText] = useState("");
  const { textarea, setInput } = useTextareaAutoSize({ input: text });

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setText(newValue);
    setInput(newValue);
  };

  return (
    <div className="demo">
      <div>Type, and the textarea will expand:</div>
      <textarea
        ref={textarea}
        value={text}
        onChange={handleChange}
        className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-700 focus:border-blue-300 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        style={{ resize: "none" }}
      />
    </div>
  );
};

export default TextareaAutoSize;
