function pasteDraftTitle() {
	chrome.storage.local.get(["amazon"], async function (result) {
		let messageObject = {
			fpCmd: "titleSelected",
			suggestedCategories: [],
			title: result.amazon.title,
		};
		setTimeout(function () {
			window.postMessage(JSON.stringify(messageObject));
		}, 200);
	});
}

function pastePrice(product) {
	// Sets price
	document.querySelector("input#binPrice").value = product.custom_price;

	// Finds field with selling format and sets it fixed-price
	var select = document.querySelector("select#format");
	select.value = "StoresFixedPrice";

	var evt = document.createEvent("HTMLEvents");
	evt.initEvent("change", false, true);
	select.dispatchEvent(evt);
}

function pasteTitle(product) {
	//document.querySelector("input#editpane_title").value = product.custom_title;
	document.querySelector("input#editpane_title").value = product.custom_title;
}

function pasteAsin(product) {
	var encodedAsin = btoa(product.sku);
	document.querySelector("input#editpane_skuNumber").value = encodedAsin;
}

function pasteUpc(product) {
	try {
		document.querySelector("input#upc").value = product.upc;
	} catch (error) {
		console.log(error);
	}
}

function pickItemCondition() {
	// New Item Condition
	var select = document.querySelector("select#itemCondition");
	select.value = "1000";

	var evt = document.createEvent("HTMLEvents");
	evt.initEvent("change", false, true);
	select.dispatchEvent(evt);
}

function pasteBrand(product) {
	try {
		deleteOldBrand();
	} catch (error) {
		console.log(error);
	}

	var select = document.getElementById("Listing.Item.ItemSpecific[Brand]");
	select.value = "Unbranded";
}

function pasteNAToRequiredItemSpecifics() 
{
	//var reqdElms = document.getElementsByClassName("eib-selTgLbl reqd");
	var reqdElms = document.getElementsByClassName("reqd");
	for (let index = 0; index < reqdElms.length; index++) {
		var reqdElm = reqdElms[index].parentElement.parentElement.parentElement;
		//console.log(reqdElm);

		var matchedElems = reqdElm.querySelectorAll("[name*='_st_']");

		if (matchedElems.length > 0) {
			var matchedEle = reqdElm.querySelectorAll("[name*='_st_']")[0];

			//console.log(matchedEle);
			//console.log(index);

			if (
				matchedEle.value == "" ||
				matchedEle.value == 0 ||
				matchedEle.value == null
			) {
				// Invalid... Box is empty
				//console.log("Box is empty");
				matchedEle.value = "N/A";
			}
		}
	}

	var materialElm = document.querySelectorAll(
		`[id="Listing.Item.ItemSpecific[Material]"]`
	);

	if (materialElm.length > 0) 
	{
		//console.log(materialElm[0]);
		//console.log(materialElm[0].value);

		if (
			materialElm[0].value == "" ||
			materialElm[0].value == 0 ||
			materialElm[0].value == null
		) {
			// Invalid... Box is empty
			// console.log("Box is empty");
			materialElm[0].value = "N/A";
		}
	}


	var mpnElm = document.querySelectorAll(
		`[id="Listing.Item.ItemSpecific[MPN]`
	);

	if (mpnElm.length > 0) 
	{
		//console.log(materialElm[0]);
		//console.log(materialElm[0].value);

		if (
			mpnElm[0].value == "" ||
			mpnElm[0].value == 0 ||
			mpnElm[0].value == null
		) {
			// Invalid... Box is empty
			// console.log("Box is empty");
			mpnElm[0].value = "Does Not Apply";
		}
	}


	var typeElm = document.querySelectorAll(
		`[id="Listing.Item.ItemSpecific[Type]`
	);

	if (typeElm.length > 0) 
	{
		//console.log(materialElm[0]);
		//console.log(materialElm[0].value);

		if (
			typeElm[0].value == "" ||
			typeElm[0].value == 0 ||
			typeElm[0].value == null
		) {
			// Invalid... Box is empty
			// console.log("Box is empty");
			typeElm[0].value = "Does Not Apply";
		}
	}




}

function deleteOldBrand() {
	var matchedElems = document.querySelectorAll("[n*='Brand']");
	matchedElems[0].getElementsByTagName("button")[0].click();
}
