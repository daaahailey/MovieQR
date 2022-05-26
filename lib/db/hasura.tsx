// insert new quote
export async function insertQuotes (token:any, { userId, movieId, quote, userEmail }:any) {

const operationsDoc = `
  mutation insertQuotes($userId: String!, $movieId: String!, $quote: String!, $userEmail: String!) {
    insert_quotes_one( object: {
        movieId: $movieId, 
        quote: $quote, 
        userId: $userId,
        userEmail: $userEmail,
      }) {
            userId
            quote
            userEmail
    }
  }
`

  const response = await queryHasuraGraphQL(operationsDoc, "insertQuotes", { userId, movieId, quote, userEmail }, token);
  console.log({response});
  return response;
}


// update existing quote (written by the same user)
export async function updateQuotes (token:any, { userId, movieId, quote, id }:any) {

  const operationsDoc = `
  mutation updateQuotes($userId: String!, $movieId: String!, $quote: String!, $id: Int!) {
    update_quotes(
      _set: {quote: $quote}, 
      where: {
        userId: {_eq: $userId}, 
        movieId: {_eq: $movieId}
        id: {_eq: $id}
      }) {
        returning {
          userId
          movieId
          quote
          id
        }
    }
  }
`

  const response = await queryHasuraGraphQL(operationsDoc, "updateQuotes", { userId, movieId, quote, id }, token);
  // console.log({ response });
  return response;
}



// find movie and quote
export async function fetchMovieQuotes(admin:string, movieId:any) {
const operationsDoc = `
  query fetchMovieQuotes($movieId: String!) {
    quotes(where: {movieId: {_eq: $movieId }}) {
      id
      movieId
      quote
      userId
      userEmail
    }
  }
`
  const response = await queryAllQuotes(operationsDoc, "fetchMovieQuotes", { movieId }, admin);
  return response?.data?.quotes;
}



// find movie id by user - find quote I wrote
export async function findMovieIdByUser(token:any, userId:any, movieId:any) {

  const operationsDoc = `
    query findMovieByUserId($userId: String!, $movieId: String!) {
      quotes(where: {userId: {_eq: $userId }, movieId: {_eq: $movieId }}) {
        id
        userId
        movieId
        quote
      }
  }
`;
  const response = await queryHasuraGraphQL(operationsDoc, "findMovieByUserId", { userId, movieId }, token);
  return response?.data?.quotes;
}



// create a new user
export async function createNewUser (token:any, metadata:any) {

  const operationsDoc = `
    mutation createNewUser($issuer: String! , $email: String!, $publicAddress: String! ) {
        insert_users(objects: { email: $email, issuer: $issuer, publicAddress: $publicAddress }) {
          returning {
            id
            email
            issuer
          }
        }
    }
`;

  const { issuer, email, publicAddress } = metadata;
  const response = await queryHasuraGraphQL(operationsDoc, "createNewUser", { issuer, email, publicAddress }, token);
  console.log("create new user -", response)
  console.log({ response, issuer });
  return response;
}



// check if it's a new user
export async function isNewUser (token:any, issuer:any) {
  const operationsDoc = `
    query isNewUser($issuer: String!) {
      users(where: {issuer: {_eq: $issuer}}) {
        id
        email
        issuer
      }
    }
`;

    const response = await queryHasuraGraphQL(operationsDoc, "isNewUser", { issuer }, token);
    console.log("is new user - response",response)

    console.log({ response, issuer });
    return response?.data?.users?.length === 0;
  }


// fetchGraphQL  
export async function queryHasuraGraphQL(operationsDoc:any, operationName:any, variables:any, token:any) {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL as string,
    {
      method: "POST",
      headers: {
        // "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName
      }),
    }
  );
  return await result.json();
}



// query every quotes written by all users including things current user didn't write. 
export async function queryAllQuotes(operationsDoc:any, operationName:any, variables:any, admin:any) {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL as string,
    {
      method: "POST",
      headers: {
        "x-hasura-admin-secret": admin,
      },
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName
      }),
    }
  );
  return await result.json();
  console.log("quotes", result.json());
}