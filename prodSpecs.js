function findSpecific(itemSpecific) 
{
	var itemSpecificValue;

	//First Check
	var table = document.querySelectorAll("#detail_bullets_id .content li");

	for (var index = 0; index < table.length; index++) {
		var labelElement = table[index].getElementsByTagName("b")[0];

		if (labelElement) {
			var label = labelElement.innerText.toLowerCase();

			var value = labelElement.nextSibling.textContent;
			value = value.replace(/\n  /g, "").trim();

			if (label.includes(itemSpecific)) {
				itemSpecificValue = value;
				break;
			}
		}
	}

	var productTableTrElements = document.querySelectorAll(
		"div#prodDetails div.pdTab tr"
	);

	for (i = 0; i < productTableTrElements.length; i++) {
		var trLabelElement = productTableTrElements[i].querySelectorAll(
			"td.label"
		)[0];
		var trValueElement = productTableTrElements[i].querySelectorAll(
			"td.value"
		)[0];

		if (trLabelElement) {
			if (trLabelElement.innerText.toLowerCase().includes(itemSpecific)) {
				itemSpecificValue = trValueElement.innerText;
				break;
			}
		}
	}

	return itemSpecificValue;
}

function getDimensions() {
	var productDimensionsObject;

	var productDimensions = findSpecific("product dimensions");

	if (productDimensions) {
		var regex = /^(?:[\(])?(\d*\.?\d+)\s*x\s*(\d*\.?\d+)\s*x\s*(\d*\.?\d+)\s*((?:cms?|in|inch|inches|mms?)\b|(?:[\"]))/g;
		productDimensions = productDimensions.match(regex);

		var dimensions = productDimensions.toString().split("x");
		var dimensionRegex = /[1-9]\d*(\.\d+)?/g;

		var length = dimensions[0].trim().match(dimensionRegex)[0];
		var widith = dimensions[1].trim().match(dimensionRegex)[0];
		var height = dimensions[2].trim().match(dimensionRegex)[0];

		var unit = "cm";

		if (productDimensions.includes("mm")) {
			unit = "mm";
		}

		if (productDimensions.includes("cm")) {
			unit = "cm";
		}

		if (productDimensions.includes("in")) {
			unit = "cm";
		}

		var productDimensionsObject = {
			length: length,
			widith: widith,
			height: height,
			unit: unit,
		};
	}

	return productDimensionsObject;
}

function getShippingWeight() {
	var shippingWeight = findSpecific("shipping weight");

	var regex = /(\d*\.?\d+)\s?(\w+)/g;
	shippingWeight = shippingWeight.match(regex)[0];

	var decimalRegex = /[0-9]+(\.[0-9][0-9]?)?/g;
	var unit = shippingWeight.replace(decimalRegex, "").trim().toLowerCase();
	var shippingWeightValue = shippingWeight.match(decimalRegex)[0];

	return {
		shippingWeight: shippingWeightValue,
		unit: unit,
	};
}

var dimensions = getDimensions();
var shippingWeight = getShippingWeight();

console.log(dimensions);
console.log(shippingWeight);
