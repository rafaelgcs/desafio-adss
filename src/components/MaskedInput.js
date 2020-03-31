import React, { Component } from "react";
import MaskedInput from "react-text-mask";

export class TextInput extends Component {
  checkHours = value => {
    if (value[0] === "2") {
      return /[0-3]/;
    } else {
      return /[0-9]/;
    }
  };

  render() {
    const { inputRef, ...other } = this.props;
    return (
      <MaskedInput
        {...other}
        ref={ref => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={[/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/]}
      />
    );
  }
}

export class CardInput extends Component {
  checkHours = value => {
    if (value[0] === "2") {
      return /[0-3]/;
    } else {
      return /[0-9]/;
    }
  };

  render() {
    const { inputRef, ...other } = this.props;
    return (
      <MaskedInput
        {...other}
        ref={ref => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={[/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
      />
    );
  }
}
export class VencimentoInput extends Component {
  checkHours = value => {
    if (value[0] === "2") {
      return /[0-3]/;
    } else {
      return /[0-9]/;
    }
  };

  render() {
    const { inputRef, ...other } = this.props;
    return (
      <MaskedInput
        {...other}
        ref={ref => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={[/[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
      />
    );
  }
}
export class CodSegurancaInput extends Component {
  checkHours = value => {
    if (value[0] === "2") {
      return /[0-3]/;
    } else {
      return /[0-9]/;
    }
  };

  render() {
    const { inputRef, ...other } = this.props;
    return (
      <MaskedInput
        {...other}
        ref={ref => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={[/[0-9]/, /[0-9]/, /[0-9]/]}
      />
    );
  }
}