import React from 'react';
import axios from 'axios';
import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://img.freepik.com/photos-gratuite/boutique-vetements-boutique-vetements-cintre-boutique-moderne_1150-8886.jpg?w=900&t=st=1648557355~exp=1648557955~hmac=cf5004ed6195d811d433c36bc4368855b78f6cbc35058a8f4a5e283fc523b0e4")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  text-align:center;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  margin:auto;
  padding: 15px 20px;
  background-color: black;
  color: white;
  cursor: pointer;
`;


const Register = ({ping,setPing}) => {
    const [user, setUser] = useState({
        name:"",
        lastName:"",
        email:"",
        password:"",
    });
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const handleConfirm = async (e)  => { 
        e.preventDefault();


        if(password===user.password) {
            try {
                await axios.post("/user/register", user)
                .then((res)=>localStorage.setItem("token",res.data.token))
                .then(()=>navigate("/", { replace: true }))
            } catch (error) {
               let erreur = error.response.data.errors;
               console.log(erreur)
               
               for (let i=0 ; i<erreur.length; i++){
                 
                toast.error(erreur[i].msg)
               }
                
            }
            
        }else{
          toast.error("confirm mot de passe non valide ")
        };
        setPing(!ping)

    }


  return (
    <Container>
    
      <Wrapper>
        <Title >CREER UN COMPTE </Title>
        <Form>
          <Input placeholder="Nom" onChange={(e)=>setUser({...user,name:e.target.value})} />
          <Input placeholder="Prenom" onChange={(e)=>setUser({...user,lastName:e.target.value})}/>
          <Input placeholder="Email" onChange={(e)=>setUser({...user,email:e.target.value})}/>
          <Input placeholder="Mot de passe"  type="password"  onChange={(e)=>setUser({...user,password:e.target.value})}/>
          <Input placeholder="Confirmer Mot de passe "  type="password" onChange={(e)=>setPassword(e.target.value)}/>
          <Agreement>
          En créant un compte, je consens au traitement de mes données personnelles conformément à la
             <b >POLITIQUE DE CONFIDENTIALITÉ</b>
          </Agreement>
          <Button onClick={handleConfirm}>CREER</Button> 
          <ToastContainer />
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Register 