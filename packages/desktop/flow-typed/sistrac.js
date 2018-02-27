declare type IdEstacion = string;
declare type IdUsuario = number;
declare type IdTren = number;
declare type IdEvento = number;
declare type IdItinerario = number;
declare type IdTipoEmergencia = number;
declare type IdTipoEvento = number;

declare type Estacion = {|
  idEstacion: IdEstacion,
  nombre: string,
  latitud: number,
  longitud: number,
|};

declare type Tren = {|
  idTren: IdTren,
  idItinerario: IdItinerario,
  fecha: Date,
  chapa: number,
  idGuarda: IdUsuario,
  idAyudante: IdUsuario,
  idConductor: IdUsuario,
  locomotora: number,
  estado: number,
  estadoAnterior: number,
  numero: number,
|};

declare type TipoEmergencia = {|
  idTipoEmergencia: IdTipoEmergencia,
  descr: string,
|};

declare type TipoEvento = {|
  idTipoEvento: IdTipoEvento,
  preposicion: string,
  descr: string,
|};
declare type Evento = {|
  idEvento: IdEvento,
  fecha: Date,
  idUsuario: IdUsuario,
  funcion: number,
  idTren: IdTren,
  idEstacion: IdEstacion,
  combustible: number,
  observaciones: string,
  longitud: number,
  velocidad: number,
  latitud: number,
  idTipoEmergencia: IdTipoEmergencia,
  idTipoEvento: IdTipoEvento,
|};

declare type Usuario = {|
  idUsuario: IdUsuario,
  password: string,
  usuario: string,
  nivel: number,
  rolGuarda: ?boolean,
  rolDios: ?boolean,
  rolSupervisor: ?boolean,
  rolMecanico: ?boolean,
  funcion: number,
  nombre: string,
|};
