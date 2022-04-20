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