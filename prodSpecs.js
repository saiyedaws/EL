function pasteItemSpecific(label, value)
{


	return new Promise(resolve =>
	{
		try {
		
			var addItemSpecificElement;

			var xpath = "//a[text()=' + Add custom item specific']";
			addItemSpecificElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			addItemSpecificElement.click();
	
			document.querySelectorAll("#v4-26")[0].click();
		
			document.querySelectorAll("#_isTag")[0].value = label;
			document.querySelectorAll("#_isVal")[0].value = value;
		
			if ($("#_errTag").is(":visible")){
				$("a[id$=cancle]")[0].click();
				resolve();
			}
			else{
				$("#_isSave")[0].click();
				resolve();
			}
				
	
		} catch (e) 
		{
			console.log(e);
			$("a[id$=cancle]")[0].click();
			resolve();
	
		}


	});

	


}


pasteItemSpecific("item weight", "60 g");