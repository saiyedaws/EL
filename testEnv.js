
function promoteListing()
{
	document.getElementById("optinCheckbox").click();

	var select = document.getElementById("adRate");
	select.value = "3.1";

	var evt = document.createEvent("HTMLEvents");
	evt.initEvent("change", false, true);
	select.dispatchEvent(evt);
}

promoteListing();