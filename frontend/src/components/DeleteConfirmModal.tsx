interface DeleteConfirmModalProps {
    onConfirm: () => void;
    onCancel: () => void;
  }
  
  const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ onConfirm, onCancel }) => {
    return (
      <div className="delete-modal-overlay">
        <div className="delete-modal-content">
          <h3>Are you sure?</h3>
          <p>This memo will be permanently deleted.</p>
          <div className="delete-modal-buttons">
            <button className="delete-confirm-button" onClick={onConfirm}>Confirm</button>
            <button className="delete-cancel-button" onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default DeleteConfirmModal;