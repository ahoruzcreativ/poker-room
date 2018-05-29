import React, {Component} from "react";
import io from "socket.io-client"
import { getPlayer } from './store/clientPlayer'
import { connect } from 'react-redux';
import Seats from './seats'

let socket
const mapStateToProps = state => ({state})
const mapDispatchToProps = (dispatch) => ( {getPlayer: id => dispatch(getPlayer(id))})

class Test extends Component {
 constructor(props) {
  super(props)
  socket = io.connect()
  socket.on('clientId', (id) => {
   this.props.getPlayer(id)
  })
 }
 render() {
  console.log("clientPlayer", this.props.state.clientPlayer)
  let players = []
  if (this.props.state.gameState.players) {
   players = this.props.state.gameState.players
  }
  return (
   <div>
   <div className="container">
    <img src="poker_table.svg" />
    <div className="seat-1">
    <button > Deal </button>
    <button > Click </button>
    </div>
    <Seats players={players} />
    </div>
    <p>Number of players: {players.length} </p>
    </div>
  )
 }
}


export default connect(mapStateToProps, mapDispatchToProps)(Test);