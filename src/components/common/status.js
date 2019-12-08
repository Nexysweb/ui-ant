import styled from 'styled-components';
import { colors } from '../../config';


const Status = styled.span`
  cursor: pointer;

  border: 1px solid #f0f0f0;
  border-right-width: 0;
  padding: 6px 10px;

  &:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  &:last-child {
    border-right-width: 1px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  &.active {
    background-color: ${colors.primary};
    border-color: ${colors.primary};
    color: #ffffff;
  }
`;

export default Status;