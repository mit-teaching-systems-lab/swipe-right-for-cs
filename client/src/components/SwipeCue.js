import React from "react";

// drawn with http://editor.method.ac/
// animated with https://maxwellito.github.io/vivus-instant/
// converted to React with https://github.com/smooth-code/svgr
const SwipeCue = props => (
  <div>
    <style>{`.ylUPWWhs_0{stroke-dasharray:1968 1970;stroke-dashoffset:1969;animation:ylUPWWhs_draw_0 1500ms ease-out 0ms,ylUPWWhs_fade 1500ms linear 0ms;}.ylUPWWhs_1{stroke-dasharray:400 402;stroke-dashoffset:401;animation:ylUPWWhs_draw_1 1500ms ease-out 0ms,ylUPWWhs_fade 1500ms linear 0ms;}.ylUPWWhs_2{stroke-dasharray:248 250;stroke-dashoffset:249;animation:ylUPWWhs_draw_2 1500ms ease-out 0ms,ylUPWWhs_fade 1500ms linear 0ms;}@keyframes ylUPWWhs_draw{100%{stroke-dashoffset:0;}}@keyframes ylUPWWhs_fade{0%{stroke-opacity:1;}87.3015873015873%{stroke-opacity:1;}100%{stroke-opacity:0;}}@keyframes ylUPWWhs_draw_0{63.49206349206349%{stroke-dashoffset: 1969}68.78306878306879%{ stroke-dashoffset: 0;}100%{ stroke-dashoffset: 0;}}@keyframes ylUPWWhs_draw_1{64.81481481481481%{stroke-dashoffset: 401}70.10582010582011%{ stroke-dashoffset: 0;}100%{ stroke-dashoffset: 0;}}@keyframes ylUPWWhs_draw_2{66.13756613756614%{stroke-dashoffset: 249}71.42857142857143%{ stroke-dashoffset: 0;}100%{ stroke-dashoffset: 0;}}`}</style>
    <svg width={250} height={25} {...props}>
      <path
        d="M1.5 19h53c42 0 74.036-1.363 115-4 25.028-1.611 49.251-3.36 61-6 8.336-1.873 14-4 16-5h1"
        strokeWidth={18}
        stroke="rgb(37, 214, 137)"
        fill="none"
        className="ylUPWWhs_2"
      />
    </svg>
  </div>
);

export default SwipeCue;