if (window.location.href.indexOf("/dp/") > -1) 
{
	let _e = (ID) => document.getElementById(ID), // It is just a shortcut
		bg_port = chrome.runtime.connect({ name: "amazon" }); // Establishment a connection with the background

	// 1. Create the button
	var button = document.createElement("button");
	button.innerHTML = "List To ebay";
	button.id = "list";

	document.body.prepend(button);

	// 3. Add event handler
	button.addEventListener("click", function () {
		// Send a message to the background with new values

		var title = $("#the-textarea").val();
		var price = getAmazonPrice() * 1.15;

		bg_port.postMessage({
			from: "amazon",
			type: "create_ebay_tab",
			title: title,
			price: price,
		});
	});

	var span2 = document.createElement("span");
	span2.className = "counted";
	span2.id = "maximum";
	span2.text = "/ 80";

	document.body.prepend(span2);

	var span1 = document.createElement("span");
	span1.className = "counted";
	span1.id = "current";
	span1.text = "0";

	document.body.prepend(span1);

	var textArea = document.createElement("textarea");
	textArea.id = "the-textarea";
	textArea.cols = "20";
	textArea.rows = "3";
	textArea.value = getFilteredTitle();

	var div = document.createElement("div");
	div.id = "divDroppedFields";
	div.appendChild(textArea);

	document.body.prepend(div);
	//this isnt working
	updateCharacterCount();

	$("textarea").keyup(function () {
		updateCharacterCount();
	});

	function updateCharacterCount() {
		var characterCount = $("#the-textarea").val().length,
			current = $("#current"),
			maximum = $("#maximum"),
			theCount = $("#the-count");

		current.text(characterCount);
		maximum.text("/ 80");
	}

	$(document).ready(initialize);

	function initialize() {
		/****Adding the drag and drop Event handler*****/
		$("mark").draggable({
			helper: "clone",
		});

		$("#divDroppedFields").droppable({
			accept: "mark",
			drop: function (event, ui) {
				var messageValue = $("#the-textarea").val();

				var dragText = ui.draggable.text();
				// dragText = "<mark>" + dragText + "</mark>";

				messageValue = messageValue + " " + dragText + "";
				$(this).find("#the-textarea").val(messageValue);
				updateCharacterCount();
			},
		});
	}

	//addTagsToWords("#productTitle");
	//addTagsToWords(".a-list-item");
	//addTagsToWords("#descriptionAndDetails");

	function addTagsToWords(querySelectorAll) {
		var elements = document.querySelectorAll(querySelectorAll);

		for (let index = 0; index < elements.length; index++) {
			var element = elements[index];
			var words = element.innerText.split(" ");
			var stringWithTag = "";

			for (let index = 0; index < words.length; index++) {
				var word = words[index];
				word = "<mark>" + word + "</mark>";
				stringWithTag += " " + word;
				console.log(stringWithTag);
			}

			console.log(stringWithTag);
			element.innerHTML = stringWithTag;
		}
	}

	function getSelectedText() {
		t = document.all
			? document.selection.createRange().text
			: document.getSelection();

		return t;
	}

	//deleteHighlightedText();

	function deleteHighlightedText() {
		$("body").mouseup(function () {
			var selection = getSelectedText();
			var selection_text = selection.toString();

			var selectionClass = t.anchorNode;
			console.log(selectionClass);

			if (selectionClass.querySelector("#the-textarea") != null) {
				console.log("yee");
				console.log(selection_text);

				var title = $("#the-textarea").val();
				console.log(title);

				title = title.replace(selection_text, "");

				$(document).find("#the-textarea").val(title);

				updateCharacterCount();
			}
		});
	}
}
