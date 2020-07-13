function getItemSpecifics() 
{
	var itemSpecifics = [];



	//First Check
	var table = document.querySelectorAll("#detail_bullets_id .content li");

	for (var index = 0; index < table.length; index++) 
	{
		var labelElement = table[index].getElementsByTagName("b")[0];

		if (labelElement) 
		{
			var label = labelElement.innerText.toLowerCase();
			var value = labelElement.nextSibling.textContent;
			value = value.replace(/\n  /g, "").trim();


			var itemSpecific = 
			{
				label:label,
				value:value
			}
	
			itemSpecifics.push(itemSpecific);
	

		}
	}

	var productTableTrElements = document.querySelectorAll(
		"div#prodDetails tr"
	);

	for (i = 0; i < productTableTrElements.length; i++) 
	{
		var trLabelElement;
		var trValueElement

		trLabelElement = productTableTrElements[i].querySelectorAll(
			"td.label"
		)[0];
		trValueElement = productTableTrElements[i].querySelectorAll(
			"td.value"
		)[0];

		if(!trLabelElement)
		{
			trLabelElement = productTableTrElements[i].querySelectorAll(
				"tr th"
			)[0];

			trValueElement = productTableTrElements[i].querySelectorAll(
				"tr td"
			)[0];

		}

		if (trLabelElement) 
		{

			var label = trLabelElement.innerText.toLowerCase();
			var value = trValueElement.innerText.toLowerCase();
			value = value.replace(/\n  /g, "").trim();
			
	
	
			var itemSpecific = 
			{
				label:label,
				value:value
			}
	
			itemSpecifics.push(itemSpecific);
	
		}

	}


	var variationElement = document.querySelectorAll('[id^="variation_"]')[0];
	if(variationElement)
	{
		var label = variationElement.querySelectorAll(".a-form-label")[0].innerText.trim().replace(":","");
		var value = variationElement.querySelectorAll(".selection")[0].innerText.trim().replace(":","");

		console.log(label);
		console.log(value);

		var itemSpecific = 
		{
			label:label,
			value:value
		}

		itemSpecifics.push(itemSpecific);
	}


	return itemSpecifics;
}




function filterItemSpecifics()
{

	var itemSpecifics = getItemSpecifics();

	for (var i = itemSpecifics.length - 1; i >= 0; i--) 
	{
		var itemSpecific = itemSpecifics[i];
		var label = itemSpecific.label.toLowerCase();



		if(
			label.includes("model")||
			label.includes("amazon")||
			label.includes("asin")||
			label.includes("customer")||
			label.includes("date")||
			label.includes("rank")||
			label.includes("brand")||
			label.includes("mpn")||
			label.includes("item-model-number") ||
			label.includes("model-number") ||
			label.includes("model") ||
			label.includes("part number") ||
			label.includes("mpn") ||
			label.includes("item model number") ||
			label.includes("model-number")||

			//add more
			label.includes("manufacture")||
			label.includes("model")||
			label.includes("model")||
			label.includes("model")||
			label.includes("model")||
			label.includes("model")||
			label.includes("model")||
			label.includes("model")
			
		)
		{
			console.log("Bad label: "+label);
		

			itemSpecifics.splice(i, 1);
		}


		
	}


	return itemSpecifics;

}