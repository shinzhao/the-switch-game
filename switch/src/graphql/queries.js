// eslint-disable
// this is an auto generated file. This will be overwritten

export const getQw = `query GetQw($username: String!) {
  getQw(username: $username) {
    username
    roomID
    seat
    x
    y
    whichCard
  }
}
`;
export const listQws = `query ListQws($filter: TableQwFilterInput, $limit: Int, $nextToken: String) {
  listQws(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      username
      roomID
      seat
      x
      y
      whichCard
    }
    nextToken
  }
}
`;
export const getRoompage = `query GetRoompage($roomid: Int!) {
  getRoompage(roomid: $roomid) {
    roomid
    players
  }
}
`;
export const listRoompages = `query ListRoompages(
  $filter: TableRoompageFilterInput
  $limit: Int
  $nextToken: String
) {
  listRoompages(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      roomid
      players
    }
    nextToken
  }
}
`;
