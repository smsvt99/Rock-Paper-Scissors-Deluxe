import React, { Component } from 'react';
import './App.css';

import Menu from './Menu/Menu'

class App extends Component {
  state = {
    my_stats : {
      hp : 3,
      pp : {
        rock : 3,
        paper : 3,
        scissors : 3,
      }
    },
    enemy_stats : {
      hp : 3,
      pp : {
        rock : 3,
        paper : 3,
        scissors : 3,
      }
    },
    my_attack : null,
    my_defence: null,
    enemy_attack: null,
    enemy_defence: null,
    view: 'select',
    choices: ['rock', 'paper', 'scissors'],
    choices_index: 0
  }

  componentDidMount(){
    window.addEventListener('keydown', (e)=>{
      // console.log(e.key)
        switch (e.key) {
            // case "Down":
            case "ArrowDown":
                e.preventDefault();
                this.cycle_index_up(this.state.choices_index);
                break;
            // case "Up":
            case "ArrowUp":
                e.preventDefault();
                this.cycle_index_down(this.state.choices_index);
                break;
            case "Enter":
                console.log('enter')
                break;
            default:
                console.log('there was a problem')
        }
    }, true)
}

  set_attack = () => {
    this.setState({
      my_attack : this.state.choices[this.state.choices_index]
    })
  }
  set_defence = () => {
    this.setState({
      my_defence : this.state.choices[this.state.choices_index]
    })
  }
  cycle_index_up(choices_index){
    let new_index;
    let index = choices_index;
    if (index === 2){
      new_index = 0
    } else {
      new_index = index + 1;
    }
    this.setState({
      choices_index : new_index
    })
    console.log(this.state.choices_index)
  }
  cycle_index_down(choices_index){
    let new_index;
    let index = choices_index;
    if (index === 0){
      new_index = 2
    } else {
      new_index = index - 1;
    }
    this.setState({
      choices_index : new_index
    })
    console.log(this.state.choices_index)
  }
  render() {
    return (
      <div id="wrapper">
        <Menu
          my_stats = {this.state.my_stats}
          choices = {this.state.choices}
          choices_index = {this.state.choices_index}
          // set_attack = {this.state.set_attack}
          // set_defence = {this.state.defence}
          // cycle_index_up = {this.cycle_index_up}
          // cycle_index_down = {this.cycle_index_down}
        />
      </div>
    )
  }
}

export default App;
