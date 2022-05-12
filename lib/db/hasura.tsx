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