import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../../Compenements/Announcement";
import Footer from "../../Compenements/Footer";
import Navbar from "../../Compenements/Navbar";
import { mobile } from "../responsive";
import StripeCheckout from 'react-stripe-checkout';
import { useState , useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from "axios";
const KEY= "pk_test_51Kc8SlIVukCDBTA6QuepoqoDEpy1WIYc9FMhBBIltHYG29kXqyjH45j1sVbqmLpWCeIQW9CZUSitJWATGFMRJ3Gn00fDaVC38w"




const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = ({ping,setPing}) => {

  useEffect(() => {
    
   
  }, [])
  const totale = (tot,product)=>{
    return tot+product.quantity*product.product.price
  }
  
 
  const user = useSelector((state)=>state.users.current)
  
  const [stripeToken,setstripeToken] = useState(null);
  const navigate = useNavigate();
 

  const onToken =(token) =>{
         setstripeToken(token);
      };
  
  const deletePanier = async (e)=>{ 

    e.preventDefault();
    await axios.delete(`/panier/${user.panier._id}`);
    setPing(!ping)
  };

  
     
  return (
    <Container>
      <Navbar  />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={()=>navigate("/", { replace: true })} >CONTINUE SHOPPING</TopButton>
          
          <TopButton type="filled" onClick={deletePanier}>Supprimer panier  </TopButton>
        </Top>
        <Bottom>
          <Info>
            { user?.panier?
              user.panier.products.map(product=>(<Product>
              <ProductDetail>
                <Image src={product.product.img} />
                <Details>
                  <ProductName>
                    <b>Product:</b> {product.product.title}
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> {product.product.id}
                  </ProductId>
                  <ProductColor color={product.product.color}/>
                  <ProductSize>
                    <b>Taille:</b> {product.product.size}
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <Add />
                  <ProductAmount>{product.quantity}</ProductAmount>
                  <Remove />
                </ProductAmountContainer>
                <ProductPrice>€ {product.product.price * product.quantity}</ProductPrice>
              </PriceDetail>
            </Product>
            )): <h1>Chargement </h1> }
            <Hr />
            
          </Info>
          <Summary>
            <SummaryTitle>RÉCAPITULATIF DE LA COMMANDE</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>€{user?.panier?.products.reduce(totale,0)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Frais de livraison estimés</SummaryItemText>
              <SummaryItemPrice>€5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Remise sur l'expédition</SummaryItemText>
              <SummaryItemPrice>€ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>€{user?.panier?.products.reduce(totale,0)}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
                name='jaafar magasin'
                image='https://www.technobezz.com/files/uploads/2021/02/X462YQ4HIJEGHHX2I3LXRV4G7A.jpg'
                billingAddress
                shippingAddress
                description={`your total is  $${user?.panier?.products.reduce(totale,0)}`}
                amount={user?.panier?.products.reduce(totale,0)*100}
                token={onToken}
                stripeKey={KEY}>
                <Button>RÉGLER MAINTENANT</Button>

          </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
