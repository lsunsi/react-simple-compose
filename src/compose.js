import callback from './callback.js';
import {
  Component,
  createElement,
} from 'react';

export default function (composer, { loading: UILoading, error: UIError }) {
  return function wrap(UIComponent) {
    return class extends Component {
      state = {
        loading: true,
        error: null,
        data: {},
      };

      componentDidMount() {
        composer(
          callback.bind(null, this),
          this.props,
        );
      }

      render() {
        const {
          loading,
          error,
          data,
        } = this.state;

        const props = {
          ...data,
          error,
        };

        let component;
        if (loading) component = UILoading;
        else if (error) component = UIError;
        else component = UIComponent;

        return createElement(
          component,
          props,
        );
      }
    };
  };
}
