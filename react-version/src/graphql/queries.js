// eslint-disable
// this is an auto generated file. This will be overwritten

export const getTest1 = `query GetTest1($id: ID!) {
  getTest1(id: $id) {
    id
    x
    y
    whichCard
  }
}
`;
export const listTest1S = `query ListTest1S(
  $filter: TableTest1FilterInput
  $limit: Int
  $nextToken: String
) {
  listTest1S(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      x
      y
      whichCard
    }
    nextToken
  }
}
`;
