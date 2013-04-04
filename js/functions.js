!function (window, undefined){
	"use strict";

	window.onload = function() {
		document.menuscreen = MenuScreen();
	}

	//document.location.reload();

	function MenuScreen() {
		if (screen.width <=320 || document.width <=320) {
			document.getElementById("navbar").className = "navbar navbar-fixed-top";
			document.getElementById("navbar-inner").className = "navbar-inner";
			document.getElementById("btn-navbar").className ="btn btn-navbar";
		}

	}
	
}(this);