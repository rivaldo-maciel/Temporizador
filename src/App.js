import React from 'react';
import './App.css';
import Timer from './Timer';
import BeforeTimer from './BeforeTimer ';
import cano from './images/pngegg.png'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      start: true,
      time: 0,
    }

    this.toggleButton = this.toggleButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,    
    });
  }

  toggleButton() {
    this.setState((prevState) => ({
      start: !prevState.start,
    }));
  }

  render(){
    const { start, time } = this.state;
  return (
    <main>
      <div className='input-container'>
      <div>
        { start ? (<><BeforeTimer /> <label>Minutos: <input onChange={ this.handleChange } name="time" type="number" value={ time } /></label></>) : <Timer time={ time } />}
      </div>
      <div className='button-container'>
      <img className='cano' src={cano} alt='cano'/>
      <button className="btn btn-success" onClick={ this.toggleButton }>Rusbé</button>
      <img className='cano' src={cano} alt='cano'/>
      </div>
      </div>
    </main>
  )
}
}

export default App;
