import React, { Component } from 'react';


class roomlist extends Component {
  render() {
    return (
      <div>
       <div data-gjs="navbar" class="navbar">
  <div class="navbar-container">
    <div id="i7y9ql" class="navbar-burger">
      <div class="navbar-burger-line">
      </div>
      <div class="navbar-burger-line">
      </div>
      <div class="navbar-burger-line">
      </div>
    </div>
    <div data-gjs="navbar-items" class="navbar-items-c">
      <nav data-gjs="navbar-menu" class="navbar-menu">
        <a href="#" class="navbar-menu-link">Lobby</a>
        <a href="#" class="navbar-menu-link">Game Rule</a>
        <a href="#" class="navbar-menu-link">My Account</a>
      </nav>
    </div>
  </div>
</div>
<form class="form">
  <div class="form-group">
  </div>
  <div class="form-group">
  </div>
  <div class="form-group">
    <div id="ikg9pe">Switch
    </div>
    <div class="row" id="iep22y">
      <div class="cell" id="i14qkl">
        <div id="ifsz1i">Room: 001
          <div>
            <br/>
          </div>
          <div>
            <br/>
          </div>
          <div>Playing                   4/4
          </div>
        </div>
        <div id="i8fz15">Room: 021
          <div id="ixppxe-2">
            <br id="i5otfm-2"/>
          </div>
          <div id="ipqbof-2">
            <br id="ijb331-2"/>
          </div>
          <div id="iswws8-2">Open                      4/4
          </div>
        </div>
        <div id="iejlpg">Room: 001
          <div id="iluyye-2">
            <br id="i039kw-2"/>
          </div>
          <div id="i7g0jk-2">
            <br id="ighakm-2"/>
          </div>
          <div id="infrd4-2">Locked                   4/4
          </div>
        </div>
        <div id="i9cx51">Room: 001
          <div>
            <br/>
          </div>
          <div>
            <br/>
          </div>
          <div>Playing                   4/4
          </div>
        </div>
      </div>
      <div class="cell" id="izwbzd">
        <div id="ikjpuf">Room: 002
          <div id="ibseyk-2-2">
            <br/>
          </div>
          <div id="ibseyk-2-2-2">
            <br/>
          </div>
          <div id="ibseyk-2-2-3">Locked                   4/4
          </div>
        </div>
        <div id="iiot8n">Room: 024
          <div id="if66bf-2">
            <br id="iqaw5k-2"/>
          </div>
          <div id="iz2ucu-2">
            <br id="iew22i-2"/>
          </div>
          <div id="ids1fh-2">Locked                   1/4
          </div>
        </div>
        <div id="igoppy">Room: 127
          <div id="ic21o7-2">
            <br id="igaq49-2"/>
          </div>
          <div id="ifrmq8-2">
            <br id="ig41n8-2"/>
          </div>
          <div id="im4i58-2">Playing                   4/4
          </div>
        </div>
        <div id="ircq7k">Room: 412
          <div id="iobf5u">
            <br id="iv5exu"/>
          </div>
          <div id="iobf5u-2">
            <br/>
          </div>
          <div id="i5hcoy">Locked                   2/4
          </div>
        </div>
      </div>
      <div class="cell" id="i1110l">
        <div id="ip5ltp">Room: 003
          <div id="iu8yvh-2-2">
            <br id="i120ey-2-2"/>
          </div>
          <div id="i060gg-2-2">
            <br id="ifjmy7-2-2"/>
          </div>
          <div id="icj3cl-2-2">Open                      3/4
          </div>
        </div>
        <div id="itvyql">Room: 047
          <div id="ij7om7-2">
            <br id="ifvi6u-2"/>
          </div>
          <div id="i5s0qf-2">
            <br id="ixuhq5-2"/>
          </div>
          <div id="irmitc-2">Playing                   4/4
          </div>
        </div>
        <div id="ix1fa9">Room: 133
          <div id="ivleg6-2">
            <br id="iyn6fk-2"/>
          </div>
          <div id="iy9zi7-2">
            <br id="il1pqf-2"/>
          </div>
          <div id="i3kxlj-2">Playing                   4/4
          </div>
        </div>
        <div id="i7zsjh">Room: 512
          <div id="i5we9i-2">
            <br id="iirnxu-2"/>
          </div>
          <div id="iia5zb-2">
            <br id="ilh9nh-2"/>
          </div>
          <div id="iu0i09-2">Playing                   4/4
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="cell" id="i0aswl">
        <label class="label">       Room#</label>
      </div>
      <div class="cell" id="ilxsh6">
        <input class="input"/>
      </div>
      <div class="cell" id="if3jpo">
        <button class="button">Enter</button>
      </div>
    </div>
    <div class="row">
      <div class="cell" id="ipkw6j">
        <button class="button">Create New Room</button>
      </div>
      <div class="cell">
        <button class="button">Random Match</button>
      </div>
    </div>
  </div>
  <div class="form-group">
  </div>
  <div class="form-group">
  </div>
</form>
<script>var items = document.querySelectorAll('#i7y9ql');
  for (var i = 0, len = items.length; i < len; i++) {
    (function(){
      var e,t=0,n=function(){
        var e,t=document.createElement("void"),n={
          transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};
        for(e in n)if(void 0!==t.style[e])return n[e]}
      (),r=function(e){
        var t=window.getComputedStyle(e),n=t.display,r=(t.position,t.visibility,t.height,parseInt(t["max-height"]));
        if("none"!==n&&"0"!==r)return e.offsetHeight;
        e.style.height="auto",e.style.display="block",e.style.position="absolute",e.style.visibility="hidden";
        var i=e.offsetHeight;
        return e.style.height="",e.style.display="",e.style.position="",e.style.visibility="",i}
      ,i=function(e){
        t=1;
        var n=r(e),i=e.style;
        i.display="block",i.transition="max-height 0.25s ease-in-out",i.overflowY="hidden",""==i["max-height"]&&(i["max-height"]=0),0==parseInt(i["max-height"])?(i["max-height"]="0",setTimeout(function(){
          i["max-height"]=n+"px"}
,10)):i["max-height"]="0"}
      ,a=function(r){
        if(r.preventDefault(),!t){
          var a=this.closest("[data-gjs=navbar]"),o=a.querySelector("[data-gjs=navbar-items]");
          i(o),e||(o.addEventListener(n,function(){
            t=0;
            var e=o.style;
            0==parseInt(e["max-height"])&&(e.display="",e["max-height"]="")}
                                     ),e=1)}
      };
      "gjs-collapse"in this||this.addEventListener("click",a),this["gjs-collapse"]=1}
     .bind(items[i]))()};
  }
</script>
      </div>
    );
  }
}

export default roomlist;