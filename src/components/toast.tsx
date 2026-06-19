import Quote from "@/interfaces/quote";
import ToastProps from "@/interfaces/toastprops";

const Toast = ({ quote, close }: ToastProps) => {
  return (
    <div
      className="toast show shadow-lg"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="toast-header">
        <strong className="me-auto">{quote.author}</strong>
        <small className="text-body-secondary">
          {quote.tags.length > 0 ? quote.tags[0] : ""}
        </small>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
          onClick={close}
        ></button>
      </div>
      <div className="toast-body">
        {quote.text.length > 500
          ? quote.text.slice(0, 500) + "..."
          : quote.text}
      </div>
    </div>
  );
};
export { Toast };
