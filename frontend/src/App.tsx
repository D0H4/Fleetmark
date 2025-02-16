import { useState } from "react";
import MemoInput from "./components/MemoInput";
import MemoList from "./components/MemoList";

export interface Memo {
  id: number;
  title: string;
  text: string;
  createdAt: number; // 생성 시간 (타임스탬프)
  updatedAt: number; // 마지막 수정 시간 (타임스탬프)
}

function App() {
  const [memos, setMemos] = useState<Memo[]>([]);

  const addMemo = (text: string) => {
    if (text.trim() === "") return;
    const now = Date.now();
    const newMemo: Memo = {
      id: now,
      title: `Memo ${memos.length + 1}`,
      text,
      createdAt: now, // 처음 생성 시 현재 시간
      updatedAt: now, // 처음 생성 시 동일한 값
    };
    setMemos([...memos, newMemo]);
  };

  const deleteMemo = (id: number) => {
    setMemos(memos.filter((memo) => memo.id !== id));
  };

  const updateMemo = (id: number, newTitle: string, newText: string) => {
    setMemos(
      memos.map((memo) =>
        memo.id === id
          ? { ...memo, title: newTitle, text: newText, updatedAt: Date.now() }
          : memo
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