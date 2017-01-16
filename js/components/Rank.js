import Relay from 'react-relay';
import React from 'react';
/*
 nombre: String,
   orden: { type: Number},
   category: String, 
   abbreviation: String
   */
class Rank extends React.Component {
  render() {
    debugger;
    let rank = this.props.rank;
    return (
      <tr>
        <td>{rank.nombre}</td>
        <td>{rank.category}</td>
        <td>{rank.abbreviation}</td>
      </tr>
    );
  }
}

export default Relay.createContainer(Rank, {
  fragments: {
    rank: () => Relay.QL`
      fragment on Rank {
        nombre
        category
        abbreviation
      }`
  }
});