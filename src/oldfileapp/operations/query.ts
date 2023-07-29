import gql from 'graphql-tag';

export const meData = gql`
query
{ 
  users (id: 1)
  { 
    id  fname lname name_fl status
  }
}
`;

/* 
export const meData = gql`
query {
  me {
    status
    message
    user {
      id
      name
      lastname
      email
      registerDate
    }
  }
}
`;



export const login = gql`
query login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    status
    message
    token
  }
}
`;  */

export const login = gql`
mutation login($username: String!, $password: String!) {
  login(input:{username: $username, password: $password}) {
    status,
    message,
    access_token,  
    refresh_token,  
    token_type,  
    user {id, email, fname, lname created_at, updated_at}
   }
}
`; 

export const getUsers = gql`
query {
  users {
    id
    fname
    lname
    email
    telephone
    status
    teams 
    {id, name, country_code, contact_no, time_zone, company_id},  
    positions 
    {id, name, owner_id, company_id},  
    groups  
    {id, name, owner_id, company_id}
    company
    {id, company_name, industry}
  }
}
`;
