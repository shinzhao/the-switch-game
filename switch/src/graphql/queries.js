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
    cardLeft
    userList
    cardGet
    rank
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
      cardLeft
      userList
      cardGet
      rank
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
export const getReadyPageTable = `query GetReadyPageTable($roomID: Int!) {
  getReadyPageTable(roomID: $roomID) {
    roomID
    players
    readyStatus
    cards
    GameStart
    readyNum
  }
}
`;
export const listReadyPageTables = `query ListReadyPageTables(
  $filter: TableReadyPageTableFilterInput
  $limit: Int
  $nextToken: String
) {
  listReadyPageTables(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      roomID
      players
      readyStatus
      cards
      GameStart
      readyNum
    }
    nextToken
  }
}
`;
