import { useState } from "react";
import MemoInput from "./components/MemoInput";
import MemoList from "./components/MemoList";

export interface Memo {
  id: number;
  title: string;
  text: string;
}

function App() {
  const [memos, setMemos] = useState<Memo[]>([]);

  const addMemo = (text: string) => {
    if (text.trim() === "") return;
    const newMemo: Memo = {
      id: Date.now(),
      title: `Memo ${memos.length + 1}`,
      text,
    };
    setMemos([...memos, newMemo]);
  };

  const deleteMemo = (id: number) => {
    setMemos(memos.filter((memo) => memo.id !== id));
  };

  const updateMemo = (id: number, newTitle: string, newText: string) => {
    setMemos(
      memos.map((memo) =>
        memo.id === id ? { ...memo, title: newTitle, text: newText } : memo
      )
    );
  };

  return (
    <div className="app-container">
      <MemoInput onAddMemo={addMemo} />
      <MemoList memos={memos} onDeleteMemo={deleteMemo} onUpdateMemo={updateMemo} />
    </div>
  );
}

export default App;