import React, { Component, Fragment } from 'react';
import Alert from './Alert';

const withAlert = BaseComponent =>
  class AlertToggler extends Component {
    state = {};
    showAlert = args => {
      if (args) {
        const { body, ...rest } = args;
        const self = this;
        return new Promise(resolve => {
          self.setState({
            ...rest,
            children: body,
            open: true,
          });
          self.resolve = resolve;
        });
      } else {
        handleClose();
      }
    };
    handleClose = () => {
      const { resolve } = this;
      if (resolve) resolve();
      this.setState({ open: false });
    };
    render() {
      return (
        <Fragment>
          <Alert {...this.state} onClose={this.handleClose} />
          <BaseComponent {...this.props} showAlert={this.showAlert} />;
        </Fragment>
      );
    }
  };
export default withAlert;
