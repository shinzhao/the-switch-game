// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateQw = `subscription OnCreateQw(
  $username: String
  $roomID: Int
  $seat: Int
  $x: Int
  $y: Int
) {
  onCreateQw(username: $username, roomID: $roomID, seat: $seat, x: $x, y: $y) {
    username
    roomID
    seat
    x
    y
    whichCard
  }
}
`;
export const onUpdateQw = `subscription OnUpdateQw(
  $username: String
  $roomID: Int
  $seat: Int
  $x: Int
  $y: Int
) {
  onUpdateQw(username: $username, roomID: $roomID, seat: $seat, x: $x, y: $y) {
    username
    roomID
    seat
    x
    y
    whichCard
  }
}
`;
export const onDeleteQw = `subscription OnDeleteQw(
  $username: String
  $roomID: Int
  $seat: Int
  $x: Int
  $y: Int
) {
  onDeleteQw(username: $username, roomID: $roomID, seat: $seat, x: $x, y: $y) {
    username
    roomID
    seat
    x
    y
    whichCard
  }
}
`;
export const onCreateRoompage = `subscription OnCreateRoompage($roomid: Int, $players: [String]) {
  onCreateRoompage(roomid: $roomid, players: $players) {
    roomid
    players
  }
}
`;
export const onUpdateRoompage = `subscription OnUpdateRoompage($roomid: Int, $players: [String]) {
  onUpdateRoompage(roomid: $roomid, players: $players) {
    roomid
    players
  }
}
`;
export const onDeleteRoompage = `subscription OnDeleteRoompage($roomid: Int, $players: [String]) {
  onDeleteRoompage(roomid: $roomid, players: $players) {
    roomid
    players
  }
}
`;
