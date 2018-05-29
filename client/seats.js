import React from "react";

const Seats = (props) => {
 const players = props.players // []

 while (players.length < 6) {
  players.push({id: 'Empty Seat'})
 }

 for (let i = 1; i < players.length; i++) {
  players[i].seat = "seat-"+(i+1)
 }
 return (
  <div>
{players.map( player => <div className={player.seat}>{player.id}</div>)}
   </div>
 )
}

export default Seats