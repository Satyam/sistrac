import React, { Component, Fragment } from 'react';
import Confirm from './Confirm';

const withConfirm = BaseComponent =>
  class ConfirmToggler extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
    showConfirm = args => {
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
        handleClose(false);
      }
    };
    handleConfirm = value => {
      const { resolve } = this;
      if (resolve) resolve(value);
      this.setState({ open: false });
    };
    render() {
      return (
        <Fragment>
          <Confirm {...this.state} onConfirm={this.handleConfirm} />
          <BaseComponent {...this.props} showConfirm={this.showConfirm} />;
        </Fragment>
      );
    }
  };
export default withConfirm;
