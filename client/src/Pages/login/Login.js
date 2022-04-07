import { ToastContainer, toast } from 'react-toastify';
import React from 'react';
import styled from "styled-components";
import {mobile} from "../responsive";
import axios from 'axios';
import { useState } from 'react';
import { useNavigate , Link} from 'react-router-dom';



const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/11500407/pexels-photo-11500407.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
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
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: black;
  margin:auto;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled{
    color:green ;
    cursor : not-allowed;
  }
`;

const LINK = styled.a`
  margin: 5px 0px;
  
  margin:auto;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;


const Login = ({ping,setPing}) => {
    const [user, setUser] = useState({
        email:"",
        password:""
    })
    const navigate = useNavigate();
    const login = async (e)=>{
        e.preventDefault();
        try {
            await axios.post
            ("/user/login", user)
            .then((res)=>localStorage.setItem("token",res.data.token))
            .then(()=>navigate("/", { replace: true }));
        } catch (error) {
           let erreur = error.response.data.errors;
           console.log(erreur)
           
           for (let i=0 ; i<erreur.length; i++){
             
            toast.error(erreur[i].msg)
           }

            
        };
      setPing(!ping)
        
    } 
  return (
    <div>
    <Container>
        <Wrapper>
        <Title>SE CONNECTER </Title>
        <Form>
            <Input placeholder="email" type="email" onChange={(e)=>setUser({...user,email:e.target.value})} />
            <Input placeholder="mot de passe " type="password" onChange={(e)=>setUser({...user,password:e.target.value})} />
            <Button  onClick={login}>LOGIN</Button>
            <ToastContainer />
            
            <LINK>DO NOT YOU REMEMBER THE PASSWORD?</LINK>
            <Link style={{ margin:"auto" , color:"black"}}  to="/register"><LINK >CREER UN NOUVEAU COMPTE </LINK></Link>
        </Form>
        </Wrapper>
    </Container>
  </div>
  )
}

export default Login