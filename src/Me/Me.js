import React, { Component } from 'react'

class Me extends Component {
    constructor(props) {
        super(props);
        this.state = {
            my_interval: null,
            left: '27%',
            backgroundPositionX: '0px;'
        }
    }
    me = () => {
        return document.getElementById('me')
    }
    walk = () => {
        const { names } = this.props;
        this.setState({
            my_interval: setInterval(() => {
                if (window.getComputedStyle(this.me()).backgroundPositionX === names.standing) {
                    this.me().style.backgroundPositionX = names.walking;
                } else {
                    this.me().style.backgroundPositionX = names.standing;
                }
            }, 150)
        })
    }
    stop_walking(){
        const {names} = this.props;
        clearInterval(this.state.my_interval);
        this.me().style.backgroundPositionX = names.standing;
    }
    approach = () => {
        this.me().style.left = '40%';
        this.walk();
    }
    attack = () => {
        const { names } = this.props;
        this.me().style.backgroundPositionX = names.pre_attack
        setTimeout(()=>{
            this.me().stylebackgroundPositionX = names.attack
        },200)

    }
    get_hit = () => {
        const { names } = this.props
        this.me().style.backgroundPositionX = names.hit;
        setTimeout(()=>{
            this.show_damage() 
        }, 800)
    }
    show_damage = () => {
        let { names } = this.props;

        if (this.props.my_stats.hp > 1){
            this.me().style.backgroundPositionX = names.standing;
          } else if (this.props.my_stats.hp <= 1){
            this.me().style.backgroundPositionX = names.hurt;
          } 
    }
    celebrate = () => {
        const { names } = this.props
        this.me().style.backgroundPositionX = names.pre_attack;
        setTimeout(() => {
            this.me().style.backgroundPositionX = names.standing;
        }, 200)
        setTimeout(() => {
            this.me().style.backgroundPositionX = names.pre_attack;
        }, 400)
        setTimeout(() => {
            this.me().style.backgroundPositionX = names.standing;
        }, 600)
    }
    return = () => {
        this.me().style.left = "27%"
        this.me().style.transform = 'scale(2.9)';
        this.walk();
    }
    returned = () => {
      this.stop_walking();
      this.me().style.transform = "scale(2.9) scaleX(-1)"
      this.show_damage();
    }
    componentDidUpdate = () => {
        this.setY();
    }
    componentWillUpdate = (nextProps, nextState) => {
        //this prevents the animations from repeating on every update. 
        //consequently, however, the same animation cannot be called twice in a row.
        if (this.props.animate_me !== nextProps.animate_me) {
            switch (nextProps.animate_me) {
                case "celebrate": this.celebrate(); break;
                case "approach": this.approach(); break;
                case "stop walking": this.stop_walking(); break;
                case "attack": this.attack(); break;
                case "show_damage": this.show_damage(); break;
                case "return": this.return(); break;
                case "returned": this.returned(); break;
                case "get_hit": this.get_hit(); break;
            }
        } 
    }
    setY = () => {
        let sprite = document.getElementById('me')
        switch (this.props.my_character) {
            case 1: sprite.style.backgroundPositionY = '-2px'; break;
            case 2: sprite.style.backgroundPositionY = '-40px'; break;
            case 3: sprite.style.backgroundPositionY = '-79px'; break;
            case 4: sprite.style.backgroundPositionY = '-116px'; break;
            case 5: sprite.style.backgroundPositionY = '-154px'; break;
            case 6: sprite.style.backgroundPositionY = '-187px'; break;
            default: sprite.style.backgroundPositionY = '-2px';
        }
    }
    render() {
        return (
            <div id="me"></div>
        )
    }
}

export default Me