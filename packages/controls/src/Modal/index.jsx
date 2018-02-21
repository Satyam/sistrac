import Modal from './Modal';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import Alert from './Alert';
import withAlert from './withAlert';
import Confirm from './Confirm';
import withConfirm from './withConfirm';
import Prompt from './Prompt';
import withPrompt from './withPrompt';

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;
Modal.Alert = Alert;
Modal.withAlert = withAlert;
Modal.Confirm = Confirm;
Modal.withConfirm = withConfirm;
Modal.Prompt = Prompt;
Modal.withPrompt = withPrompt;

export default Modal;
export {
  Modal,
  Header,
  Body,
  Footer,
  Alert,
  withAlert,
  Confirm,
  withConfirm,
  Prompt,
  withPrompt,
};
