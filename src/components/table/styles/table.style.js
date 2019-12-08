import styled from 'styled-components';
import WithDirection from '../../../config/withDirection';

const TableStyleWrapper = styled.div`
  table {
    width: 100%;

    tr {
      td {
        padding: 10px;
      }
    }
  }
`;

export default WithDirection(TableStyleWrapper);
