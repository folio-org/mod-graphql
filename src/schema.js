export default `
  type Query {
    hello: String
    users(cql: String):[User]
    groups:[Group]
    instances(cql: String, offset: Int, limit: Int):InstancesWithTotalCount
    instance(id: String):Instance
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
    ): ID!
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

  # Instances and reference tables
  type InstancesWithTotalCount {
    records: [Instance]
    totalCount: Int
  }

  type Instance {
    id: ID!
    source: String
    title: String!
    alternativeTitles: [String]
    edition: String
    series: [String]
    identifiers: [Identifier]
    contributors: [Contributor]
    subjects: [String]
    classifications: [Classification]
    publication: [Publication]
    urls: [String]
    instanceTypeId: String
    instanceType: IdName
    instanceFormatId: String
    instanceFormat: IdName
    physicalDescriptions: [String]
    languages: [String]
    notes: [String]
    metadata: Metadata
    holdingsRecords: [HoldingsRecord]
  }

  type HoldingsRecord {
    id: ID!
    instanceId: ID!
    permanentLocationId: ID
    callNumber: String
    holdingsStatements: [String]
    metadata: Metadata
  }

  type Identifier {
    value: String!
    identifierTypeId: String
    identifierType: IdName
  }

  type Contributor {
    name: String!
    contributorTypeId: String
    contributorType: IdName
    contributorNameTypeId: String
    contributorNameType: IdName
    primary: Boolean
  }

  type Classification {
    classificationNumber: String!
    classificationTypeId: ID!
    classificationType: IdName
  }

  type Publication {
    publisher: String
    place: String
    dateOfPublication: String
  }

  type IdName {
    id: ID!
    name: String!
  }
  # EOF instances and reference tables

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
