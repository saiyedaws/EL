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

function resizeImage(imageSource, imageTitle) 
{
	return new Promise(function (resolve, reject) {
        base64ToImage(imageSource).then(function (img) 
        {
			var canvas = document.createElement("canvas");
			canvas.id = "myCanvas";

			canvas.width = 500;
			canvas.height = 550;
			canvas.style = "border:2px solid black;";

			var ctx = canvas.getContext("2d");

			ctx.fillStyle = "orange";
			ctx.font = "20px Comic Sans MS";
			ctx.fillText(imageTitle, 0, 30);

			//resizing image
			var centerX = 500 / 2;
			var centerY = 500 / 2 + 50;
			var newWidth = 0;
			var newHeight = 0;
			var ratio;

			if (img.width > img.height) {
				ratio = img.width / img.height;

				newWidth = 500;
				newHeight = newWidth * ratio;
			} else {
				ratio = img.width / img.height;

				newHeight = 500;
				newWidth = newHeight * ratio;
            }
            


			//Transparency
            ctx.globalAlpha = 0.9;
            


            //Flip image
            ctx.translate(canvas.width, 0);
            ctx.scale(-1, 1);


            //Rotate
            ctx.rotate(1 * Math.PI / 180);


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
            

            var src = document.getElementsByTagName("html")[0];
            src.appendChild(canvas);
    
            console.log(img2.src);

		});
	});
}

resizeImage("https://images-na.ssl-images-amazon.com/images/I/81ouUI0O-1L._AC_SL1500_.jpg","Innova Heavy Duty Inversion Table");
resizeImage("https://images-na.ssl-images-amazon.com/images/I/81gfgJV01eL._AC_SL1500_.jpg","Fujifilm Instax Mini 11 Instant Camera - Sky Blue");