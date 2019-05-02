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

import socketIO from 'socket.io-client'

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
    my_name: null,
    enemy_name: 'RPS-Bot',
    display_text: '',
    animate_me: null,
    animate_my_move: null,
    animate_enemy: null,
    animate_enemy_defence: null,
    animate_enemy_move: null,
    names : {
      standing : "0px",
      walking : "-31px",
      pre_attack : "-63px",
      attack : "-91px",
      hit : "-133px",
      hurt : "-163px",
      dead : "-253px",
    },
    endpoint: 'https://infinite-castle-27081.herokuapp.com/',
    my_id : null,
    enemy_id : null,
    single_player : false,
  }

  componentDidMount() {
    this.socket = socketIO();
      
    //   , {
    //   transports: ['websocket']
    // });

    this.socket.on('socket_id', data => {
      console.log('reconnected?')
      this.setState({
        my_id: data
      })
    })

    this.socket.on('initial_info_from_server', data => {
      console.log("Got initial info from server: " + data)
      this.setState({
        enemy_character: data.character,
        enemy_name: data.name
      })
    })

    this.socket.on('moves_from_server', data => {
      console.log("Got moves from server: " + data)
      this.setState({
        enemy_attack : data.attack,
        enemy_defence : data.defence
      })
    })

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
  set_choices_index = (num) =>{
    this.setState({
      choices_index : (num)
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
    console.log('handle enter called')
    let choices = this.state.choices;
    let index = this.state.choices_index;
    let stats_copy = JSON.parse(JSON.stringify(this.state.my_stats))

    if (this.state.view === 'select' && this.state.selection === 'attack') {
      console.log('view is select, selection is attack')
      if (this.state.my_stats.pp[choices[index]] > 0) {
        console.log('enough pp for attack')
        stats_copy.pp[choices[index]]--;
        this.setState({
          my_attack: choices[index],
          selection: 'defence',
          my_stats: stats_copy
        })
        console.log('my_attack set as ' + this.state.my_attack)
        this.set_text("Select Defence")
      }
    } else if (this.state.view === 'select' && this.state.selection === 'defence') {
      console.log('view is select, selection is defence')
      if (this.state.my_stats.pp[choices[index]] > 0) {
        console.log('enough pp for defence')
        stats_copy.pp[choices[index]]--;
        this.setState({
          my_defence: choices[index],
          selection: '',
          my_stats: stats_copy,
          view: 'waiting'
        }, ()=>{
          console.log('set my_defence as ' + this.state.my_defence)
          this.set_text("Waiting for Opponent...")
          if(this.state.single_player === true) this.get_enemy_move()
          else {
            this.send_moves_to_server();
            this.check_for_ready();
          }
        })
        // console.log('set my_defence as ' + this.state.my_defence)
        // this.set_text("Waiting for Opponent...")
        // if(this.state.single_player === true) this.get_enemy_move()
        // else {
        //   this.send_moves_to_server();
        //   this.check_for_ready();
        // }
      }
    }
  }

  send_moves_to_server = () => {
    console.log('sending this to server: ' + this.state.my_attack + this.state.my_defence)
    this.socket.emit('moves_from_client', {
      attack: this.state.my_attack,
      defence: this.state.my_defence,
      enemy_id : this.state.enemy_id
    })
    console.log('sent')
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

    setTimeout(() => {
      this.set_text(`${this.state.my_name} uses ${this.state.my_attack.toUpperCase()}!`);
      this.setState({
        animate_me: 'approach'
      })
    }, 1000)

    setTimeout(() => {
      this.setState({
        animate_me : 'stop walking'
      })
    }, 2200)

    setTimeout(() => {
      this.setState({
        animate_me: 'attack'
      })
    }, 2300)

    setTimeout(() => {
      this.setState({
        animate_my_move: 'execute'
      })
    }, 2500)

    setTimeout(() => {
      this.setState({
        animate_enemy: 'show_damage'
      })
      if (this.enemy_block_successful()){
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
      }
    }, 2700)

    setTimeout(() => {
      this.setState({
        animate_my_move: 'reset',
        animate_enemy_defence: 'reset',
        animate_me: 'return',
        animate_enemy: 'show_damage'
      })
    }, 3500)

    setTimeout(() => {
      if (this.enemy_block_successful()) {
        this.set_text(`But ${this.state.enemy_name} blocks it with ${this.state.enemy_defence.toUpperCase()}!`);
      } else {
        this.set_text(`${this.state.enemy_name} tries to block with ${this.state.enemy_defence.toUpperCase()}...but it doesn't work`);
      }
    }, 3600)

    setTimeout(() => {
      this.setState({
        animate_me: 'returned'
      })
    }, 4500)

    //enemy attack///////////////////////
    setTimeout(() => {
      this.set_text(`${this.state.enemy_name} uses ${this.state.enemy_attack.toUpperCase()}!`);
      this.setState({
        animate_enemy: 'approach'
      })
    }, 6000)

    setTimeout(() => {
      this.setState({
        animate_enemy : 'stop_walking'
      })
    }, 7200)

    setTimeout(() => {
      this.setState({
        animate_enemy: 'attack'
      })
    }, 7300)

    setTimeout(() => {
      this.setState({
        animate_enemy_move: 'execute'
      })
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
        this.take_damage('me')
      }
    }, 7700)

    setTimeout(() => {
      this.setState({
        animate_enemy_move: 'reset',
        animate_my_defence: 'reset',
        animate_enemy: 'return',
        animate_me: 'show_damage'
      })
    }, 8500)

    setTimeout(() => {
      if (this.my_block_successful()) {
        this.set_text(`But ${this.state.my_name} blocks it with ${this.state.my_defence.toUpperCase()}!`);
      } else {
        this.set_text(`${this.state.my_name} tries to block with ${this.state.my_defence.toUpperCase()}...but it doesn't work`);
      }
    }, 9000)

       setTimeout(() => {
         this.setState({
           animate_enemy: 'returned'
         })
      }, 9500)

    setTimeout(() => {
      if (!this.is_winner()) {
        this.setState({
          view: 'select',
          selection: 'attack',
          my_attack: null,
          my_defence: null,
          enemy_attack: null,
          enemy_defence: null
        })
        this.set_text('Select Attack')
      }
    }, 10500)
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
  start = (char, name, id) => {

    if (!name.length) name = "anonymous"

    this.setState({
      enemy_id: id,
      my_character: char,
      my_name: name,
    }, this.send_initial_info)

    function reduce_opacity(){
      let box = document.getElementById('char_select');
      let current_opacity = window.getComputedStyle(box).opacity
      box.style.opacity = current_opacity - .2
    }

    setTimeout(reduce_opacity, 500) //.8
    setTimeout(reduce_opacity, 1000) //.6
    setTimeout(reduce_opacity, 1500) //.4
    setTimeout(reduce_opacity, 2000) //.2
    setTimeout(reduce_opacity, 2500) //0
    
    setTimeout(()=>{
    let single_player = false
    if (!id.length) single_player = true

    this.setState({
      view: 'select',
      display_text: "Select Attack",
      single_player : single_player
    })
  }, 3000)
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
  }
  send_initial_info = () => {
    this.socket.emit('initial_info', {
      name: this.state.my_name,
      enemy_id: this.state.enemy_id,
      character: this.state.my_character
    })
  }
  check_for_ready = () => {
    console.log('checking...')
    let timeout;
    if (this.state.enemy_attack && this.state.enemy_defence){
      this.setState({
        view: 'animation'
      }, this.fight)
      clearTimeout(timeout)
    } else {
      console.log('no enemy attack and defence')
    }
    if(this.state.view === 'waiting'){
      timeout = setTimeout(this.check_for_ready, 800)
    } else {
      console.log('view not waiting')
    }
  }

  render() {
    return (
      <div id="wrapper">
        <MyDefence
          my_defence = {this.state.my_defence}
          get_hand_position={this.get_hand_position}
          animate_my_defence={this.state.animate_my_defence}
        />
        <MyMove
          my_attack={this.state.my_attack}
          get_hand_position={this.get_hand_position}
          animate_my_move={this.state.animate_my_move}
        />
        <EnemyMove
          get_hand_position={this.get_hand_position}
          enemy_attack={this.state.enemy_attack}
          animate_enemy_move={this.state.animate_enemy_move}
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
          my_id={this.state.my_id}
          start={this.start}
        />
        <Display
          display_text={this.state.display_text}
        />
        <Menu
          set_choices_index = {this.set_choices_index}
          cycle_index_up={this.cycle_index_up}
          cycle_index_down={this.cycle_index_down}
          handle_enter={this.handle_enter.bind(this)}
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
