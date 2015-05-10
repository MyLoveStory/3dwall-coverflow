/**
 * Copyright (c) 2014 Famous Industries, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * @license MIT
 */
/**
 * Scrollview
 * ------------
 *
 * Scrollview is one of the core views in Famo.us. Scrollview
 * will lay out a collection of renderables sequentially in
 * the specified direction, and will allow you to scroll
 * through them with mousewheel or touch events.
 *
 * In this example, we have a Scrollview that sequences over
 * a collection of surfaces that vary in color
 */
define(function(require, exports, module) {
    function createScrollView(t){var r=new Scrollview({direction:Utility.Direction.X,rails:!1,margin:2*RADIUS*Math.PI,paginated:!0,pageStopSpeed:.1}),e=[],i=new ViewSequence({array:e,loop:!0});return r.sequenceFrom(i),r.outputFrom(function(t){var r=Transform.moveThen([0,0,-RADIUS],Transform.rotate(0,2*Math.PI/(DATA_LENGTH*WIDTH)*t,0));return r}),Engine.pipe(r),r.row=t,{scrollview:r,surfaces:e}}function addData(t,r,e){data.push(r);for(var i,n=0;n<r.length;n++){var i=new Surface({origin:[-.5,-.5],content:r[n].id,size:[WIDTH,HEIGHT],classes:["cover"],properties:{backgroundColor:"rgba(0,168,200,1)",backgroundImage:"url("+r[n].img_pad1+")",fontWIDTH:"5px"}});i.idx=n,i.row=e,i.on("click",function(){_lookAt.call(this)}.bind(i));var o=new Surface({size:[WIDTH,HEIGHT],classes:["block"],properties:{backgroundColor:"white"},content:"BACK",fontWIDTH:"5px"}),a=new Flipper({size:[WIDTH,HEIGHT],origin:[.5,.5]});a.setFront(i),a.setBack(o),o.on("click",function(){this.flipper.flip({duration:500})}.bind(i)),i.flipper=a,i.back=o,t.push(a)}}function bigThumb(){this.setProperties({backgroundColor:"rgba(255,255,255,1)",background:"url(http://media.serverchimp.com.s3.amazonaws.com/styletrend/"+data[this.row][this.idx].vendor+"/pad_500_500_8eng_"+data[this.row][this.idx].id+".jpg) 0 0",fontWIDTH:"5px"})}function backFace(){$.getJSON("http://8eng.8engine.net/api/get_product/"+data[this.row][this.idx].vendor+"/"+data[this.row][this.idx].id,function(t){this.back.setProperties({backgroundColor:"rgba(255,255,255,1)",backgroundImage:"",fontWIDTH:"5px"}),this.back.setContent(t.description)}.bind(this))}function showme(){if(flipped)lightbox.hide(this),flipped=!1,bigThumb.call(this);else{var t=Transform.aboutOrigin([WIDTH/2,0,0],Transform.rotateY(Math.PI));lightbox.setOptions({inTransform:this._matrix,outTransform:this._matrix,showTransform:Transform.multiply(this._matrix,t)}),lightbox.show(this),flipped=!0,backFace.call(this)}}function _lookAt(){if(this!=current){var t=Transform.interpret(this._matrix);moveCam(-offset,transition);var r=Transform.translate(0,t.translate[1]-HEIGHT/2-GRID*(this.row-rows/2),RADIUS),e=[t.rotate[0],-t.rotate[1],t.rotate[2]],e=Transform.normalizeRotation(e),i=e[1];Math.abs(Math.abs(i)-Math.abs(Math.PI))<EPSILON&&0>prevRot&&(i=-i);for(var n=Transform.aboutOrigin([0,0,RADIUS],Transform.rotateY(i)),o=Transform.aboutOrigin([0,0,RADIUS],Transform.rotateY(-i)),a=Transform.multiply(r,n),s=Transform.multiply(r,o),c=0;c<rotMod.length;c++)rotMod[c].setTransform(a,transition,function(){Math.abs(Math.abs(i)-Math.abs(Math.PI))<EPSILON&&prevRot>0&&this.setTransform(s)}.bind(rotMod[c]));current=this,prevRot=e[1]}else backFace.call(this),_flipCard.call(this)}function _flipCard(){this.flipper.flip({duration:500})}function _resetLookAt(t){if(t.target==document.body){moveCam(-offset,transition);for(var r=0;r<rotMod.length;r++)rotMod[r].setTransform(Transform.identity,transition);current&&current.flipper.setAngle(0),current=null}}function clampRange(t){return 0>=t+offset?t=0-offset:t+offset>=RADIUS&&(t=RADIUS-offset),t}function moveCam(t,r){if(!(null!=current&&t>0)){var e=clampRange(t);offset+=e,cam.setTransform(Transform.translate(0,window.innerHeight/2-GRID*rows/2,offset),r)}}var Engine=require("famous/core/Engine"),Surface=require("famous/core/Surface"),Scrollview=require("./Scrollview"),View=require("famous/core/View"),Utility=require("famous/utilities/Utility"),Transform=require("famous/core/Transform"),StateModifier=require("famous/modifiers/StateModifier"),ViewSequence=require("famous/core/ViewSequence"),PinchSync=require("famous/inputs/PinchSync"),Transitionable=require("famous/transitions/Transitionable"),Lightbox=require("famous/views/Lightbox"),Flipper=require("./Flipper"),mainContext=Engine.createContext();mainContext.setPerspective(1e3);var recent,musthaves,trending,DATA_LENGTH=20,RADIUS=1200,WIDTH=300,HEIGHT=400,GRID=420,rows=0,current=null,curRow,data=[],offset=0;this.flip=new Transitionable(0);var me=this,EPSILON=.01,transition={duration:500},options={inTransform:Transform.identity,inOpacity:1,inOrigin:[0,0],outTransform:Transform.identity,outOpacity:1,outOrigin:[0,0],showTransform:Transform.translate(0,0,0),showOpacity:1,showOrigin:[0,0],inTransition:!0,outTransition:!0,overlap:!1},lightbox=new Lightbox(options),flipped=!1;mainContext.add(lightbox);var prevRot=0,view=new View,rotMod=[new StateModifier,new StateModifier,new StateModifier];recent=createScrollView(0);var recentMod=new StateModifier({transform:Transform.translate(window.innerWidth/2,0*GRID,-RADIUS)});rows++,view.add(recentMod).add(rotMod[0]).add(recent.scrollview),musthaves=createScrollView(1);var musthavesMod=new StateModifier({transform:Transform.translate(window.innerWidth/2,1*GRID,-RADIUS)});rows++,view.add(musthavesMod).add(rotMod[1]).add(musthaves.scrollview),trending=createScrollView(2);var trendingMod=new StateModifier({transform:Transform.translate(window.innerWidth/2,2*GRID,-RADIUS)});rows++,view.add(trendingMod).add(rotMod[2]).add(trending.scrollview);var cam=new StateModifier({transform:Transform.translate(0,window.innerHeight/2-GRID*rows/2,0)});mainContext.add(cam).add(view),$.getJSON("http://8eng.8engine.net/api/get_homepage",function(t){addData(recent.surfaces,t.recent,0),addData(musthaves.surfaces,t.musthaves,1),addData(trending.surfaces,t.trending,2)});var currentIdx=0;Engine.on("click",_resetLookAt);var pinchSync=new PinchSync;Engine.pipe(pinchSync);var velocity,distance,displacement;velocity=0,pinchSync.on("start",function(){}),pinchSync.on("update",function(t){moveCam(5*t.delta),velocity=Math.abs(t.velocity)>Math.abs(velocity)?t.velocity:velocity}),pinchSync.on("end",function(){moveCam(10*velocity,transition),velocity=0});});
