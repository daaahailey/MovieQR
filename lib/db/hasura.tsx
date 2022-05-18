// insert new quote
export async function insertQuotes (token:any, { userId, movieId, quote }:any) {

const operationsDoc = `
  mutation insertQuotes($userId: String!, $movieId: String!, $quote: String!) {
    insert_quotes_one( object: {
        movieId: $movieId, 
        quote: $quote, 
        userId: $userId,
      }) {
            userId
            quote
    }
  }
`

  const response = await queryHasuraGraphQL(operationsDoc, "insertQuotes", { userId, movieId, quote }, token);
  console.log({response});
  return response;
}


// update existing quote
export async function updateQuotes (token:any, { userId, movieId, quote }:any) {

  const operationsDoc = `
  mutation updateQuotes($userId: String!, $movieId: String!, $quote: String!) {
    update_quotes(
      _set: {quote: $quote}, 
      where: {
        userId: {_eq: $userId}, 
        movieId: {_eq: $movieId}
      }) {
        returning {
          userId
          movieId
          quote
        }
    }
  }
`

  const response = await queryHasuraGraphQL(operationsDoc, "updateQuotes", { userId, movieId, quote }, token);
  // console.log({ response });
  return response;
}



// find movie id by user
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
  return response?.data?.quotes?.length > 0;
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