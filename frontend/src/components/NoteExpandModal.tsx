import { useState, useEffect } from "react";
import { Memo } from "../App";
import { FiEdit, FiEye } from "react-icons/fi"; // Edit & View 아이콘

interface NoteExpandModalProps {
  memo: Memo;
  onClose: () => void;
  onUpdate: (id: number, title: string, text: string, updatedAt: number) => void;
}

const formatDate = (timestamp?: number) => {
  if (!timestamp) return "N/A"; // timestamp가 없으면 "N/A" 반환
  const date = new Date(timestamp);
  return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date
    .getDate()
    .toString()
    .padStart(2, "0")} ${date.getHours().toString().padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
};

const NoteExpandModal: React.FC<NoteExpandModalProps> = ({ memo, onClose, onUpdate }) => {
  const [title, setTitle] = useState(memo.title);
  const [text, setText] = useState(memo.text);
  const [isEditMode, setIsEditMode] = useState(false);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // 모달 바깥 클릭 시 닫기
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="note-modal-overlay" onClick={handleOverlayClick}>
      <div className="note-modal-content">
        <div className="note-header">
          {isEditMode ? (
            <input
              className="note-title-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <h3 className="note-title">{title}</h3>
          )}
          <button className="mode-toggle-button" onClick={() => setIsEditMode(!isEditMode)}>
            {isEditMode ? <FiEye /> : <FiEdit />}
          </button>
        </div>
        <div className="note-body">
          {isEditMode ? (
            <textarea
              className="note-textarea"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          ) : (
            <p className="note-text">{text}</p>
          )}
        </div>
        <div className="note-timestamps">
          <p>Note Created: {formatDate(memo.createdAt)}</p>
          <p>Last Edited: {formatDate(memo.updatedAt)}</p>
        </div>
        {isEditMode && (
          <div className="note-modal-buttons">
            <button
              className="note-save-button"
              onClick={() => {
                const now = Date.now();
                onUpdate(memo.id, title, text, now);
                setIsEditMode(false);
              }}
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteExpandModal;