import Form from './Form';
import Field from './Field';
import Label from './Label';
import Help from './Help';
import Option from './Option';

const OK = 0;
const WARN = 1;
const ERROR = 2;

Form.Field = Field;
Form.Label = Label;
Form.Help = Help;
Form.Option = Option;
Form.OK = OK;
Form.WARN = WARN;
Form.ERROR = ERROR;

export default Form;
export { Form, Field, Option, Label, Help, OK, WARN, ERROR };
