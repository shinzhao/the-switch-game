import React, { Component } from 'react';

class profile extends Component {
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
  <div class="row" id="ivgqjx">
    <div class="cell" id="ig8irc">
      <img id="ivf9oy" src="./img/team1.jpg"/>
    </div>
    <div class="cell" id="idhcuh">
      <div id="isg7fj">Matt McLean
      </div>
      <div id="ixje8b">Info:
        <br/>
        <br/>
        <br/>
      </div>
      <div id="i7baxi">Win: 208  Lost: 96  Point: 1134  Rank: 1776
      </div>
    </div>
  </div>
  <div class="row" id="i69sek">
    <div class="cell" id="i8sbax">
      <label class="label">                  Name</label>
    </div>
    <div class="cell" id="itsfqj">
      <input id="ide4ss"/>
    </div>
  </div>
  <div class="row" id="iy4ufc">
    <div class="cell" id="i6hc72">
      <label class="label">                  Email</label>
    </div>
    <div class="cell" id="it7d67">
      <input id="i9vv0i"/>
    </div>
  </div>
  <div class="row" id="ice2i5">
    <div class="cell" id="i6sopw">
      <label class="label">               Gender</label>
    </div>
    <div class="cell" id="i7w42t">
      <input type="checkbox" value="F" class="checkbox"/>
      <label class="checkbox-label">Male</label>
      <input type="checkbox" value="M" class="checkbox"/>
      <label class="checkbox-label">Female</label>
    </div>
  </div>
  <div class="row" id="ikk0ch">
    <div class="cell" id="itwcsj">
      <label class="label">                     Info</label>
    </div>
    <div class="cell" id="in7vap">
      <textarea id="ivikdg"></textarea>
    </div>
  </div>
  <div class="form-group">
  </div>
  <div class="row" id="if8dpg">
    <div class="cell" id="irm6mf">
      <label class="label">            Password</label>
    </div>
    <div class="cell" id="i3k18f">
      <input id="iij6sl"/>
    </div>
  </div>
  <div class="row" id="iyn75a">
    <div class="cell" id="ipc60h">
      <label class="label">Confirm Password</label>
    </div>
    <div class="cell" id="i5gfo7">
      <input id="iau29l"/>
    </div>
  </div>
  <div class="row" id="i2djx4">
    <div class="cell" id="iir6ni">
      <button type="submit" class="button">Save</button>
    </div>
    <div class="cell">
      <button type="submit" class="button">Cancel</button>
    </div>
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

export default profile;