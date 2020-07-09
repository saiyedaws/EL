//var WATERMARK_URL = 'https://i.imgur.com/WBVigQQ.png';
addToDom("https://images-na.ssl-images-amazon.com/images/I/81ZYJnoD%2BmL._AC_SL1500_.jpg","yeeeeee", "https://images-na.ssl-images-amazon.com/images/I/71xkwNx-nfL._AC_SL1500_.jpg");


async function addToDom(imageSource, imageTitle, WATERMARK_URL)
{

var img = await base64ToImage(imageSource);   
img = await flipImage(img);
img = await resizeImage(img, 500, 500);

var imgWatermark = 
img = await addLogo(img, WATERMARK_URL, 0.5);



var DOM_img = document.createElement("img");
DOM_img.src = img.src;
var src = document.getElementsByTagName("html")[0];
src.appendChild(DOM_img);
}

  

function upload(b64Image, imageTitle, ebayTab) 
{
  chrome.tabs.sendMessage(ebayTab, 
    {
		type: "ON_UPLOAD_BASE64_IMG",
		payload: {
			content: b64Image,
			name: imageTitle,
		},
  });
  
}

function base64ToImage(imageSource) 
{
	return new Promise(function (resolve, reject) {
		var img = new Image();
		img.src = imageSource;
		img.crossOrigin = "anonymous";

		//resolve(img);

		img.onload = function () {
			resolve(img);
		};
	});
}


function flipImage(img){
    return new Promise(function (resolve, reject) 
    {
			var canvas = document.createElement("canvas");
            canvas.id = "myCanvas";
            
			canvas.width = img.width
			canvas.height = img.height


			var ctx = canvas.getContext("2d");

	

			//Flip image
			ctx.translate(canvas.width, 0);
			ctx.scale(-1, 1);

			ctx.drawImage(
                img,
                0,
                0
                
			);

			let img2 = new Image();
			img2.crossOrigin = "anonymous";
			img2.src = canvas.toDataURL();

			img2.onload = function () {
				resolve(img2);
			};

			//var src = document.getElementsByTagName("html")[0];
			//src.appendChild(canvas);
			//console.log(img2.src);

	});
}

function resizeImage(img, x, y) {
    return new Promise(function (resolve, reject) 
    {
			var canvas = document.createElement("canvas");
            canvas.id = "myCanvas";
            


			canvas.width = x;
			canvas.height = y;
			

			var ctx = canvas.getContext("2d");



			//resizing image
			var centerX = x / 2;
			var centerY = y / 2;
			var newWidth = 0;
			var newHeight = 0;
			var ratio;

			if (img.width > img.height) {
				ratio = img.width / img.height;

				newWidth = x;
				newHeight = newWidth * ratio;
			} else {
				ratio = img.width / img.height;

				newHeight = y;
				newWidth = newHeight * ratio;
			}

			//Transparency
			ctx.globalAlpha = 0.9;


			//Rotate
			ctx.rotate((1 * Math.PI) / 180);

			ctx.drawImage(
				img,
				centerX - newWidth / 2,
				centerY - newHeight / 2,
				newWidth,
				newHeight
			);

			let img2 = new Image();
			img2.crossOrigin = "anonymous";
			img2.src = canvas.toDataURL();

			img2.onload = function () {
				resolve(img2);
			};

			//var src = document.getElementsByTagName("html")[0];
			//src.appendChild(canvas);
			//console.log(img2.src);

	});
}

function urlToImage(imageUrl) {
	return new Promise(function (resolve, reject) {
		let xhr = new XMLHttpRequest();
		xhr.open("GET", "https://cors-anywhere.herokuapp.com/" + imageUrl, true);
		xhr.responseType = "arraybuffer";
		xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
		xhr.onload = function (e) {
			if (this.status === 200) {
				var uInt8Array = new Uint8Array(this.response);

				var blob = new Blob([uInt8Array], { type: "image/jpeg" });

				var reader = new FileReader();

				reader.onloadend = function () {
					let img = new Image();

					img.onload = function (e) {
						resolve(img);
					};

					let base64data = this.result;

					img.src = base64data;
				};

				reader.readAsDataURL(blob);

				let imageUrl = URL.createObjectURL(blob);
			}
		};
		xhr.send();
	});
}

function addLogo(img, logoUrl, opacity) 
{
	return new Promise(function (resolve, reject) {
        urlToImage(logoUrl).then(function (imgWatermark) 
        {
			let can = document.createElement("canvas");
			can.width = img.width+200;
			can.height = img.height;

			let con = can.getContext("2d");
			con.drawImage(img, 0, 0);
			con.globalAlpha = opacity;
			con.drawImage(
                imgWatermark, 
                img.width-200, 
                0
                );

			var imgFinal = new Image();

			imgFinal.onload = function () {
				resolve(imgFinal);
			};
			imgFinal.src = can.toDataURL();
		});
	});
}
