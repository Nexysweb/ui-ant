import styled from 'styled-components';
import { palette } from 'styled-theme';
import WithDirection from '../../config/withDirection';

const WDComponentTitleWrapper = styled.h1`
  font-size: 30px;
  text-transform: uppercase;
  font-weight: 400;
  color: ${palette('secondary', 2)};
  width: 100%;
  margin: 0 35px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  white-space: nowrap;

  @media only screen and (max-width: 767px) {
    margin: 0 10px;
    margin-bottom: 20px;
  }
`;

const ComponentTitleWrapper = WithDirection(WDComponentTitleWrapper);
export { ComponentTitleWrapper };
