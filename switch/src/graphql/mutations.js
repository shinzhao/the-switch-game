// eslint-disable
// this is an auto generated file. This will be overwritten

export const createQw = `mutation CreateQw($input: CreateQwInput!) {
  createQw(input: $input) {
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
export const updateQw = `mutation UpdateQw($input: UpdateQwInput!) {
  updateQw(input: $input) {
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
export const deleteQw = `mutation DeleteQw($input: DeleteQwInput!) {
  deleteQw(input: $input) {
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
export const createRoompage = `mutation CreateRoompage($input: CreateRoompageInput!) {
  createRoompage(input: $input) {
    roomid
    players
  }
}
`;
export const updateRoompage = `mutation UpdateRoompage($input: UpdateRoompageInput!) {
  updateRoompage(input: $input) {
    roomid
    players
  }
}
`;
export const deleteRoompage = `mutation DeleteRoompage($input: DeleteRoompageInput!) {
  deleteRoompage(input: $input) {
    roomid
    players
  }
}
`;
export const createReadyPageTable = `mutation CreateReadyPageTable($input: CreateReadyPageTableInput!) {
  createReadyPageTable(input: $input) {
    roomID
    players
    readyStatus
    cards
    GameStart
    readyNum
  }
}
`;
export const updateReadyPageTable = `mutation UpdateReadyPageTable($input: UpdateReadyPageTableInput!) {
  updateReadyPageTable(input: $input) {
    roomID
    players
    readyStatus
    cards
    GameStart
    readyNum
  }
}
`;
export const deleteReadyPageTable = `mutation DeleteReadyPageTable($input: DeleteReadyPageTableInput!) {
  deleteReadyPageTable(input: $input) {
    roomID
    players
    readyStatus
    cards
    GameStart
    readyNum
  }
}
`;
