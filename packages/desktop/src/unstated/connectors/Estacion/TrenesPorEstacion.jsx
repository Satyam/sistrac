import React from 'react';
// import { Subscribe } from 'unstated';

import TrenesPorEstacion from '_components/Estacion/TrenesPorEstacion';

const connect = BaseComp => otherProps => <BaseComp {...otherProps} />;

export default connect(TrenesPorEstacion);
