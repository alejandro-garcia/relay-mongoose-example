import Relay from 'react-relay';
import React from 'react';
import Rank from './Rank.js';

class RankList extends React.Component {
  render() {
    //let user = this.props.user;
    let ranks = this.props.ranks.map((rank) => {
      return <Rank rank={rank} key={rank.__dataID__} />;
    });

    return (<div>
              <div>{ranks}</div>
            </div>);
  }
}

export default Relay.createContainer(RankList, {
  fragments: {
    user: () => Relay.QL`
      fragment users on User {
        ranks {
          ${Rank.getFragment('rank')}
        }
      }`
  }
});
