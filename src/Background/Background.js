import React, {Component} from 'react';

class Background extends Component{
    wave = () =>{
        document.getElementById('water').style.backgroundSize = "16%"
        setTimeout(()=>{
              document.getElementById('water').style.backgroundSize = "15%"
        },2000)
        setTimeout(this.wave, 4000)
     }
     grass = () => {
        document.getElementById('grass').style.backgroundPositionX = "0px";
        
        setTimeout(()=>{
              document.getElementById('grass').style.backgroundPositionX = "3px"
        }, 4000)
        
        setTimeout(this.grass, 4300)
     }
     blow = () =>{
        let position = window.getComputedStyle(document.getElementById('sky')).backgroundPositionX;
        let parsed_position = parseInt(position.slice(0, position.length - 1))
        document.getElementById('sky').style.backgroundPositionX = parsed_position + 1 + "%";
     }
     componentDidMount = () => {
        this.wave()
        this.grass()
        setInterval(this.blow, 1000)
     }

    render(){
        return(
            <div>
                <div id="sky"></div>
                <div id="grass"></div>
                <div id="water"></div>
            </div>
        )
    }
}

export default Background