import React from 'react';
// import { Subscribe } from 'unstated';

import Eventos from '_components/Estacion/EventosEstacion';

const connect = BaseComp => otherProps => <BaseComp {...otherProps} />;

export default connect(Eventos);
