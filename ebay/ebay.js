bg_port = chrome.runtime.connect({ name: "ebay" }); // Establishment a connection with the background

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => 
{
    // It needs to wait for message from background to be sure that it is automated visit
    // Page receives requests immediately when it loads
    // When it received request with type 'start_inserting', it need to run processing
    if(request.type === 'start_inserting') 
    {

        pasteDraftTitle();

    }





  


    





});





// After title had pasted, page is reloading (it loads draft page)
// So it checks URL to check is reloaded page or not
if(window.location.href.includes("DraftURL")) 
{
    // When we sure page is loaded, it gets product from the storage and pastes details in form
    chrome.storage.local.get('amazon', function(result) 
    {
        let product = result.amazon;

        console.log(product);

        pasteTitle(product);
        pastePrice(product);
        pickItemCondition();
        pasteUpc(product);
        pasteTitle(product);
        pasteAsin(product);
        pasteDescription(product);

        //Paste brand showing original Brand
        pasteBrand(product);
        //pasteNAToRequiredItemSpecifics();
        
        pasteItemSpecifics(product);

        pasteFilteredItemSpecifics(product);
        
        //pasteShippingWeight(product);



        setTimeout(() => 
        {

            uploadImages(product);
            pasteBrand(product);
            pasteShippingWeight(product);
            pasteDimensions(product);
           // pasteNAToRequiredItemSpecifics()

           pasteNAToRequiredItemSpecifics();
        }, 6000);
        


    });

}