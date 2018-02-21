import React from 'react';
import PropTypes from 'prop-types';
import Modal from './';
import { Button } from '..';

const Example = ({ showPrompt }) => (
  <div>
    {/*<Modal open>
      <Modal.Header closeButton>
        <h4>Titulo</h4>
      </Modal.Header>
      <Modal.Body>Este es el cuerpo del modal</Modal.Body>
      <Modal.Footer>
        <Button color="primary">aceptar</Button>
        <Button className="close-button">cerrar</Button>
      </Modal.Footer>
    </Modal>
    <Modal.Alert open title="título" buttonLabel="Aceptar">
      Este es el cuerpo de la alerta
    </Modal.Alert>
    <Modal.Confirm open title="¿Está seguro?" yesLabel="Sí" noLabel="No">
      ¿Seguro que desea hacer esto?
    </Modal.Confirm>
    */}
    <Button
      onClick={() =>
        showPrompt({
          title: 'título',
          body: 'este es el cuerpo',
        }).then(result => console.log('cerrado', result))
      }
    >
      withAlert
    </Button>
    <p>Relleno</p>
    <p>Relleno</p>
    <p>Relleno</p>
    <p>Relleno</p>
    <p>Relleno</p>
    <p>Relleno</p>
    <p>Relleno</p>
    <p>Relleno</p>
    <p>Relleno</p>
    <p>Relleno</p>
    <p>Relleno</p>
    <p>Relleno</p>
    <p>Relleno</p>
    <p>Relleno</p>
    <p>Relleno</p>
    <p>Relleno</p>
    <p>Relleno</p>
    <p>Relleno</p>
    <p>Relleno</p>
    <p>Relleno</p>
    <p>Relleno</p>
    <p>Relleno</p>
    <p>Relleno</p>
    <p>Relleno</p>
    <p>Relleno</p>
    <p>Relleno</p>
    <p>Relleno</p>
  </div>
);

Example.propTypes = {
  showPrompt: PropTypes.func,
};
export default Modal.withPrompt(Example);
