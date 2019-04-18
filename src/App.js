import React, { Component } from 'react';
import './App.css';

import Menu from './Menu/Menu'
import Display from './Display/Display'
import CharSelect from './CharSelect/CharSelect'
import Me from './Me/Me'
import Enemy from './Enemy/Enemy'
import MyMove from './MyMove/MyMove'
import EnemyMove from './EnemyMove/EnemyMove'
import EnemyDefence from './EnemyDefence/EnemyDefence'
import MyDefence from './MyDefence/MyDefence'

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
    enemy_character: null,
    view: 'char_select',
    selection: 'attack',
    choices: ['rock', 'paper', 'scissors'],
    choices_index: 0,
    my_name: 'Noid',
    enemy_name: 'Timothy',
    display_text: '',
    animate_me: null,
    animate_my_move: null,
    animate_enemy: null,
    animate_enemy_defence: null,
    animate_enemy_move: null,
    names : {
      // me: document.getElementById('me'),
      // enemy: document.getElementById('enemy'),
      // my_move: document.getElementById('my_move'),
      // enemy_move: document.getElementById('enemy_move'),
      // my_defence: document.getElementById('my_defence'),
      // enemy_defence: document.getElementById('enemy_defence'),
      standing : "0px",
      walking : "-31px",
      pre_attack : "-63px",
      attack : "-91px",
      hit : "-133px",
      hurt : "-163px",
      dead : "-253px",
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', (e) => {
      if (this.state.view === 'select') {
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
    attack = moves[this.get_random_int(moves.length)]
    defence = moves[this.get_random_int(moves.length)]

    let stats_copy = JSON.parse(JSON.stringify(this.state.enemy_stats))
    stats_copy.pp[attack]--;
    stats_copy.pp[defence]--;

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
    //0000 function called
    //1000 walking animation begins, sprite begins moving right
    //1300 attack name appears
    //2000 sprite ceases moving right
    //2200 walking animation stops
    //2300 sprite attack animation part one
    //2400 sprite attack animation part two

    let me = document.getElementById('me');
    let my_move = document.getElementById('my_move');
    let my_defence = document.getElementById('my_defence')
    let enemy_defence = document.getElementById('enemy_defence');
    let enemy = document.getElementById('enemy');
    let enemy_move = document.getElementById('enemy_move')
    let my_interval;
    let enemy_interval;

    //sprite positions
    const standing = "0px"
    const walking = "-31px"
    const pre_attack = "-63px"
    const attack = "-91px"
    const hit = "-133px"
    const hurt = "-163px"
    const dead = "-253px"

    //show my attack name, move me right, start walking animation
    setTimeout(() => {
      this.set_text(`${this.state.my_name} uses ${this.state.my_attack.toUpperCase()}!`);
      
      // me.style.left = '40%'
      // my_interval = setInterval(() => {
      //   if (window.getComputedStyle(me).backgroundPositionX === standing) {
      //     me.style.backgroundPositionX = walking;
      //   } else {
      //     me.style.backgroundPositionX = standing;
      //   }
      // }, 150)
      this.setState({
        animate_me: 'approach'
      })
    }, 1000)

    //stop walking, stand
    setTimeout(() => {
      // clearInterval(my_interval);
      // me.style.backgroundPositionX = standing;
      this.setState({
        animate_me : 'stop walking'
      })
    }, 2200)

    //attack animation part one
    setTimeout(() => {
      this.setState({
        animate_me: 'attack'
      })
      // me.style.backgroundPositionX = pre_attack;
    }, 2300)

    //attack animation part two, hand begins moving right and 
    setTimeout(() => {
      // me.style.backgroundPositionX = attack;
      this.setState({
        animate_my_move: 'execute'
      })
      // switch (this.state.my_attack) {
      //   case "rock":
      //     my_move.style.backgroundPosition = "-915px -310px";
      //     my_move.style.height = "95px";
      //     my_move.style.width = "95px";
      //     break;
      //   case "paper":
      //     my_move.style.backgroundPosition = "-688px -290px";
      //     my_move.style.height = "120px";
      //     my_move.style.width = "90px";
      //     break;
      //   case 'scissors':
      //     my_move.style.backgroundPosition = "-230px -520px";
      //     my_move.style.height = "120px";
      //     my_move.style.width = "90px";
      //     break;
      //   default:
      //     console.log('something went wrong')
      // }
      // my_move.style.opacity = "0";
      // my_move.style.left = '75%';
    }, 2500)

    //return to standing position, enemy hit animation, enemy hp--
    setTimeout(() => {
      this.setState({
        animate_enemy: 'show_damage'
      })
      // if (this.state.my_stats.hp > 1){
      //   me.style.backgroundPositionX = standing;
      // } else if (this.state.enemy_stats.hp <= 1){
      //   me.style.backgroundPositionX = hurt;
      // } 
      // let enemy_defence = document.getElementById('enemy_defence')

      // switch (this.state.enemy_defence) {
      //   case "rock":
      //     enemy_defence.style.backgroundPosition = "-915px -310px";
      //     enemy_defence.style.height = "95px";
      //     enemy_defence.style.width = "95px";
      //     break;
      //   case "paper":
      //     enemy_defence.style.backgroundPosition = "-688px -290px";
      //     enemy_defence.style.height = "120px";
      //     enemy_defence.style.width = "90px";
      //     break;
      //   case 'scissors':
      //     enemy_defence.style.backgroundPosition = "-230px -520px";
      //     enemy_defence.style.height = "120px";
      //     enemy_defence.style.width = "90px";
      //     break;
      //   default:
      //     console.log('something went wrong')
      // }
      // enemy_defence.style.opacity = "0";
      // enemy_defence.style.right = '35%';

      if (this.enemy_block_successful()){
         // enemy_defence.style.right = '35%';
         this.setState({
           animate_enemy_defence: 'success',
           animate_enemy: 'celebrate'
         })
      } else {
        this.setState({
          animate_enemy_defence: 'failure',
          animate_enemy: 'get_hit'
        })
        this.take_damage('enemy')
        // enemy.style.backgroundPositionX = hit;
        // enemy_defence.style.right = '10%';
      }
    }, 2700)

    //reset attack hand, defence hand, turn around, walk animation, go left, reset enemy animation
    setTimeout(() => {

      this.setState({
        animate_my_move: 'reset',
        animate_enemy_defence: 'reset',
        animate_me: 'return',
        animate_enemy: 'show_damage'
      })
      // my_move.style.height = "0px";
      // my_move.style.width = "0px";
      // my_move.style.opacity = "1";
      // my_move.style.left = "40%";

      // enemy_defence.style.height = "0px";
      // enemy_defence.style.width = "0px";
      // enemy_defence.style.opacity = "1";
      // enemy_defence.style.right = "27%";


      // me.style.left = "27%"
      // me.style.transform = 'scale(2.9)';

      // my_interval = setInterval(() => {
      //   if (window.getComputedStyle(me).backgroundPositionX === standing) {
      //     me.style.backgroundPositionX = walking;
      //   } else {
      //     me.style.backgroundPositionX = standing;
      //   }
      // }, 150)

      // if (this.state.enemy_stats.hp > 1){
      //   enemy.style.backgroundPositionX = standing;
      // } else if (this.state.enemy_stats.hp <= 1){
      //   enemy.style.backgroundPositionX = hurt;
      // } 
    }, 3500)

    //enemy reaction
    setTimeout(() => {
      if (this.enemy_block_successful()) {
        this.set_text(`But ${this.state.enemy_name} blocks it with ${this.state.enemy_defence.toUpperCase()}!`);
      } else {
        this.set_text(`${this.state.enemy_name} tries to block with ${this.state.enemy_defence.toUpperCase()}...but it doesn't work`);
      }
    }, 3600)

    //stop walking, turn back around
    setTimeout(() => {
      // clearInterval(my_interval);
      // me.style.transform = "scale(2.9) scaleX(-1)"
      // me.style.backgroundPositionX = standing;
      this.setState({
        animate_me: 'returned'
      })
    }, 4500)

    //enemy attack
    setTimeout(() => {
      this.set_text(`${this.state.enemy_name} uses ${this.state.enemy_attack.toUpperCase()}!`);

      // enemy.style.right = '40%'
      // enemy_interval = setInterval(() => {
      //   if (window.getComputedStyle(enemy).backgroundPositionX === standing) {
      //     enemy.style.backgroundPositionX = walking;
      //   } else {
      //     enemy.style.backgroundPositionX = standing;
      //   }
      // }, 150)
      this.setState({
        animate_enemy: 'approach'
      })
    }, 6000)

    //stop walking, stand
    setTimeout(() => {
      // clearInterval(enemy_interval);
      // enemy.style.backgroundPositionX = standing;
      this.setState({
        animate_enemy : 'stop_walking'
      })
    }, 7200)

    //attack animation part 1
    setTimeout(() => {
      // enemy.style.backgroundPositionX = pre_attack;
      this.setState({
        animate_enemy: 'attack'
      })
    }, 7300)

    setTimeout(() => {
      // enemy.style.backgroundPositionX = attack;

      this.setState({
        animate_enemy_move: 'execute'
      })
      // switch (this.state.enemy_attack) {
      //   case "rock":
      //     enemy_move.style.backgroundPosition = "-915px -310px";
      //     enemy_move.style.height = "95px";
      //     enemy_move.style.width = "95px";
      //     break;
      //   case "paper":
      //     enemy_move.style.backgroundPosition = "-688px -290px";
      //     enemy_move.style.height = "120px";
      //     enemy_move.style.width = "90px";
      //     break;
      //   case 'scissors':
      //     enemy_move.style.backgroundPosition = "-230px -520px";
      //     enemy_move.style.height = "120px";
      //     enemy_move.style.width = "90px";
      //     break;
      //   default:
      //     console.log('something went wrong')
      // }
      // enemy_move.style.opacity = "0";
      // enemy_move.style.right = '75%';
    }, 7500)

    setTimeout(() => {
      this.setState({
        animate_enemy: 'show_damage'
      })
      if (this.my_block_successful()){
        this.setState({
          animate_my_defence: "success",
          animate_me: "celebrate"
        })
      } else {
        this.setState({
          animate_my_defence: "failure",
          animate_me: 'get_hit'
        })
      }
      // if (this.state.enemy_stats.hp > 1){
      //   enemy.style.backgroundPositionX = standing;
      // } else if (this.state.enemy_stats.hp <= 1){
      //   enemy.style.backgroundPositionX = hurt;
      // } 
    //   switch (this.state.my_defence) {
    //     case "rock":
    //       my_defence.style.backgroundPosition = "-915px -310px";
    //       my_defence.style.height = "95px";
    //       my_defence.style.width = "95px";
    //       break;
    //     case "paper":
    //       my_defence.style.backgroundPosition = "-688px -290px";
    //       my_defence.style.height = "120px";
    //       my_defence.style.width = "90px";
    //       break;
    //     case 'scissors':
    //       my_defence.style.backgroundPosition = "-230px -520px";
    //       my_defence.style.height = "120px";
    //       my_defence.style.width = "90px";
    //       break;
    //     default:
    //       console.log('something went wrong')
    //   }
    //   my_defence.style.opacity = "0";
    //   my_defence.style.left = '35%';

    //   if (!this.my_block_successful()){
    //     me.style.backgroundPositionX = hit;
    //     my_defence.style.left = '10%';
    //     this.take_damage('me')
    //   } else {
    //     this.setState({
    //       animate_me: 'celebrate'
    //     })
    //     my_defence.style.right = '35%';

    //   }
    }, 7700)

    setTimeout(() => {
      this.setState({
        animate_enemy_move: 'reset',
        animate_my_defence: 'reset',
        animate_enemy: 'return',
        animate_me: 'show_damage'
      })

      // enemy_move.style.height = "0px";
      // enemy_move.style.width = "0px";
      // enemy_move.style.opacity = "1";
      // enemy_move.style.right = "40%";

      // my_defence.style.height = "0px";
      // my_defence.style.width = "0px";
      // my_defence.style.opacity = "1";
      // my_defence.style.left = "27%";

      // enemy.style.right = "27%"
      // enemy.style.transform = 'scale(2.9) scaleX(-1)';
      
      // enemy_interval = setInterval(() => {
      //   if (window.getComputedStyle(enemy).backgroundPositionX === standing) {
      //     enemy.style.backgroundPositionX = walking;
      //   } else {
      //     enemy.style.backgroundPositionX = standing;
      //   }
      // }, 150)

      // if (this.state.my_stats.hp > 1){
      //   me.style.backgroundPositionX = standing;
      // } else if (this.state.my_stats.hp <= 1){
      //   me.style.backgroundPositionX = hurt;
      // } 
    }, 8500)

    //my reaction
    setTimeout(() => {
      if (this.my_block_successful()) {
        this.set_text(`But ${this.state.my_name} blocks it with ${this.state.my_defence.toUpperCase()}!`);
      } else {
        this.set_text(`${this.state.my_name} tries to block with ${this.state.my_defence.toUpperCase()}...but it doesn't work`);
        // this.take_damage('me')
      }
    }, 9000)

       //stop walking, turn back around
       setTimeout(() => {
        clearInterval(enemy_interval);
        enemy.style.transform = "scale(2.9)"

        if (this.state.enemy_stats.hp > 1){
          enemy.style.backgroundPositionX = standing;
        } else if (this.state.enemy_stats.hp <= 1){
          enemy.style.backgroundPositionX = hurt;
        } 
      }, 9200)

    //back to move select
    setTimeout(() => {
      if (!this.is_winner()) {
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
    const dead = "-253px"
    let hps = [this.state.my_stats.hp, this.state.enemy_stats.hp]
    if (hps[0] === 0 && hps[1] === 0) {
      this.draw();
      return true;
    } else if (hps[0] === 0) {
      this.set_text(`${this.state.enemy_name} wins!`)
      document.getElementById('me').style.backgroundPositionX = dead;
      return true;
    } else if (hps[1] === 0) {
      this.set_text(`${this.state.my_name} wins!`)
      document.getElementById('enemy').style.backgroundPositionX = dead;

      return true;
    } else {
      return false
    }
  }

  draw = () => {
    this.set_text('Draw!')
  }
  start = (char, name) => {
    if (!name.length) {
      name = "anonymous"
    }
    this.setState({
      my_character: char,
      my_name: name,
      view: 'select',
      display_text: "Select Attack"
    })
  }
  get_hand_position = (choice) => {
    let style = {}
    switch (choice) {
      case "rock":
        style.backgroundPosition = "-915px -310px";
        style.height = "95px";
        style.width = "95px";
        break;
      case "paper":
        style.backgroundPosition = "-688px -290px";
        style.height = "120px";
        style.width = "90px";
        break;
      case 'scissors':
        style.backgroundPosition = "-230px -520px";
        style.height = "120px";
        style.width = "90px";
        break;
      default:
        console.log('something went wrong')
    }
    return style;
    // my_move.style.opacity = "0";
    // my_move.style.left = '75%';
  }


  render() {
    return (
      <div id="wrapper">
        <MyDefence
          my_defence = {this.state.my_defence}
          get_hand_position={this.get_hand_position}
        />
        <MyMove
          my_attack={this.state.my_attack}
          get_hand_position={this.get_hand_position}
          animate_my_move={this.state.animate_my_move}
        />
        <EnemyMove
          get_hand_position={this.get_hand_position}
          enemy_attack={this.state.enemy_attack}
        />
        <EnemyDefence
          enemy_defence = {this.state.enemy_defence}
          get_hand_position = {this.get_hand_position}
          animate_enemy_defence = {this.state.animate_enemy_defence}
        />
        <Enemy
          enemy_character={this.state.enemy_character}
          animate_enemy={this.state.animate_enemy}
          enemy_stats={this.state.enemy_stats}
          names={this.state.names}
        />
        <Me
          names={this.state.names}
          animate_me={this.state.animate_me}
          my_character={this.state.my_character}
          my_stats={this.state.my_stats}
        />
        <CharSelect
          view={this.state.view}
          start={this.start}
        />
        <Display
          display_text={this.state.display_text}
        />
        <Menu
          my_stats={this.state.my_stats}
          choices={this.state.choices}
          choices_index={this.state.choices_index}
          my_name={this.state.my_name}
          view={this.state.view}
        />
      </div>
    )
  }
}

export default App;
