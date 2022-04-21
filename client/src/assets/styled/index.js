import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding: 15px;
`

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-right: -15px;
  margin-left: -15px;
`

export const ColFull = styled.div`
  width: 100%;
  max-width: 100%;
  ${props => props.center && `
    display: flex;
    align-items: center;
    justify-content: center;
  `};
`

export const ColFifty = styled.div`
  width: 100%;
  max-width: 50%;
  ${props => props.center && `
    display: flex;
    align-items: center;
    justify-content: center;
  `};
  @media only screen and(max-width: 600px) {
    width: 100%;
    max-width: 100%;
  }
  @media only screen and (min-width: 600px) {
    width: 100%;
    max-width: 100%;
  }
  @media only screen and (min-width: 1200px) {
    width: 100%;
    max-width: 50%;
  }
`

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 20px;
`;

export const SubTitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 20px;
  color: #87898E;
`;

export const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 15px;
  font-size: 14px;
  background: #FCFCFD;
  border: 2px solid #DFDFE6;
  box-sizing: border-box;
  border-radius: 12px;
  margin-bottom: 10px;

  &.error {
    border-color: #FF0000;
    color: #FF0000;
  }
`;

export const FormError = styled.div`
  align-items: center;
  color: #FF0000;
  font-size: 12px;
  margin-bottom: 20px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
`;

export const Button = styled.button`
  padding: 20px 10px;
  background: ${props => props.bgColor || '#3772FF'};
  color: ${props => props.textColor || 'white'};
  border-radius: 50px;
  width: 100%;
  height: 56px;
  cursor: pointer;
  opacity: .9;
  transition: opacity .2s ease-in-out;

  &:hover {
    opacity: 1;
  }
`;

export const Divider = styled.div`
  margin: 20px 0;
  width: 50%;
  height: 1px;
  background: #F1F1F1;
`;