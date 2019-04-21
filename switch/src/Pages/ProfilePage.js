import React, { Component } from 'react';

class profile extends Component {
  render() {
    return (
        <div className="App">
        <div style={{width: '100%', margin: 'auto'}}>
    <Grid className="landing-grid">
      <Cell col={12}>
      <img
          src="https://www.shareicon.net/download/2015/09/18/103157_man_512x512.png"
          alt="profile-img"
          className="profile-img"
          />

        <div>
          <h1>username</h1>
        <hr/>
        </div>
      <p>Win: | Lost: | Presentage: |</p>
      {/* game records */}
      <div className="social-links">
    
      <div>
          <p>name</p>
          <input placeholder="username"></input>
          {/* username should placehold to the current name */}
      </div>
      <div>
          <p>Email</p>
          <input placeholder="email"></input>
          {/*email should placehold to the current name */}
      </div>
      <div>
          <p>Gender</p>
          <input required type="radio" value="male"></input>Male
          <input required type="radio" value="female"/>Female
      </div>
      <div>
          <p>Password</p>
          <input placeholder="8-10 chatacters"></input>
      </div>
      <div>
          <p>Confirm Password</p>
          <input></input>
      </div>
      <button type="submit">Save</button>
    </div>
        
      </Cell>
    </Grid>

        </div>
        </div>
    )
}
}

export default profile;