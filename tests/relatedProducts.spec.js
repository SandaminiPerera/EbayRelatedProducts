const { test, expect, chromium} = require('@playwright/test');
const assert = require('assert');

  
test('Verify related products are displayed.', async ({  }) => {

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    //Navigate to ebay.com
    await page.goto('https://www.ebay.com/');

    //Search for the main product
    await page.fill('id=gh-ac','Wallet');
    await page.click('id=gh-btn')
 
   
    //Navigate to main product page
    const [newPage] = await Promise.all([
        context.waitForEvent('page'), // Wait for a new tab to open
        await page.click("li[id='item1d3909df46'] div[class='s-item__info clearfix'] a"), // Action that triggers the new tab
      
    ]);

    await newPage.waitForLoadState();
    console.log('Title of the main product page is '+ await newPage.title());

    //newPage.waitForSelector('.TaQa._4QSx div[class="oPPW"]')
    const relatedProducts = await newPage.locator('.TaQa._4QSx div[class="oPPW"]')
  
    //get the count of related products display in the page
    const count = await relatedProducts.count();
    console.log('Related product count is '+ count)  
    
    //Verify 4 rleated products display for the main product(in ebay only 4 rletaed products display by default)
    await expect(relatedProducts).toHaveCount(4);

  
});


test('Validate related products are from the same category.', async ({  }) => {

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    
    //Navigate to ebay.com
    await page.goto('https://www.ebay.com/');

    //Search for the main product
    await page.fill('id=gh-ac','Wallet');
    await page.click('id=gh-btn')
   
    //Navigate to main product page
    const [newPage] = await Promise.all([
        context.waitForEvent('page'), // Wait for a new tab to open
        await page.click("li[id='item1d3909df46'] div[class='s-item__info clearfix'] a"), // Action that triggers the new tab
      
    ]);

    await newPage.waitForLoadState();
    console.log('Title of the main product page is '+ await newPage.title());

    //Read the category of main product
    const mainProductCategory = await newPage.textContent("//span[normalize-space()='Wallets']");
    console.log('Category of the main product is '+ mainProductCategory);

    //Navigate to related product page
    const [newPage2] = await Promise.all([
        context.waitForEvent('page'), // Wait for a new tab to open
        await newPage.click("body > div:nth-child(4) > main:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > a:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > h3:nth-child(1)"), // Action that triggers the new tab
      
    ]);

    await newPage2.waitForLoadState();
    console.log('Title of the related product page is '+ await newPage2.title());

    //Read the category of related product
    const relatedProductCategory = await newPage2.textContent("//span[normalize-space()='Wallets']");
    console.log('Category of the related product is '+ relatedProductCategory);

    //validate the category of both main and related products are equal
    assert.strictEqual(mainProductCategory.trim(),relatedProductCategory.trim())

    
});


test('Validate best-seller status.', async ({  }) => {

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
        
    //Navigate to ebay.com
    await page.goto('https://www.ebay.com/');
    
    //Search for the main product
    await page.fill('id=gh-ac','Wallet');
    await page.click('id=gh-btn')
    
    //Navigate to main product page
    const [newPage] = await Promise.all([
        context.waitForEvent('page'), // Wait for a new tab to open
        await page.click("li[id='item1d3909df46'] div[class='s-item__info clearfix'] a"), // Action that triggers the new tab
        
    ]);
    
    await newPage.waitForLoadState();
    console.log('Title of the main product page is '+ await newPage.title());
    
    //Navigate to related product page
    const [newPage2] = await Promise.all([
        context.waitForEvent('page'), // Wait for a new tab to open
        await newPage.click("body > div:nth-child(4) > main:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > a:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > h3:nth-child(1)"), // Action that triggers the new tab
        
    ]);
    
    await newPage2.waitForLoadState();
    console.log('Title of the related product page is '+ await newPage2.title());

    //read the sold count of related product
    const soldCount = await newPage2.textContent("div[class='vim x-quantity mar-t-16'] span:nth-child(2)")
    const match = soldCount.match(/\d[,.\d]*/);
          
    if (match) {
        const numericalValue = parseInt(match[0].replace(/,/g, ''), 10);
        console.log('Sold count of the related product is '+ numericalValue); 
        
        //Verify sold count to be atleast 5 to meet best seller criteria(according to the assumption)
        expect(numericalValue).toBeGreaterThanOrEqual(5);
  
    }
    

});


test('Verify price range of related products.', async ({  }) => {

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
        
    //Navigate to ebay.com
    await page.goto('https://www.ebay.com/');
    
    //Search for the main product
    await page.fill('id=gh-ac','Wallet');
    await page.click('id=gh-btn')
    
    //Navigate to main product page
    const [newPage] = await Promise.all([
        context.waitForEvent('page'), // Wait for a new tab to open
        await page.click("li[id='item1d3909df46'] div[class='s-item__info clearfix'] a"), // Action that triggers the new tab
        
    ]);
    
    await newPage.waitForLoadState();
    console.log('Title of the main product page is '+ await newPage.title());

    //Get the Price of main product
    const mainProductPriceTag = await newPage.textContent("span[class='x-price-approx__price'] span[class='ux-textspans ux-textspans--SECONDARY ux-textspans--BOLD']")
    const cleanText = mainProductPriceTag.replace(/,/g, '');
    const match = cleanText.match(/[\d.]+/);
    const mainProductPrice = parseFloat(match[0]);
    console.log('Price of main product is '+ mainProductPrice);
    
    //Navigate to related product page
    const [newPage2] = await Promise.all([
        context.waitForEvent('page'), // Wait for a new tab to open
        await newPage.click("body > div:nth-child(4) > main:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > a:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > h3:nth-child(1)"), // Action that triggers the new tab
        
    ]);
    
    await newPage2.waitForLoadState();
    console.log('Title of the related product page is '+ await newPage2.title());

    //Get the Price of related product
    const relatedProductPriceTag = await newPage2.textContent("span[class='x-price-approx__price'] span[class='ux-textspans ux-textspans--SECONDARY ux-textspans--BOLD']")
    const cleanText1 = relatedProductPriceTag.replace(/,/g, '');
    const match1 = cleanText1.match(/[\d.]+/);
    const relatedProductPrice = parseFloat(match1[0]);
    console.log('Price of the related product is '+ relatedProductPrice);

    //Verify that the related product is in the same price range of the main product
    console.log('Price difference of the products is '+ Math.abs(mainProductPrice - relatedProductPrice));
    expect(Math.abs(mainProductPrice - relatedProductPrice)).toBeLessThanOrEqual(10);
    
});


test('Verify displayed attributes of related products.', async ({  }) => {
    
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
        
    //Navigate to ebay.com
    await page.goto('https://www.ebay.com/');
    
    //Search for the main product
    await page.fill('id=gh-ac','Wallet');
    await page.click('id=gh-btn')
    
    //Navigate to main product page
    const [newPage] = await Promise.all([
        context.waitForEvent('page'), // Wait for a new tab to open
        await page.click("li[id='item1d3909df46'] div[class='s-item__info clearfix'] a"), // Action that triggers the new tab
        
    ]);
    
    await newPage.waitForLoadState();
    console.log('Title of the main product page is '+ await newPage.title());

    //Verify the avalability of product name
    const relatedProductName = await newPage.locator("body > div:nth-child(4) > main:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > a:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > h3:nth-child(1)")
    await expect(relatedProductName).toBeVisible();

    //Verify the avalability of product image
    const relatedProductImage = await newPage.locator("body > div:nth-child(4) > main:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > a:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) >img");
    await expect(relatedProductImage).toBeVisible();

    //Verify the avalability of product condition
    const relatedProductCondition = await newPage.locator("body > div:nth-child(4) > main:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > a:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > span:nth-child(1)");
    await expect(relatedProductCondition).toBeVisible();

    //Verify the avalability of product price
    const relatedProductPrice = await newPage.locator("body > div:nth-child(4) > main:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > a:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > span:nth-child(1)");
    await expect(relatedProductPrice).toBeVisible();
    

  });
  