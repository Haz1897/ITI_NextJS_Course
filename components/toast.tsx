import Quote from "@/interfaces/quote";
import ToastProps from "@/interfaces/toastprops";

const Toast = ({ quote, close }: ToastProps) => {
  return (
    <div
      className="toast show shadow border-0 rounded-4 mb-3 overflow-hidden"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="toast-header bg-dark text-white border-bottom-0 py-2 px-3">
        <strong className="me-auto fw-semibold">{quote.author}</strong>
        <small className="text-white-50 ms-2">
          {quote.tags.length > 0 ? quote.tags[0] : "Quote"}
        </small>
        <button
          type="button"
          className="btn-close btn-close-white ms-3"
          data-bs-dismiss="toast"
          aria-label="Close"
          onClick={close}
        ></button>
      </div>
      <div className="toast-body bg-white p-3 text-secondary lh-base">
        "
        {quote.text.length > 200
          ? quote.text.slice(0, 200) + "..."
          : quote.text}
        "
      </div>
    </div>
  );
};
export { Toast };
