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
      </Cell>
    </Grid>

        </div>
        </div>
    )
}
}

export default profile;