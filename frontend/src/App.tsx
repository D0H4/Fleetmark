import { useState, useEffect } from "react";
import MemoInput from "./components/MemoInput";
import MemoList from "./components/MemoList";

export interface Memo {
  id: number;
  title: string;
  text: string;
  createdAt: number; // 생성 시간 (타임스탬프)
  updatedAt: number; // 마지막 수정 시간 (타임스탬프)
}

// LocalStorage 키
const STORAGE_KEY = "memos";

function App() {
  const [memos, setMemos] = useState<Memo[]>([]);

  // 🚀 LocalStorage에서 메모 불러오기
  useEffect(() => {
    const savedMemos = localStorage.getItem(STORAGE_KEY);
    if (savedMemos) {
      setMemos(JSON.parse(savedMemos));
    }
  }, []);

  // 📝 LocalStorage에 메모 저장
  const saveMemosToLocalStorage = (memos: Memo[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memos));
  };

  // ✅ 메모 추가 기능 (LocalStorage 저장 포함)
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
    const updatedMemos = [...memos, newMemo];
    setMemos(updatedMemos);
    saveMemosToLocalStorage(updatedMemos);
  };

  // ❌ 메모 삭제 기능 (LocalStorage 저장 포함)
  const deleteMemo = (id: number) => {
    const updatedMemos = memos.filter((memo) => memo.id !== id);
    setMemos(updatedMemos);
    saveMemosToLocalStorage(updatedMemos);
  };

  // ✅ 메모 수정 기능 (LocalStorage 저장 포함)
  const updateMemo = (id: number, newTitle: string, newText: string) => {
    const now = Date.now();
    const updatedMemos = memos.map((memo) =>
      memo.id === id ? { ...memo, title: newTitle, text: newText, updatedAt: now } : memo
    );
    setMemos(updatedMemos);
    saveMemosToLocalStorage(updatedMemos);
  };

  return (
    <div className="app-container">
      <MemoInput onAddMemo={addMemo} />
      <MemoList memos={memos} onDeleteMemo={deleteMemo} onUpdateMemo={updateMemo} />
    </div>
  );
}

export default App;