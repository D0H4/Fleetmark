import { useState } from "react";

interface MemoInputProps {
  onAddMemo: (memo: string) => void;
}

const MemoInput: React.FC<MemoInputProps> = ({ onAddMemo }) => {
  const [memo, setMemo] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  const handleAddMemo = () => {
    if (memo.trim() === "") return;
    onAddMemo(memo);
    setMemo("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !isComposing) {
      if (e.shiftKey) {
        e.preventDefault();
        setMemo((prev) => prev + "\n");
      } else {
        e.preventDefault();
        handleAddMemo();
      }
    }
  };

  return (
    <div className="memo-input-container">
      <textarea
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        onKeyDown={handleKeyDown}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        placeholder="What’s happening?"
      />
      <button onClick={handleAddMemo}>Post</button>
    </div>
  );
};

export default MemoInput;