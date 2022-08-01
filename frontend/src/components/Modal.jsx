import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Modal({ isShowing, toggle, hide, title, body }) {
  return isShowing
    ? ReactDOM.createPortal(
        <div className="modal-wrapper">
          <div>
            <div>
              <div className="modal-header">
                <button
                  type="button"
                  className="modal-close-button"
                  onClick={hide}
                >
                  X
                </button>
              </div>
              <div className="modal-body">
                <h4>{title}</h4>
                <p>{body}</p>
              </div>
            </div>
            <div className="button-modal-container">
              <Link to="/contact">
                <button
                  type="button"
                  onClick={toggle}
                  className="modal-button-preorder"
                >
                  {" "}
                  JE RÉSERVE{" "}
                </button>
              </Link>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
}

export default Modal;
