import Toggle from './toggle';
import Hoc from 'components/business/address/hoc-w-data';

const requestCrud = props => {
  const { id, config: {requestCrud: {detail }}} = props;
  console.log(detail(id))
  return detail(id);
};

export default Hoc(requestCrud)(Toggle);
