import { DatePicker as DP } from 'antd';
import AntDatePicker from './styles/datePicker.style';

const DatePicker = AntDatePicker(DP);
const DateRangepicker = AntDatePicker(DP.RangePicker);

export default DatePicker;
export { DateRangepicker };
