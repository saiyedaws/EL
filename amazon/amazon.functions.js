let _q = (selector) => document.querySelectorAll(selector),
	isProductPage = () => _q("#dp").length;

function getProductTitle() {
	let title = "";

	// Simple checking of three possible containers
	if (_q("#ebooksProductTitle").length)
		title = $("#ebooksProductTitle").text().trim();
	else if (_q("h1.product-name").length)
		title = $("h1.product-name").text().trim();
	else if (_q("#productTitle").length) title = $("#productTitle").text().trim();

	return title;
}

function getFilteredTitle() {
	var title = getProductTitle();
	var brand = getProductBrand();

	//removing brand
	var filteredTitle = insensitiveReplaceAll(title, brand, "");

	//removing any MPN from title
	filteredTitle = filteredTitle.replace(/\b([A-Z]{3}[0-9].*?)\b/g, "");

	//from mpnList remove title
	var mpns = getModelPartNumberList();

	if (mpns.length > 0) {
		for (i = 0; i < mpns.length; i++) {
			var mpn = mpns[i].toLowerCase();
			filteredTitle = insensitiveReplaceAll(filteredTitle, mpn, "");
		}
	}

	//get rid of strange characters
	filteredTitle = filteredTitle.replace(/[^a-zA-Z \d]/g, " ");

	//remove first space in title
	filteredTitle = filteredTitle.replace(/^ /, "");

	//get rid of double white space
	filteredTitle = filteredTitle.replace(/\s\s+/g, " ");

	return filteredTitle;
}

function getProductPrice() {
	if (_q("#priceblock_ourprice").length) {
		return $("#priceblock_ourprice")
			.text()
			.trim()
			.replace(/[^\d.]+/g, "");
	} else {
		return "0.00";
	}
}

function getAmazonPrice() {
	var priceString = "-1";

	try {
		var priceElement = getPriceElement();
		priceString = priceElement.innerText.replace("CDN$ ", "");
	} catch (error) {}

	return Number(priceString);
}

function getPriceElement() {
	var priceElement =
		document.getElementById("price_inside_buybox") ||
		document.getElementById("newBuyBoxPrice") ||
		document.getElementById("priceblock_ourprice") ||
		document.getElementById("priceblock_saleprice") ||
		document.getElementById("buyNewSection") ||
		document.getElementById("buyNew_noncbb") ||
		document.getElementById("priceblock_dealprice");
	//Elements with weird options
	if (
		document.querySelectorAll("#buybox-see-all-buying-choices-announce")
			.length > 0
	) {
		var priceElement = document.createElement("div");
		priceElement.innerText = "-99999.00";
	}

	return priceElement;
}

function getProductBrand() {
	var brand = "";

	if (_q("#bylineInfo").length) brand = $("#bylineInfo").text().trim();
	else if (_q("#brand").length) brand = $("#brand").text().trim();

	return brand;
}

function getAsin() {
	var url = window.location.href;
	var ASINreg = new RegExp(/(?:\/)([A-Z0-9]{10})(?:$|\/|\?)/);
	var cMatch = url.match(ASINreg);
	if (cMatch == null) {
		return null;
	}
	return cMatch[1];
}

function removeUnwantedElements() {
	//key features
	try {
		var keyFeatures = document.getElementsByClassName("celwidget aplus-module");
		removeKeyFeatures(keyFeatures);
	} catch (error) {
		console.log(error);
	}

	function removeKeyFeatures(keyFeatures) {
		if (keyFeatures.length > 1) {
			var keyFeature = keyFeatures[keyFeatures.length - 1];
			keyFeature.parentNode.removeChild(keyFeature);

			var keyFeatures = document.getElementsByClassName(
				"celwidget aplus-module"
			);
			removeKeyFeatures(keyFeatures);
		}
	}
}

function getProductDescription() {
	let desc_html = "";

	if (_q("[id^='aplus']").length) desc_html += $("[id^='aplus']").html();

	if (_q("#descriptionAndDetails").length) {
		desc_html += $("#descriptionAndDetails").html();
	}

	if (_q("#productDescription").length) {
		desc_html += $("#productDescription").html();
	} else {
		if (_q("#bookDesc_iframe").length)
			desc_html += $("#bookDesc_iframe")
				.contents()
				.find("#iframeContent")
				.html();
		if (_q("#detail-bullets").length) desc_html += $("#detail-bullets").html();
		if (_q("#featurebullets_feature_div").length)
			desc_html += $("#featurebullets_feature_div").html();
		if (_q("#productDescription_feature_div").length)
			desc_html += $("#productDescription_feature_div").html();
	}

	// Cleaning JS code inside description
	//return desc_html.replace(/<script[^>]+>[^>]+script>/gim, "");

	desc_html = desc_html.replace(/<script[^>]+>[^>]+script>/gim, "");

	var html = HtmlSanitizer.SanitizeHtml(desc_html);

	html = insensitiveReplaceAll(html, "Read more", "");
	html = insensitiveReplaceAll(html, "amazon", "");
	html = insensitiveReplaceAll(html, "ebay", "");
	html = insensitiveReplaceAll(html, "warranty", "");
	html = insensitiveReplaceAll(html, "refund", "");

	html = insensitiveReplaceAll(html, "Email Address", "");
	html = insensitiveReplaceAll(html, "Email", "");
	html = insensitiveReplaceAll(html, "Address", "");

	html = insensitiveReplaceAll(html, "phone", "");

	//remove any email
	//html = html.replace(/([^.@\s]+)(\.[^.@\s]+)*@([^.@\s]+\.)+([^.@\s]+)/, "");
	html = html.replace(/([^.@\s]+)(\.[^.@\s]+)*@([^.@\s]+\.)+([^.@\s]+)/gim, "");
	html = html.replace(/([^.@\s]+)(\.[^.@\s]+)*@([^.@\s]+\.)+([^.@\s]+)/g, "");
	html = html.replace(/([^.@\s]+)(\.[^.@\s]+)*@([^.@\s]+\.)+([^.@\s]+)/gi, "");

	//remove phone numbers
	html = html.replace(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g, "");

	//remove all url
	html = html.replace(
		"\\b((?:[a-z][\\w-]+:(?:\\/{1,3}|[a-z0-9%])|www\\d{0,3}[.]|[a-z0-9.\\-]+[.][a-z]{2,4}\\/)(?:[^\\s()<>]+|\\(([^\\s()<>]+|(\\([^\\s()<>]+\\)))*\\))+(?:\\(([^\\s()<>]+|(\\([^\\s()<>]+\\)))*\\)|[^\\s`!()\\[\\]{};:'\".,<>?\u00AB\u00BB\u201C\u201D\u2018\u2019]))",
		""
	);

	html = insensitiveReplaceAll(html, "brand", "product");

	//---------------Removing mpn--------------

	//removing any MPN from title
	html = html.replace(/\b([A-Z]{3}[0-9].*?)\b/g, "");

	//from mpnList remove title
	var mpns = getModelPartNumberList();

	if (mpns.length > 0) {
		for (i = 0; i < mpns.length; i++) {
			var mpn = mpns[i].toLowerCase();
			html = insensitiveReplaceAll(html, mpn, "");
		}
	}

	try {
		var myobj = document.getElementById("demo");
		myobj.remove();
	} catch (error) {}

	return html;
}

function getBulletPoints() {
	let bullet_points = [];
	let bullet_points_html = "";
	if ($("#feature-bullets").length) {
		try {
			bullet_points_html = $("#feature-bullets").html();
			let bullets = $("#feature-bullets")
				.find("li")
				.not("#replacementPartsFitmentBullet")
				.not("[id*='MoreButton']")
				.find("span.a-list-item");
			for (let s = 0; s < bullets.length; s++) {
				let left_side = "";
				let right_side = "";
				try {
					try {
						left_side = $(bullets[s]).text().trim().split(":")[0].trim();
						right_side = $(bullets[s]).text().trim().split(":")[1].trim();
					} catch (error) {}

					if (left_side.toLowerCase().indexOf("this fits") != -1) {
						continue;
					}

					try {
						item_specifics_array = item_specifics_array.concat([
							{
								left_side: left_side,
								right_side: right_side,
							},
						]);
					} catch (e) {}
				} catch (e) {
					console.log(e);
				}
				try {
					let bullet = $(bullets[s]).text().trim();

					bullet_points.push(bullet.trim());
				} catch (e) {}
			}
		} catch (e) {}
	}

	bullet_points_html = bullet_points_html.replace(
		/<script[^>]+>[^>]+script>/gim,
		""
	);
	bullet_points_html_real = "";

	bullet_points_html_lis = $(bullet_points_html).find("li");
	for (let b = 0; b < bullet_points_html_lis.length; b++) {
		let bp_html_lis = $(bullet_points_html_lis[b]).html();

		if (bp_html_lis.search(/this fits/i) !== -1) continue;

		bullet_points_html_real +=
			"<li>" + $(bullet_points_html_lis[b]).html() + "</li>";
	}

	bullet_points_html = bullet_points_html_real;

	bullet_points_html = HtmlSanitizer.SanitizeHtml(bullet_points_html);

	return { list: bullet_points, html: bullet_points_html };
}

function getShippingWeight() {
	var shippingWeight = "0";

	shippingWeight = document
		.getElementsByClassName("shipping-weight")[0]
		.getElementsByClassName("value")[0].innerText;

	//document.get
}

function getProductPictures() {
	// Array with all links of images
	let main_img_src = [];

	try {
		let all_imgs = $("#imageBlock").find("img");

		for (let r = 0; r < all_imgs.length; r += 1) {
			let current_img_src = all_imgs.eq(r).attr("src");
			if (current_img_src.split(/(I|G)\//g)[2].indexOf("/") !== -1) continue;

			current_img_src = current_img_src.replace(
				/(.+)\.(_\w+_)\.(jpg|png|jpeg)$/i,
				"$1._UL1500_.$3"
			);

			main_img_src = main_img_src.concat(current_img_src);
		}
	} catch (e) {}

	var substring = "icon";

	for (var i = main_img_src.length - 1; i >= 0; i--) {
		if (main_img_src[i].includes(substring)) {
			main_img_src.splice(i, 1);
			// break;       //<-- Uncomment  if only the first term has to be removed
		}
	}

	console.log(
		"Images",
		main_img_src.filter((a, b) => main_img_src.indexOf(a) === b)
	);
	return main_img_src.filter((a, b) => main_img_src.indexOf(a) === b);
}

function getTableSpecifics() {
	var tableSpecifics = [];

	try {
		var productDetailsElement = document.querySelectorAll("div#prodDetails")[0];

		//Left hand table
		var productTable = productDetailsElement.querySelectorAll("div.pdTab")[0];
		var productTableTrElements = productTable.getElementsByTagName("tr");

		for (i = 0; i < productTableTrElements.length; i++) {
			var trElement = productTableTrElements[i];
			var trLabelElement = trElement.querySelectorAll("td.label")[0];
			var trValueElement = trElement.querySelectorAll("td.value")[0];

			if (
				typeof trLabelElement != "undefined" &&
				trLabelElement != null &&
				typeof trValueElement != "undefined" &&
				trValueElement != null
			) {
				//console.log(trLabelElement);

				var tdLabel = trLabelElement.innerText;
				var tdValue = trValueElement.innerText;

				if (
					!tdLabel.toLowerCase().includes("asin") &&
					!tdLabel.toLowerCase().includes("amazon") &&
					!tdLabel.toLowerCase().includes("warranty") &&
					!tdLabel.toLowerCase().includes("date") &&
					!tdLabel.toLowerCase().includes("review") &&
					!tdLabel.toLowerCase().includes("rank")
				) {
					var itemSpecific = {
						label: tdLabel,
						value: tdValue,
					};

					tableSpecifics.push(itemSpecific);
				}
			}
		}
	} catch (error) {}

	return tableSpecifics;
}

function getModelPartNumberList() {
	var mpnList = [];

	var tableSpecifics = [];

	try {
		tableSpecifics = getTableSpecifics();
	} catch (error) {
		console.log(error);
	}

	if (tableSpecifics.length > 0) {
		for (i = 0; i < tableSpecifics.length; i++) {
			var label = tableSpecifics[i].label.toLowerCase();

			if (
				label.includes("item-model-number") ||
				label.includes("model-number") ||
				label.includes("model") ||
				label.includes("part number") ||
				label.includes("mpn") ||
				label.includes("item model number") ||
				label.includes("model-number")
			) {
				mpnList.push(tableSpecifics[i].value);
			}
		}
	}

	return mpnList;
}

function getHighResProductPictures() {
	var hiResImgs = [];

	var imgBlock = document.getElementById("imageBlock_feature_div");
	var javascriptBlock = imgBlock.getElementsByTagName("script")[1];

	var jsFunction = javascriptBlock.innerText;

	jsFunction = jsFunction.replace(/[^]*(?=var data)/g, "");
	jsFunction = jsFunction.replace(
		"A.trigger('P.AboveTheFold'); // trigger ATF event.",
		""
	);
	jsFunction = jsFunction.replace(/(?<=return data;)[^]*/g, "");
	jsFunction = jsFunction.replace(/'airyConfig.*/g, "");

	var func = new Function(jsFunction);
	var data = func();

	var imageArray = data.colorImages.initial;

	for (var i = 0; i < imageArray.length; i++) {
		var hiResImg = imageArray[i].hiRes;
		console.log(i + "#  hiResImg: " + hiResImg);
		console.log(i + "#  type: " + typeof hiResImg);

		if (
			hiResImgs !== null &&
			hiResImgs !== "" &&
			hiResImgs !== "null" &&
			typeof hiResImg === "string"
		) {
			hiResImgs.push(hiResImg);
		}
		//hiResImgs.push(hiResImg);
	}

	return hiResImgs;
}
