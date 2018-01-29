import PropTypes from 'prop-types';

export default {
  form: PropTypes.shape({
    values: PropTypes.objectOf(PropTypes.any),
    originalValues: PropTypes.objectOf(PropTypes.any),
    statuses: PropTypes.objectOf(PropTypes.bool),
    errors: PropTypes.objectOf(PropTypes.string),
    touched: PropTypes.objectOf(PropTypes.bool),
    focused: PropTypes.string,
    onInit: PropTypes.func,
    onFocus: PropTypes.func,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
  }),
};
