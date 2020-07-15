function pasteDraftTitle() 
{


		let messageObject = {
			fpCmd: "titleSelected",
			suggestedCategories: [],
			title: "result..title",
		};
		setTimeout(function () {
			window.postMessage(JSON.stringify(messageObject));
		}, 200);

}

pasteDraftTitle();