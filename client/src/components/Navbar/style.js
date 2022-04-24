import styled from 'styled-components';

export const Nav = styled.nav`
  background-color: #fff;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
  position: fixed;
  width: 100%;
  z-index: 1;
`;

export const NavLogo = styled.img`
  height: 50px;
  margin-right: 20px;
`;

export const NavText = styled.p`
  color: #000;
  font-size: 18px;
  margin-right: 20px;
`;

export const NavUser = styled.img`
  height: 50px;
  margin-left: 20px;
  cursor: pointer;
`;