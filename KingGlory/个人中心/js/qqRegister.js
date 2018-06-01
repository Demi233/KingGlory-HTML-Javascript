var count = 1;

function setBackground() {
	if(count % 3 == 1) {
		document.getElementById("bg-col").src = "img-register/bg1.jpg";
	} else if(count % 3 == 2) {
		document.getElementById("bg-col").src = "img-register/bg2.jpg";
	} else {
		document.getElementById("bg-col").src = "img-register/bg3.jpg";
	}
	count++;
}

setInterval(setBackground, 2000);

//function changeSearchIcon(){
//	
//}

function showFont(){
	document.getElementById("hide-third").style.display = "block";
	document.getElementById("third").src = "img-register/up.png";
}

function hideFont(){
	document.getElementById("hide-third").style.display = "none";
	document.getElementById("third").src = "img-register/down.png";
}

function changePic(pic){
	var pics = pic.src.split("/");
	if(pics[pics.length - 1] == "checkbox_check.png"){
		pic.src = "img-register/checkbox_normal.png";
	}else{
		pic.src = "img-register/checkbox_check.png";
	}
}

var count_box = 1;
function showBox(){
	if(count_box % 2 == 1){
		document.getElementById("hide-box").className = "hide-box visible";
		document.getElementById("icon-select").src = "img-register/up.png";
	}else{
		document.getElementById("hide-box").className = "hide-box hidden";
		document.getElementById("icon-select").src = "img-register/down.png";
	}
	count_box++;
}
