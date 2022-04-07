import styled from "styled-components";

const Container = styled.div`
  height: 50px;
  background-color: black ;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
`;

const Announcement = () => {
  return <Container> Livraison gratuite sur toutes  les commandes de plus de 50 € </Container>;
};

export default Announcement;
