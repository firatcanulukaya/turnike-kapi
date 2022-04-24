import styled from "styled-components";

export const InfoCardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 5rem;
`;

export const InfoCard = styled.div`
  background: #fff;
  border-radius: 12px;
  width: 60%;
  position: relative;
`;

export const InfoCardTop = styled.div`
  display: flex;
  margin: 0 7rem;
`;

export const InfoCardTopLeft = styled.div`
  display: flex;
  width: 50%;
  height: 100%;
`;

export const InfoCardUtils = styled.div`
  padding: 0.5rem;

  p {
    color: #23262F;
    padding: .5rem 0;
  }

  span {
    font-family: "Plus Jakarta Sans Medium", sans-serif;
    color: #87898E;
  }
`;

export const InfoCardContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 32px 114px;
`;

export const InfoCardContentSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;

  p {
    color: #87898E;
    font-family: "Plus Jakarta Sans Medium", sans-serif;
  }

  a {
    color: #23262F;
    font-family: "Plus Jakarta Sans Medium", sans-serif;
  }
`;

export const InfoCardFooter = styled.div`
  padding-bottom: 32px;
  display: flex;
  justify-content: center;
`;

export const InfoCardBanner = styled.div`
  background: #007856;
  width: 100%;
  height: 90px;
  border-radius: 12px 12px 0 0;
`;

export const InfoCardFooterSection = styled.div`
  display: flex;
  align-items: center;

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    p {
      color: #3772FF;
      margin: 0 10px;
    }
  }
`;

export const InfoButtons = styled.button`
  display: flex;
  justify-content: center;
  padding: 16px 0px;
  width: 232px;
  background: ${p => p.bgColor};
  border-radius: 50px;
  font-family: "Plus Jakarta Sans Medium", sans-serif;
  font-size: 15px;
  margin: 0 16px;
  color: ${p => p.textColor};
  border: 1px solid ${p => p.bgColor};
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  ${p => {
    if (p.isHover) {
      return `
        &:hover {
    background: none;
    color: ${p.bgColor};
    border: 1px solid ${p.bgColor};
  }`
    }
  }}`;

export const InfoCardTopPhoto = styled.div`
  position: absolute;
  left: 24px;
  top: 60px;
  background: ${p => p.bgColor};
  border-radius: 50%;
  height: 80px;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

export const InfoCardTopName = styled.p`
  color: #690000;
  font-size: 33px;
  text-transform: uppercase;
  mix-blend-mode: luminosity;
`;