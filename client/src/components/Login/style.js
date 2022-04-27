import styled from 'styled-components';

export const LoginLogo = styled.img`
  width: 100px;
  margin-bottom: 20px;

  @media only screen and (max-width: 600px) {
    width: 60px;
  }
  @media only screen and (min-width: 600px) {
    width: 70px;
  }
  @media only screen and (min-width: 900px) {
    width: 100px;
  }
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
`;