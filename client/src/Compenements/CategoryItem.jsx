import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../Pages/responsive";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "20vh" })}

`;

const Info = styled.div`
  position: absolute;
  top:120px ;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
    color:white;
    
`;

const Button = styled.button`

    border:absolute;
    margin-bottom: 20px;
    padding: 10px;
    background-color: white;
    color:gray;
    cursor: pointer;
    font-weight: 800;
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Link to={`/products/${item.cat}`}>
        <Image src={item.img} />
        <Info>
          
          <Button>SHOP NOW</Button>
          <Title>{item.title}</Title>
        </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;
