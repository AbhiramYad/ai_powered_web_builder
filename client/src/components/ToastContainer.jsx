import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state/index.js';

function ToastContainer() {
  const toast = useSelector((state) => state.toast.toast);
  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    if (toast) {
      const timerId = setTimeout(() => {
        actions.hideToast();
      }, 3000);
      return () => clearTimeout(timerId);
    }
  }, [toast, dispatch]);

  if (!toast) return null;

  return (
    <div className={`toast-notification toast-${toast.type}`}>
      <p className="toast-message">{toast.message}</p>
      <button className="toast-close" onClick={() => actions.hideToast()}>
        &times;
      </button>
    </div>
  );
}


export default ToastContainer;
