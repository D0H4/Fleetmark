import { useState } from "react";
import { Memo } from "../App";

interface MemoEditModalProps {
  memo: Memo;
  onSave: (title: string, text: string) => void;
  onCancel: () => void;
}

const MemoEditModal: React.FC<MemoEditModalProps> = ({ memo, onSave, onCancel }) => {
  const [title, setTitle] = useState(memo.title);
  const [text, setText] = useState(memo.text);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (e.shiftKey && e.currentTarget.tagName === "TEXTAREA") {
        return; // Shift + Enter → 줄바꿈 유지
      }
      e.preventDefault();
      onSave(title, text); // Enter → 저장 & 모달 닫기
    }
  };

  return (
    <div className="modal-overlay">
      <div className="edit-modal">
        <h3>Edit Memo</h3>
        <div className="edit-modal-group">
          <label className="edit-modal-label">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            className="edit-modal-input"
            placeholder="Type Title..."
          />
        </div>
        <div className="edit-modal-group">
          <label className="edit-modal-label">Describe</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="edit-modal-textarea"
            placeholder="Type Desc..."
          />
        </div>
        <div className="edit-modal-buttons">
          <button className="edit-save-button" onClick={() => onSave(title, text)}>Save</button>
          <button className="edit-cancel-button" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default MemoEditModal;