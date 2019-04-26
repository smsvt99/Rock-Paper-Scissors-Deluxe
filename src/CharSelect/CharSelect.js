import React, {Component} from 'react'
// import { clearInterval } from 'timers';

class CharSelect extends Component{
    state = { 
        characters : [1,2,3,4,5,6],
        character_index: 0,
        name: '',
        interval: null,
        listener: null,
        page: 1,
        opponent_id: ''
    }
    cycle_index_down = (number) => {
        if (number === 0){
            number = this.state.characters.length - 1;
        } else {
            number--;
        }
        this.setState({
            character_index : number
        });
    }
    cycle_index_up = (number) => {
        if (number === this.state.characters.length - 1){
            number = 0;
        } else {
            number++;
        }
        this.setState({
            character_index : number
        });
    }
    point = () => {
        let carrot_holes = document.getElementsByClassName('carrot_hole');
        for (let hole of carrot_holes) {
            hole.classList.remove('active')
        }
        let characters = document.getElementsByClassName('char_choice');
        for (let character of characters){
            character.classList.remove('walking');
            character.style.backgroundPositionX = '0px';
        }
        carrot_holes[this.state.character_index].classList.add('active')
        characters[this.state.character_index].classList.add('walking')
    }
    walk = () => {
        if (this.props.view === 'char_select' && this.state.page === 1){
        function toggle(element){
                if (element.style.backgroundPositionX === '-30px'){
                    element.style.backgroundPositionX = '0px';
                } else {
                    element.style.backgroundPositionX = '-30px'
                }
        }
        let selected_character = document.getElementsByClassName('walking')[0];
        toggle(selected_character);
    }
    }
    componentDidMount = () => {
        this.setState({
            interval : setInterval(this.walk, 110)
        }) 

        this.setState({
            listener: window.addEventListener('keydown', (e)=>{
                switch(e.key){
                    case "ArrowLeft": 
                        this.cycle_index_down(this.state.character_index);
                        break;
                    case "ArrowRight": 
                        this.cycle_index_up(this.state.character_index);
                        break;
                }
            })
        })
    }
    componentDidUpdate = () => {
        if (this.props.view === 'char_select' && this.state.page === 1){
            this.point();
        }
    }
    componentWillUnmount = () => {
        clearInterval(this.state.interval)
        // window.removeEventListener(this.state.listener) bad syntax. fix later.
    }
    handle_change = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    handle_change2 = (e) => {
        this.setState({
            opponent_id: e.target.value
        })
    }
    next = () => {
        this.setState({
            page : 2
        })
    }

    render(){
    if (this.props.view === 'char_select'){
        if(this.state.page === 1){
        return (
            <div>
            <div id="char_select">
            <p id="choose">Choose Your Character</p>
            <div className="char_container">
                <div id="char_1" className="char_choice walking"></div>
                <div id="char_2" className="char_choice"></div>
                <div id="char_3" className="char_choice"></div>
                <div id="char_4" className="char_choice"></div>
                <div id="char_5" className="char_choice"></div>
                <div id="char_6" className="char_choice"></div>
            </div>
            <div className="char_container">
                <div id="hole_1" className="carrot_hole active"></div>
                <div id="hole_2" className="carrot_hole"></div>
                <div id="hole_3" className="carrot_hole"></div>
                <div id="hole_4" className="carrot_hole"></div>
                <div id="hole_5" className="carrot_hole"></div>
                <div id="hole_6" className="carrot_hole"></div>
            </div>
            <div className="container">
                <div 
                    onClick={()=>{this.cycle_index_down(this.state.character_index)}} 
                    className="arrow left-arrow">
                </div>
                <div
                    onClick={()=>{this.cycle_index_up(this.state.character_index)}} 
                    className="arrow right-arrow">
                </div>
            </div>
            <p>Name Your Character</p>
            <input 
                value={this.state.name} 
                onChange={this.handle_change} 
                id="name" 
                type="text">
            </input>
            <div id="next" onClick={this.next}>
                Next 
            </div>
            </div>
            <div id="screen"></div>
            </div>
        )
    } else if (this.state.page === 2){
        return (
            <div>
            <div id="char_select">
           
            <p id="your">Your ID is:</p>
            <p id="id">42YOq34ovgGzMjxeAAAS{this.props.my_id}</p>
            <p>Enter Opponent's ID:</p>
            <input 
                value={this.state.opponent_id} 
                onChange={this.handle_change2} 
                id="opponent_id" 
                type="text">
            </input>
            <p id="tip">TIP: leave this blank to play against the bot, or open this page in another browser to play both characters yourself!</p>
            <div 
            onClick={()=>{this.props.start(this.state.characters[this.state.character_index], this.state.name, this.state.opponent_id)}} id="start">Fight!</div>
            </div>
            <div id="screen"></div>
            </div>
        )

        }
    
    } else {
        return null
    }
}
}

export default CharSelect