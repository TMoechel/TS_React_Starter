import React from 'react';
import './App.css';
import Confirm from './components/Confirm'

interface IState {
  confirmOpen: boolean;
  confirmMessage: string;
}


// Generic Component declaration contains <Props,State>
// Type checking will be performed based on the generic parameiter
class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    // state is initialized in constructor
    this.state = {
      confirmOpen: false,
      confirmMessage : "Please hit the confirm button"
    };
  }
  
  handleOkClicked = () => this.setState( {
    confirmOpen: false, 
    confirmMessage: "Cool, carry on reading!"
  });

  handleCancelClicked = () => this.setState( {
    confirmOpen: false,
    confirmMessage: "Take a break, I'm sure you will later"})

  handleConfirmClick = () => this.setState( {
    confirmOpen: true
  });

  public render() {
    return (
      <div>
        <h2> Hello React </h2>
        <p>{this.state.confirmMessage}</p>
        <button onClick={this.handleConfirmClick}>Confirm</button>
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
