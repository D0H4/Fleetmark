import { useState } from "react";
import { Memo } from "../App";
import MemoEditModal from "./MemoEditModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

interface MemoListProps {
  memos: Memo[];
  onDeleteMemo: (id: number) => void;
  onUpdateMemo: (id: number, newTitle: string, newText: string) => void;
}

const MemoList: React.FC<MemoListProps> = ({ memos, onDeleteMemo, onUpdateMemo }) => {
  const [editMemo, setEditMemo] = useState<Memo | null>(null); // 수정할 메모 상태
  const [deleteMemoId, setDeleteMemoId] = useState<number | null>(null); // 삭제할 메모 상태
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null); // 미트볼 메뉴 상태

  return (
    <div className="memo-list">
      {memos.length === 0 ? (
        <p className="empty-message">No memos yet...</p>
      ) : (
        memos.map((memo) => (
          <div key={memo.id} className="memo-card">
            <div className="memo-header">
              <div className="memo-title">{memo.title}</div>
              <button className="menu-button" onClick={() => setMenuOpenId(menuOpenId === memo.id ? null : memo.id)}>
                ⋮
              </button>
              {menuOpenId === memo.id && (
                <div className="menu-dropdown">
                  <button onClick={() => { setEditMemo(memo); setMenuOpenId(null); }}>Edit</button>
                  <button onClick={() => { setDeleteMemoId(memo.id); setMenuOpenId(null); }}>Delete</button>
                </div>
              )}
            </div>
            <div className="memo-body">
              <p className="memo-text">{memo.text}</p>
            </div>
          </div>
        ))
      )}

      {/* 수정 모달 */}
      {editMemo && (
        <MemoEditModal
          memo={editMemo}
          onSave={(title, text) => {
            onUpdateMemo(editMemo.id, title, text);
            setEditMemo(null);
          }}
          onCancel={() => setEditMemo(null)}
        />
      )}

      {/* 삭제 확인 모달 */}
      {deleteMemoId !== null && (
        <DeleteConfirmModal
          onConfirm={() => {
            onDeleteMemo(deleteMemoId);
            setDeleteMemoId(null);
          }}
          onCancel={() => setDeleteMemoId(null)}
        />
      )}
    </div>
  );
};

export default MemoList;