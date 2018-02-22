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
        const {
          title = '',
          body = '',
          initialValue = '',
          yesLabel,
          yesColor,
          noLabel,
          placeholder = '',
        } = args;
        const self = this;
        return new Promise(resolve => {
          self.setState({
            title,
            initialValue,
            yesLabel,
            yesColor,
            noLabel,
            noColor,
            placeholder,
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
