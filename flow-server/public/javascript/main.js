function scrollToSection(id) {
	document.getElementById(id).scrollIntoView({
		behavior: 'smooth',
	});
}

function showModal(id, displayVal) {
	if (displayVal) {
		$("#" + id).css("display", "inherit");
	}
	else {
		$("#" + id).css("display", "none");
	}
}

function checkPassword() {
	if($("#passwordVal1").val() === "") {
		$(".passwordMatch").css("display", "none");
		return true;
	}
	if($("#passwordVal0").val() !== $("#passwordVal1").val()) {
		$(".passwordMatch").css("display", "block");
		return false;
	}
	$(".passwordMatch").css("display", "none");
	return true;
}

