import React from 'react';
// import { Subscribe } from 'unstated';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import Estacion from '_components/Estacion';

const connect = BaseComp => otherProps => <BaseComp {...otherProps} />;

export default compose(withRouter, connect)(Estacion);
