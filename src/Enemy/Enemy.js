import React, { Component } from 'react'

class Enemy extends Component {
    state = {
        enemy_interval: null,
    }
    walk = () => {
        const {names} = this.props
        this.setState({
            enemy_interval : setInterval(() => {
                if (window.getComputedStyle(this.enemy()).backgroundPositionX === names.standing) {
                  this.enemy().style.backgroundPositionX = names.walking;
                } else {
                  this.enemy().style.backgroundPositionX = names.standing;
                }
              }, 150)
        })
    }
    stop_walking = () => {
        const {names} = this.props;
        clearInterval(this.state.enemy_interval);
        this.enemy().style.backgroundPositionX = names.standing;
    }
    componentDidUpdate = () => {
        this.setY();
    }
    componentWillUpdate = (nextProps, nextState) => {
        console.log('C W U, ' + nextProps.animate_enemy)
        if (this.props.animate_enemy !== nextProps.animate_enemy) {
            console.log('props changed1')
            switch(nextProps.animate_enemy){
                case "show_damage": this.show_damage(); break;
                case "get_hit": this.get_hit(); break;
                case "celebrate": this.celebrate(); break;
                case "approach": this.approach(); break;
                case "stop_walking": this.stop_walking(); break;
                case "attack": this.attack(); break;
                case "return": this.return(); break;
            }
        } else {
            console.log('no change in props')
        }
    }
    approach = () => {
        this.enemy().style.right = '40%'
        this.walk();
      
    }
    return = () => {
      this.walk();
      this.enemy().style.right = "27%"
      this.enemy().style.transform = 'scale(2.9) scaleX(-1)';
      
    }
    attack = () => {
        const { names } = this.props;
        this.enemy().style.backgroundPositionX = names.pre_attack
        setTimeout(()=>{
            this.enemy().style.backgroundPositionX = names.attack
        },200)

    }
    show_damage = () => {
        let { names } = this.props;  
        if (this.props.enemy_stats.hp > 1){
            this.enemy().style.backgroundPositionX = names.standing;
          } else if (this.state.my_stats.hp <= 1){
            this.enemy().style.backgroundPositionX = names.hurt;
          } 
    }
    get_hit = () => {
        console.log('get hit')
        const { names } = this.props
        this.enemy().style.backgroundPositionX = names.hit;
        setTimeout(()=>{
            this.show_damage() 
        }, 800)
    }
    celebrate = () => {
        console.log('celebrate')
        const { names } = this.props
        this.enemy().style.backgroundPositionX = names.pre_attack;
        setTimeout(() => {
            this.enemy().style.backgroundPositionX = names.standing;
        }, 200)
        setTimeout(() => {
            this.enemy().style.backgroundPositionX = names.pre_attack;
        }, 400)
        setTimeout(() => {
            this.enemy().style.backgroundPositionX = names.standing;
        }, 600)
    }
    enemy = () => {
        return document.getElementById('enemy');
    }
    setY = () => {
        let sprite = document.getElementById('enemy')
        switch(this.props.enemy_character){
            case 1:
                sprite.style.backgroundPositionY = '-2px';
                break;
            case 2:
                sprite.style.backgroundPositionY = '-40px';
                break;
            case 3:
                sprite.style.backgroundPositionY = '-79px';
                break;
            case 4:
                sprite.style.backgroundPositionY = '-116px';
                break;
            case 5:
                sprite.style.backgroundPositionY = '-154px';
                break;
            case 6:
                sprite.style.backgroundPositionY = '-187px';
                break;
            default:
                sprite.style.backgroundPositionY = '-2px';
            }
    }

    render() {
        return (
            <div id="enemy"></div>
        )
    }
}

export default Enemy