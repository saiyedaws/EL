//var WATERMARK_URL = 'https://i.imgur.com/WBVigQQ.png';
//uploadEditedImage("https://images-na.ssl-images-amazon.com/images/I/81ZYJnoD%2BmL._AC_SL1500_.jpg","yeeeeee", "https://i.imgur.com/g7AUaYP.png");
//uploadEditedImage("https://images-na.ssl-images-amazon.com/images/I/71xkwNx-nfL._AC_SL1500_.jpg","yeeeeee", "https://i.imgur.com/g7AUaYP.png");
//uploadEditedImage("https://m.media-amazon.com/images/S/aplus-media/sc/e9f979b3-7a2b-4a1a-a5ea-c601f75a2326.__CR0,0,970,600_PT0_SX970_V1___.jpg","yeeeeee", "https://i.imgur.com/g7AUaYP.png");

//var WATERMARK_URL = 'https://i.imgur.com/WBVigQQ.png';
uploadEditedImage("https://images-na.ssl-images-amazon.com/images/I/81ZYJnoD%2BmL._AC_SL1500_.jpg","yeeeeedddddddddddddddddddddddddddddddddddddddddddddddde", "https://previews.123rf.com/images/miceking/miceking1611/miceking161100356/68354091-canada-map-with-canadian-flag.jpg");
//uploadEditedImage("https://images-na.ssl-images-amazon.com/images/I/71xkwNx-nfL._AC_SL1500_.jpg","yeeeeee", "https://previews.123rf.com/images/miceking/miceking1611/miceking161100356/68354091-canada-map-with-canadian-flag.jpg");
//uploadEditedImage("https://m.media-amazon.com/images/S/aplus-media/sc/e9f979b3-7a2b-4a1a-a5ea-c601f75a2326.__CR0,0,970,600_PT0_SX970_V1___.jpg","yeeeeee", "https://previews.123rf.com/images/miceking/miceking1611/miceking161100356/68354091-canada-map-with-canadian-flag.jpg");

async function uploadEditedImage(imageSource, imageTitle, WATERMARK_URL) 
{
  var imgHeight = 1500;
  var imgWidth = 1500;
  
  var img = await base64ToImage(imageSource);   
  img = await flipImage(img);
  img = await rotateImage(img, 5);
  img = await resizeImage(img, imgWidth, imgHeight);
  
  var imgWatermark = await urlToImage(WATERMARK_URL);
  imgWatermark = await resizeImage(imgWatermark, imgHeight*0.4, imgWidth*0.4);
  img = await addLogo(img, imgWatermark, 0.5);


addImgToDom(img.src);




img = await addTextToImage(img, imageTitle)

  //upload(img.src, imageTitle, ebayTab);




//addImgToDom(img.src);
  
  
}

function addImgToDom(imgSrc)
{
    
    
var DOM_img = document.createElement("img");
DOM_img.src = imgSrc;
var src = document.getElementsByTagName("html")[0];
src.appendChild(DOM_img);
}



function uploadImgToEbay(payload) {
	console.log("uploadImageBase64ToEbay");
	console.log(payload);

	var base64Img = payload.base64Img;

	chrome.storage.local.get("ebayTab", (res) => {
		if (payload.imgVariation === "first_image") {
      //uploadMainEditedBase64Image(payload.base64Img, payload.name, res.ebayTab);
      uploadEditedImage(payload.base64Img, payload.name, res.ebayTab);
		}

		if (payload.imgVariation === "other_image") {
			uploadNormalImage(payload.base64Img, payload.name, res.ebayTab);
		}
	});


}



async function uploadNormalImage(imageSource, imageTitle, ebayTab) 
{

  var imgHeight = 1500;
  var imgWidth = 1500;
  
  var img = await base64ToImage(imageSource);   
  img = await flipImage(img);
  img = await rotateImage(img, 5);

  img = await resizeImage(img, imgWidth, imgHeight);
  
  var imgWatermark = await urlToImage(WATERMARK_URL);
  imgWatermark = await resizeImage(imgWatermark, imgHeight*0.4, imgWidth*0.4);
  img = await addLogo(img, imgWatermark, 0.5);
 

  //upload(img.src, imageTitle, ebayTab);

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


function addTextToImage(img, text)
{

    return new Promise(function (resolve, reject) 
    {
			var canvas = document.createElement("canvas");
            canvas.id = "myCanvas";

            var extraHeight = img.height/10;
            
			canvas.width = img.width
            canvas.height = img.height + extraHeight;
            
            var fontSize = extraHeight*0.75


            var ctx = canvas.getContext("2d");
            
            ctx.fillStyle = "orange";
			ctx.font = fontSize+"px Comic Sans MS";
            ctx.fillText(text, 0, fontSize);
            


			ctx.drawImage(
                img,
				0,
				extraHeight
                
			);

			let img2 = new Image();
			img2.crossOrigin = "anonymous";
			img2.src = canvas.toDataURL();

			img2.onload = function () {
				resolve(img2);
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
			canvas.style = "border:2px solid black;";

			var ctx = canvas.getContext("2d");




           //Center is to place image in middle
			var centerX = x / 2;
			var centerY = y / 2;
            
			var ratio = 1;

            if (img.width > img.height) 
            {
                ratio = x / img.width;
                
            } 
            
            if (img.width < img.height) 
            {
				ratio = x / img.height;
            } 

            if (img.width === img.height) 
            {
				ratio = x / img.height;
            } 


            var newWidth = img.width * ratio;
			var newHeight = img.height * ratio;


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

function addLogo(img, imgWatermark, opacity) 
{
    return new Promise(function (resolve, reject) 
    {

			let canvas = document.createElement("canvas");
			canvas.width = img.width + imgWatermark.width;
			canvas.height = img.height;

			let ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            
            ctx.globalAlpha = opacity;
            
			ctx.drawImage(
                imgWatermark, 
                canvas.width - imgWatermark.width, 
                0
                );

			var imgFinal = new Image();

			imgFinal.onload = function () {
				resolve(imgFinal);
			};
			imgFinal.src = canvas.toDataURL();
		});
	
}


function rotateImage(img, angle)
{
    return new Promise(function (resolve, reject) 
    {

            var canvas = document.createElement("canvas");
            
            var ctx = canvas.getContext("2d");

            var rads=angle*Math.PI/180;
            var cos = Math.cos(rads);
            var sin = Math.sin(rads);
            if (sin < 0) { sin = -sin; }
            if (cos < 0) { cos = -cos; }

            canvas.width = img.height * sin + img.width * cos;
            canvas.height = img.height * cos + img.width * sin ;

            var imgWidth = img.width;
            var imgHeight = img.height;



            // calculate the centerpoint of the canvas
            var cx=canvas.width/2;
            var cy=canvas.height/2;


            // draw the rect in the center of the newly sized canvas
           // ctx.clearRect(0,0,canvas.width,canvas.height);
          //  ctx.fillStyle="rgba(216,216,150,1.0)";

          var deg2Rad=Math.PI/180;

            ctx.translate(cx,cy);
            ctx.rotate(angle * deg2Rad);

            ctx.drawImage(img,-imgWidth/2,-imgHeight/2,imgWidth,imgHeight);


            var imgFinal = new Image();

			imgFinal.onload = function () {
				resolve(imgFinal);
			};
			imgFinal.src = canvas.toDataURL();
            
            
		
            
        

		});

}
