import React, { Component } from 'react'

class Enemy extends Component {
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
            }
        } else {
            console.log('no change in props')
        }
    }
    // componentDidMount = () => {
    //     this.setY();
    //     this.setX();
    // }
    // setX = () => {

    // }
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
        // setTimeout(()=>{
        //     this.show_damage() 
        // }, 800)
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