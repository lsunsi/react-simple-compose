export default function (container, payload) {
  if (container.mounted) {
    container.setState(state => {
      if (payload === undefined) {
        return {
          loading: true,
        };
      } else if (payload instanceof Error) {
        return {
          loading: false,
          error: payload,
        };
      } else if (typeof payload === 'object') {
        return {
          loading: false,
          error: null,
          data: {
            ...state.data,
            ...payload,
          },
        };
      } throw new Error(
        'react-simple-compose: wrong payload type'
      );
    });
  }
}
