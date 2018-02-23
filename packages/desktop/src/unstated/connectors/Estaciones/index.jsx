import React from 'react';
// import { Subscribe } from 'unstated';

import Estaciones from '_components/Estaciones';

const connect = BaseComp => otherProps => <BaseComp {...otherProps} />;

export default connect(Estaciones);
