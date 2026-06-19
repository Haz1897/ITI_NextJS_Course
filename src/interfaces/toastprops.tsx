import Quote from "./quote";

export default interface ToastProps {
  quote: Quote;
  close: () => void;
}
