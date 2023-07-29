import gql from 'graphql-tag';

export const registerData = gql`
    mutation addUser($user: UserInput!) {
        register(user: $user) {
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
    mutation login($username: String!, $password: String!) {
        login(input:{username: $username, password: $password}) {
            status
            message
            access_token 
            refresh_token 
            token_type 
            user {id email fname lname created_at updated_at}
       }
    }
`;
