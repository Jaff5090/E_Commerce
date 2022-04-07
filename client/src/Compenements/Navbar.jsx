import { Badge } from "@material-ui/core";
import { SearchOutlined, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import {mobile} from "../Pages/responsive";
import { useSelector } from "react-redux";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  color: red ;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  outline:none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  text-transform: uppercase;
  font-size: 14px;
  cursor: pointer;

  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const quantity = useSelector(state=>state.panier.quantity)
  const user = useSelector((state)=>state.users.current)
  const isAuth = localStorage.getItem("token")
  const Location = () => {
    navigate("/",{replace: true}).then(window.location.reload())
  }
  const navigate = useNavigate();
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language >FR</Language>
          <SearchContainer>
            <Input placeholder="Recherche" />
            <SearchOutlined style={{ color: "red", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo style={{color:"black"}}>CHIC VETEMENTS  </Logo>
        </Center>
        <Right>
          {isAuth  ?
           
           <Right>
             
              <MenuItem >{user.name}</MenuItem>
              <MenuItem  onClick={()=>{localStorage.removeItem("token"); Location()}}>DECONNEXION</MenuItem>
                <Link to="/panier">
                  <MenuItem >
                    <Badge   badgeContent={user?.panier?.products.length} color="error">
                      <ShoppingCartOutlined  />
                    </Badge>
                  </MenuItem>
              </Link>
           </Right> : 
           <Right>
            <MenuItem  onClick={()=>navigate("/register", { replace: true })}>S'INSCRIRE</MenuItem>
            <MenuItem onClick={()=>navigate("/login", { replace: true })}>CONNEXION</MenuItem>

           </Right>


           }
         
          
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
