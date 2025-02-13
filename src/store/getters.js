const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  userId: state => state.user.userInfo.userId,
  avatar: state => state.user.userInfo ? state.user.userInfo.staffPhoto || "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" : "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
  username: state => state.user.userInfo ? state.user.userInfo.username || "Guest" : "Guest",
}
export default getters
