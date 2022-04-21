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

export const LoginTitle = styled.h1`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 20px;

  @media only screen and (max-width: 600px) {
    font-size: 18px;
  }
  @media only screen and (min-width: 600px) {
    font-size: 19px;
  }
  @media only screen and (min-width: 900px) {
    font-size: 24px;
  }
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
`;

export const OrButtons = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-between;
  margin-bottom: 20px;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
  @media only screen and (min-width: 600px) {
    flex-direction: column;
  }
  @media only screen and (min-width: 900px) {
    flex-direction: row;
  }
`;