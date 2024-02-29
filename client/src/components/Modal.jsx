import "../styles/modal.scss";

const Modal = ({ connectionHandler, usernameRef, modal }) => {
  if (!modal) return null;

  return (
    <div className="modal">
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Input name</h3>
        </div>
        <div className="modal-body">
          <input type="text" ref={usernameRef} />
        </div>
        <div className="modal-footer">
          <button className="c-button" onClick={() => connectionHandler()}>
            Connect
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
