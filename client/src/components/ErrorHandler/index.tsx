import React, { Component } from 'react';

interface IState {
  errorOccurred: boolean;
}

interface IProps {

}

class ErrorHandler extends Component<IProps, IState> {
  state: IState;

  constructor(props: IProps) {
    super(props);
    this.state = {
      errorOccurred: false
    };
  }

  componentDidCatch(error: Error, info: object): void {
    this.setState({ errorOccurred: true });
    console.log(error, info);
  }

  render(): any {
    return this.state.errorOccurred ? <h1>Something went wrong!</h1> : this.props.children;
  }
}

export default ErrorHandler;
