import styled from 'styled-components';
import { palette } from 'styled-theme';

const LayoutContentStyle = styled.div`
  width: 100%;
  padding: 35px;
  background-color: #ffffff;
  // border: 1px solid ${palette('border', 0)};
  height: 100%;

  @media (max-width: 1024px) {
    padding: 20px;
  }

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 580px) {
    padding: 10px;
    border: none;
  }
`;

export default LayoutContentStyle;
