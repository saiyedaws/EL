function convertImgToBase64(url, callback, outputFormat) {
	var canvas = document.createElement("CANVAS");
	var ctx = canvas.getContext("2d");
	var img = new Image();
	img.crossOrigin = "Anonymous";
	img.onload = function () {
		canvas.height = img.height;
		canvas.width = img.width;
		ctx.drawImage(img, 0, 0);
		var dataURL = canvas.toDataURL(outputFormat || "image/png");
		callback.call(this, dataURL);
		// Clean up
		canvas = null;
	};
	img.src = url;
}




function uploadImages(product) 
{
	//var imgUrls = product.main_sd_images;
	var sdImgs = product.main_sd_images;
	var hdImgs = product.main_hd_images;


	var imgUrls = [];
	imgUrls = hdImgs;

	if(imgUrls.length < 1)
	{
		imgUrls = sdImgs;
	}


	if(imgUrls.length < 12)
	{
		var totalImagesToAdd = 12 - imgUrls.length;

		for (var index = 0; index < sdImgs.length; index++) 
		{
			var sdImg = sdImgs[index];

			if(index<totalImagesToAdd && totalImagesToAdd > 0)
			{
				imgUrls.push(sdImg);
			}
		}

	}


	var imgName = product.custom_title;
	//var imgName = product.filteredTitle;
	console.log("Starting image Post");

	imgName = insensitiveReplaceAll(imgName, product.brand, "");
	imgName = insensitiveReplaceAll(imgName, "amazon", "");



	if (imgUrls.length > 1) 
	{

		bg_port.postMessage({
			from: "ebay",
			type: "upload_img",
			payload: {
				name: imgName,
				imgUrl: {
					mainImage: imgUrls[0],
					sideImage: imgUrls[1],
				},

				imgVariation: "multi_image",
			},
		});
	}


setTimeout(() => 
{
	bg_port.postMessage({
		from: "ebay",
		type: "upload_img",
		payload: {
			name: imgName,
			imgUrl: imgUrls[0],
			imgVariation: "first_image",
		},
	});

	for (var i = 0; i < imgUrls.length; i++) 
	{
		var imgUrl = imgUrls[i];

		console.log(imgUrl);

		if(i < 10)
		{
			bg_port.postMessage({
				from: "ebay",
				type: "upload_img",
				payload: {
					name: imgName,
					imgUrl: imgUrl,
					imgVariation: "other_image",
				},
			});
		}

		//Do something
	}
}, 6000);

	
}
