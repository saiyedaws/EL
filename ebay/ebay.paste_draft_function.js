
function pasteDraftTitle() 
{
    chrome.storage.local.get(["amazon"], async function (result) 
    {
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


