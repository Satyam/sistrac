import React from 'react';
// import { Subscribe } from 'unstated';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import EditEstacion from '_components/EditEstacion';

const connect = BaseComp => otherProps => <BaseComp {...otherProps} />;

export default compose(withRouter, connect)(EditEstacion);
