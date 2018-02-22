import React, { Component, Fragment } from 'react';
import Prompt from './Prompt';

const withPrompt = BaseComponent =>
  class PromptToggler extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
    showPrompt = args => {
      if (args) {
        const { body, ...rest } = args;
        const self = this;
        return new Promise(resolve => {
          self.setState({
            ...rest,
            children: body,
            open: true,
            reset: true,
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
          <Prompt {...this.state} onConfirm={this.handleConfirm} />
          <BaseComponent {...this.props} showPrompt={this.showPrompt} />;
        </Fragment>
      );
    }
  };
export default withPrompt;
