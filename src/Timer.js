import React from "react";
import Beep from './sounds/mixkit-alarm-digital-clock-beep-989.wav'
import Music from './sounds/Michael_Jackson_-_Smooth_Criminal_[NaijaGreen (mp3cut.net).mp3'

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      maxTime: 0,
      minutes1: 0,
      minutes2: 0,
      seconds1: 0,
      seconds2: 0,
      audio: new Audio(Music),
      beep: new Audio(Beep),
    }
    this.setTime = this.setTime.bind(this);
    this.runTimeSeconds1 = this.runTimeSeconds1.bind(this);
    this.runTimeSeconds2 = this.runTimeSeconds2.bind(this);
    this.runTimeMinutes2 = this.runTimeMinutes2.bind(this);
    this.runTimeMinutes1 = this.runTimeMinutes1.bind(this);
    this.clearTime = this.clearTime.bind(this);
  }
  componentDidMount() {
    const { audio } = this.state;
    audio.play();
    this.setTime();
    this.runTimeSeconds2();
  }

  componentDidUpdate() {
    const { minutes1, minutes2, seconds1, seconds2, maxTime } = this.state;
    if (seconds2 > 9) {
      this.runTimeSeconds1();
    }
    if (seconds1 > 5) {
      this.runTimeMinutes2();
    }
    if (minutes2 > 9) {
      this.runTimeMinutes1();
    }
    if (minutes2 === parseInt(maxTime, 10) || minutes1 === parseInt(maxTime, 10)) {
      this.clearTime();
    }
  }

  componentWillUnmount() {
    clearInterval(this.idInterval);
    const { audio, beep } = this.state;
    audio.pause();
    beep.pause();

  }

  clearTime() {
    const { audio, beep } = this.state;
    clearInterval(this.idInterval);
    audio.pause();
    beep.play();
  }

  setTime() {
    const { time } = this.props;
    this.setState({
      maxTime: time,
    })
  }

  runTimeSeconds2() {
    this.idInterval = setInterval(() => {
      this.setState((prevState) => ({
        seconds2: prevState.seconds2 + 1,
      }))
    }, 1000)
  }

  runTimeSeconds1() {
    this.setState({seconds2: 0});
    this.setState((prevstate) => ({
      seconds1: prevstate.seconds1 + 1,
    }));
  }

  runTimeMinutes2() {
    this.setState({ seconds1: 0 });
    this.setState((prevstate) => ({
      minutes2: prevstate.minutes2 + 1,
    }))
  }
  
  runTimeMinutes1() {
    this.setState({ minutes2: 0 });
    this.setState((prevState) => ({
      minutes1: prevState.minutes1 + 1,
    }))
  }

  render() {
    const { minutes1, minutes2, seconds1, seconds2, maxTime } = this.state;
    return (
      <>
      <img className='gif' src='https://c.tenor.com/zdY-7id1E-UAAAAi/dance-dance-move.gif' alt='gif-mario-jackson' />
      <div className='timer-container'>
        <h1>{ maxTime }</h1>
        <span>{ minutes1 }{ minutes2 }:{ seconds1 }{ seconds2 }</span>
      </div>
      </>
    );
  }
}

export default Timer;