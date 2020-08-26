import React from 'react';
import './App.css';
import Confirm from './components/Confirm'

interface IState {
  confirmOpen: boolean;
  confirmMessage: string;
  confirmVisible: boolean;
  countDown: number;
}


// Generic Component declaration contains <Props,State>
// Type checking will be performed based on the generic parameiter
class App extends React.Component<{}, IState> {
  private timer: number = 0;
  private renderCount = 0;

  constructor(props: {}) {
    super(props);
    // state is initialized in constructor
    this.state = {
      confirmOpen: false,
      confirmMessage: "Please hit the confirm button",
      confirmVisible: true,
      countDown: 10
    };
  }

  public componentDidMount() {
    console.log(React.version);
    this.timer = window.setInterval(() => this.handleTimerTick(),
      1000);
  }

  public componentWillUnmount() {
    clearInterval(this.timer);
  }

  public static getDerivedStateFromProps(props: {}, state: IState) {
    console.log("getDerivedStateFromProps", props, state);
    return null;
  }

  public getSnapshotBeforeUpdate(prevProps: {}, prevState:
    IState) {
    this.renderCount += 1;
    console.log("getSnapshotBeforeUpdate", prevProps, prevState,
      {
        renderCount: this.renderCount
      });
    return this.renderCount;
  }

  public componentDidUpdate(prevProps: {}, prevState: IState,
    snapshot: number) {
    console.log("componentDidUpdate", prevProps, prevState,
      snapshot, {
      renderCount: this.renderCount
    });
  }

  public shouldComponentUpdate(nextProps: {}, nextState: IState) {
    console.log("shouldComponentUpdate", nextProps, nextState);
    return true;
  }

  private handleTimerTick() {
    this.setState(
      {
        confirmMessage: `Please hit the confirm button ${
          this.state.countDown
          } secs to go`,
        countDown: this.state.countDown - 1
      },
      () => {
        if (this.state.countDown <= 0) {
          clearInterval(this.timer);
          this.setState({
            confirmMessage: "Too late to confirm!",
            confirmVisible: false
          });
        }
      }
    );
  }

  handleOkClicked = () => {
    this.setState({
      confirmOpen: false,
      confirmMessage: "Cool, carry on reading!"
    });
    clearInterval(this.timer);
  };

  handleCancelClicked = () => {
    this.setState({
      confirmOpen: false,
      confirmMessage: "Take a break, I'm sure you will later"
    });
    clearInterval(this.timer);
  }

  handleConfirmClick = () => {
    this.setState({
      confirmOpen: true
    });
    clearInterval(this.timer);
  };

  public render() {
    return (
      <div>
        <h2> Hello React </h2>
        <p>{this.state.confirmMessage}</p>
        {
          this.state.confirmVisible && (
            <button onClick={this.handleConfirmClick}>Confirm</button>
          )}

        <Confirm
          open={this.state.confirmOpen}
          title="React and Typescript"
          content="You sure you want to learn React?"
          onOkClick={this.handleOkClicked}
          onCancelClick={this.handleCancelClicked}
        />

      </div>
    )
  }
}

export default App;
