//上下滚屏时隐藏显示topbar
export default function (up, down) {
		let startY = 0;
        bindEvent();
		function touchSatrtFunc(ev) {
			let touch = ev.touches[0]; 
			let y = Number(touch.pageY); 
			startY = y;
		}

		function touchMoveFunc(ev) {
			let touch = ev.touches[0]; 
			let y = Number(touch.pageY);
			if (y - startY > 0) {
				up();
			} else {
				down();
			}
		}
		function bindEvent() {
			document.addEventListener('touchstart', touchSatrtFunc, false);
			document.addEventListener('touchmove', touchMoveFunc, false);
		}
}