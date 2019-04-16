import React, { Component } from 'react';
import './App.css';

import Menu from './Menu/Menu'
import Display from './Display/Display'
import CharSelect from './CharSelect/CharSelect'
import Me from './Me/Me'

class App extends Component {
  state = {
    my_stats: {
      hp: 3,
      pp: {
        rock: 3,
        paper: 3,
        scissors: 3,
      }
    },
    enemy_stats: {
      hp: 3,
      pp: {
        rock: 3,
        paper: 3,
        scissors: 3,
      }
    },
    my_attack: null,
    my_defence: null,
    enemy_attack: null,
    enemy_defence: null,
    my_character: null,
    enemt_character: null,
    view: 'char_select',
    selection: 'attack',
    choices: ['rock', 'paper', 'scissors'],
    choices_index: 0,
    my_name: 'Noid',
    enemy_name: 'Timothy',
    display_text: ''
  }

  componentDidMount() {
    window.addEventListener('keydown', (e) => {
      if (this.state.view === 'select'){
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          this.cycle_index_up(this.state.choices_index);
          break;
        case "ArrowUp":
          e.preventDefault();
          this.cycle_index_down(this.state.choices_index);
          break;
        case "Enter":
          e.preventDefault();
          this.handle_enter();
          break;
        default:
          console.log('there was a problem')
      }
    // }, true)
      }
    })
  }

  set_attack = () => {
    this.setState({
      my_attack: this.state.choices[this.state.choices_index]
    })
  }
  set_defence = () => {
    this.setState({
      my_defence: this.state.choices[this.state.choices_index]
    })
  }
  cycle_index_up(choices_index) {
    let new_index;
    let index = choices_index;
    if (index === 2) {
      new_index = 0
    } else {
      new_index = index + 1;
    }
    this.setState({
      choices_index: new_index
    })
    // console.log(this.state.choices_index)
  }
  cycle_index_down(choices_index) {
    let new_index;
    let index = choices_index;
    if (index === 0) {
      new_index = 2
    } else {
      new_index = index - 1;
    }
    this.setState({
      choices_index: new_index
    })
    // console.log(this.state.choices_index)
  }
  handle_enter = () => {
    let choices = this.state.choices;
    let index = this.state.choices_index;
    let stats_copy = JSON.parse(JSON.stringify(this.state.my_stats))

    if (this.state.view === 'select' && this.state.selection === 'attack') {
      if (this.state.my_stats.pp[choices[index]] > 0) {
        stats_copy.pp[choices[index]]--;
        this.setState({
          my_attack: choices[index],
          selection: 'defence',
          my_stats: stats_copy
        })
        this.set_text("Select Defence")
      }
    } else if (this.state.view === 'select' && this.state.selection === 'defence') {
      if (this.state.my_stats.pp[choices[index]] > 0) {
        stats_copy.pp[choices[index]]--;
        this.setState({
          my_defence: choices[index],
          selection: '',
          my_stats: stats_copy,
          view: 'animation'
        })
        this.set_text("Waiting for Opponent...")
        this.get_enemy_move();
      }
    }
  }
  set_text = (my_text) => {
    this.setState({
      display_text: ""
    })
    setTimeout(() => {
      this.setState({
        display_text: my_text
      })
    }, 300)
  }

  get_enemy_move = () => {

    let attack;
    let defence;

    let moves = Object.keys(this.state.enemy_stats.pp).filter(name => {
      return this.state.enemy_stats.pp[name] > 0
    })
    console.log(moves)
    attack = moves[this.get_random_int(moves.length)]
    defence = moves[this.get_random_int(moves.length)]

    let stats_copy = JSON.parse(JSON.stringify(this.state.enemy_stats))
    stats_copy.pp[attack]--;
    stats_copy.pp[defence]--;

    console.log(attack, defence)
    setTimeout(() => {
      this.setState({
        enemy_stats: stats_copy,
        enemy_attack: attack,
        enemy_defence: defence
      })
      this.fight();
    }, 2500)
  }

  fight = () => {
    setTimeout(() => {
      this.set_text(`${this.state.my_name} uses ${this.state.my_attack.toUpperCase()}!`);
    }, 1000)

    setTimeout(() => {
      if (this.enemy_block_successful()) {
        this.set_text(`But ${this.state.enemy_name} blocks it with ${this.state.enemy_defence.toUpperCase()}!`);
      } else {
        this.set_text(`${this.state.enemy_name} tries to block with ${this.state.enemy_defence.toUpperCase()}...but it doesn't work`);
        this.take_damage('enemy')
      }
    }, 3000)

    setTimeout(() => {
      this.set_text(`${this.state.enemy_name} uses ${this.state.enemy_attack.toUpperCase()}!`);
    }, 6000)

    setTimeout(() => {
      if (this.my_block_successful()) {
        this.set_text(`But ${this.state.my_name} blocks it with ${this.state.my_defence.toUpperCase()}!`);
      } else {
        this.set_text(`${this.state.my_name} tries to block with ${this.state.my_defence.toUpperCase()}...but it doesn't work`);
        this.take_damage('me')
      }
    }, 9000)

    setTimeout(() => {
      if (!this.is_winner()){
      this.setState({
        view: 'select',
        selection: 'attack'
      })
      this.set_text('Select Attack')
    }
    }, 12500)
  }

  get_random_int = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }
  block_successful = (attack, defence) => {
    switch (attack) {
      case 'rock': return defence === 'paper' ? true : false
      case 'paper': return defence === 'scissors' ? true : false;
      case 'scissors': return defence === 'rock' ? true : false;
      default: console.log('something went wrong')
    }
  }
  my_block_successful = () => {
    return this.block_successful(this.state.enemy_attack, this.state.my_defence);
  }
  enemy_block_successful = () => {
    return this.block_successful(this.state.my_attack, this.state.enemy_defence);
  }
  take_damage = (person) => {
    //'me' or 'enemy'
    let stats;
    let key;
    if (person === 'me') {
      stats = this.state.my_stats
      key = 'my_stats'
    } else {
      stats = this.state.enemy_stats
      key = 'enemy_stats'
    }
    let stats_copy = JSON.parse(JSON.stringify(stats))
    stats_copy.hp--
    this.setState({
      [key]: stats_copy
    })
  }
  is_winner = () => {
    let hps = [this.state.my_stats.hp, this.state.enemy_stats.hp]
    if (hps[0] === 0 && hps[1] === 0){
      this.draw();
      return true;
    } else if (hps[0] === 0){
      this.set_text(`${this.state.enemy_name} wins!`)
      return true;
    } else if (hps[1] === 0){
      this.set_text(`${this.state.my_name} wins!`)
      return true;
    } else {
      return false
    }
  }

  draw = () => {
    this.set_text('Draw!')
  }
start = (char, name) => {
  if (!name.length){
    name = "anonymous"
  }
  this.setState({
    my_character: char,
    my_name: name,
    view: 'select',
    display_text: "Select Attack" 
  })
}


  render() {
    return (
      <div id="wrapper">
        <Me
          my_character = {this.state.my_character}
          my_attack = {this.state.my_attack}
          my_defence = {this.state.my_defence}
        />
        <CharSelect
          view={this.state.view}
          start = {this.start}
        />
        <Display
          display_text={this.state.display_text}
        />
        <Menu
          my_stats={this.state.my_stats}
          choices={this.state.choices}
          choices_index={this.state.choices_index}
          my_name={this.state.my_name}
          view = {this.state.view}
        />
      </div>
    )
  }
}

export default App;
