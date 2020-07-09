//veroListNew
//veroListPersonal
//veroListOld

var amazonBrandToCheck = getProductBrand();
amazonBrandToCheck = amazonBrandToCheck.toLowerCase();
var veroBrandDetectedList = [];


scanForVero();



async function scanForVero() {
	await checkVeroBrandWithList(veroListOld);
	await checkVeroBrandWithList(veroListNew);
    await checkVeroBrandWithList(veroListPersonal);
    await checkVeroBrandWithList(veroListEbay);

   try {
    await isBrandVero();
   } catch (error) {
       
   }

}

function isBrandVero() {
	return new Promise((resolve) => {
		if (veroBrandDetectedList.length > 0) 
		{

			console.log(veroBrandDetectedList);

			var veroBrandsMessage = "VeroBrands: \n\n"+veroBrandDetectedList.toString().replace(/,/g, "\n");



			var veroUrl =
				"https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Vero_Insurance_logo.svg/1280px-Vero_Insurance_logo.svg.png";

			var img = document.createElement("img");
			img.src = veroUrl;
			img.width = "140";
			img.height = "60";
			img.title = veroBrandsMessage;

			var src = document.getElementById("bylineInfo");
			src.appendChild(img);
			resolve();
		} else {
			var safeUrl =
				"https://cdn1.iconfinder.com/data/icons/color-bold-style/21/30-512.png";

			var img = document.createElement("img");
			img.src = safeUrl;
			img.width = "50";
			img.height = "30";

			var src = document.getElementById("bylineInfo");
			src.appendChild(img);
			resolve();
		}
	});
}

function checkVeroBrandWithList(list) 
{
	return new Promise((resolve) => {
		for (var index = 0; index < list.length; ++index) {
			var veroBrand = list[index].toLowerCase();

			if (veroBrand.includes(amazonBrandToCheck)) {
				//push to array
				veroBrandDetectedList.push(veroBrand);

				/*
				console.log("Vero Detected");
				console.log(veroBrand);
				console.log(amazonBrandToCheck);
				console.log("index: " + index);
				*/
			}

            if (amazonBrandToCheck.includes(veroBrand)) 
            {
				//push to array
				veroBrandDetectedList.push(veroBrand);
				/*
				console.log("Vero Detected");
				console.log(veroBrand);
				console.log(amazonBrandToCheck);
				console.log("index: " + index);
				*/
            }
            
          
            var veroBrandWithOutWhiteSpace = veroBrand.replace(/\s/g, "");
        
			if (veroBrandWithOutWhiteSpace.includes(amazonBrandToCheck)) 
			{
				//push to array
				veroBrandDetectedList.push(veroBrand);

				/*
				console.log("Vero Detected");
				console.log(veroBrand);
				console.log(amazonBrandToCheck);
				console.log("index: " + index);
				*/
			}



			resolve();
		}
	});
}
