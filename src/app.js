import './global.less';
import 'amfe-flexible/index.js';

export async function getInitialState(a) {
  return {
    currentProject: null,
    navBar: {},
    tabBar: [],
  };
}
