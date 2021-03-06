import React, { useState, useEffect } from "react";
import type { NextPage } from 'next';
import Head from 'next/head'
import { SearchContainer } from '../components/SearchContainer';
import { PopularMovies } from '../components/PopularMovies';
import { useAuth } from '../../context/AuthContext';
import { magic } from "../../lib/magic-client";
import jwt from "jsonwebtoken";
import { Seo } from "../components/Seo";

const Home: NextPage = (token:any, dToken:any) => {
  const userToken = token.token;
  const { saveCookie, saveDidToken } = useAuth();
  const [userEmail, setUserEmail] = useState("");

  interface JwtPayload {
  issuer: string;
  email: string;
  }

  useEffect(() => {
    const getMagicDidToken = async () => {
      try {
          if(magic) {
            const dToken = await magic.user.getIdToken(); 
            saveDidToken(dToken);
          }
      } catch(error) {
          console.log(error)
      }
    }

    if(userToken) {
      const decodedToken = jwt.verify(userToken, process.env.NEXT_PUBLIC_JWT_SECRET as string) as JwtPayload;  
      const email = decodedToken.email;
      setUserEmail(email) // set email using cookie from header
      saveCookie(userToken);
      getMagicDidToken(); // get did token from magic client and saveDidToken
    }
  }, [userToken])


  return (
    <>
      <Seo title="Home" description="Welcome to Movie QR" url="https://movie-qr.vercel.app/"/>
      <main>
        <SearchContainer />
        <PopularMovies />
      </main>
    </>
  )
}

export default Home;



export async function getServerSideProps(context:any) {
  const cookies = context.req.headers.cookie;
  let token = null;

  if(cookies) {
    token = cookies.split("token=")[1];
  }

  return {
    props: {
      token,
    }
  }
} 