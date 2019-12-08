import styled from 'styled-components';


const LayoutContentWrapper = styled.div`
  padding: 40px 30px;
  display: flex;
  flex-flow: row wrap;
  //overflow: hidden;

  @media only screen and (max-width: 767px) {
    padding: 30px 20px;
  }

  @media (max-width: 580px) {
    padding: 30px 0;
  }
`;

export { LayoutContentWrapper };
