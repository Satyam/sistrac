import { withProps } from 'recompose';
import { Provider } from 'react-redux';
import createStore from '_store/createStore';

export default withProps({ store: createStore() })(Provider);
