import Relay from 'react-relay';
class AppHomeRoute extends Relay.Route {
  // static queries = {
  //   user: (Component) => Relay.QL `
  //     query {
  //       user (id: $userId) {
  //         ${Component.getFragment('user')}
  //       }
  //     }
  //   `
  // };
  static queries = {
    ranks: (Component) => Relay.QL `
      query {
        ranks {
          ${Component.getFragment('rank')}
        }
      }
    `
  };

  //static paramDefinitions = {userId: {required: true}};
  static routeName = 'AppHomeRoute';
}

export default AppHomeRoute;