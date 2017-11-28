export default `
  type Query {
    hello: String
    users(cql: String):[User]
    groups:[Group]
  }

  type Mutation {
    updateUser (
      id: ID!
      personal: PersonalInput
    ): User
    createGroup (
      record: GroupInput!
    ): Group
    updateGroup (
      id: ID!
      record: GroupInput!
    ): Group
    deleteGroup (
      id: ID!
    ): Group
  }

  type User {
    id: ID!
    username: String!
    barcode: String
    patronGroup: String
    active: Boolean
    personal: Personal!
  }

  type Personal {
    lastName: String!
    firstName: String
    email: String
  }

  type Group {
    id: ID!
    group: String!
    desc: String
    metadata: Metadata!
    userCount: Int
  }

  type Metadata {
    createdDate: String!
    createdByUserId: ID!
    createdByUser: User
    updatedDate: String
    updatedByUserId: ID
    updatedByUser: User
  }

  # This is a bit silly isn't it?
  input PersonalInput {
    lastName: String
    firstName: String
    email: String
  }

  input GroupInput {
    group: String
    desc: String
  }
`;
