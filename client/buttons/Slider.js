import React, { Component } from 'react';
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

class BetSlider extends Component {
 constructor (props, context) {
   super(props, context)
   this.state = {
     value: this.props.minBet
   }
 }

 handleChangeStart = () => {
   console.log('Change event started')
 };


 handleChange = value => {
   this.setState({
     value: value
   })
   this.props.changeBet(this.state.value)
 };

 handleChangeComplete = () => {
   console.log('Change event completed')
   this.props.changeBet(this.state.value)
 };

 render () {
   const { value } = this.state
   return (
     <div className="bet-slider">
       <Slider
         min={this.props.minBet}
         max={this.props.bankroll}
         value={value}
         onChangeStart={this.handleChangeStart}
         onChange={this.handleChange}
         onChangeComplete={this.handleChangeComplete}
       /> ${value}
     </div>
   )
 }
}

export default BetSlider
