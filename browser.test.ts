import {test} from "@playwright/test";

test("test browser" , async ({page}) =>{
    //await page.goto("http://localhost:5173")
    await page.goto("https://browserbench.org/Speedometer3.0/")
    await page.pause()
})