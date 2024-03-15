# TypeScript PuppeteerCrawler Actor template

This template is a production ready boilerplate for developing with `PuppeteerCrawler`. The `PuppeteerCrawler` provides a simple framework for parallel crawling of web pages using headless Chrome with Puppeteer. Since `PuppeteerCrawler` uses headless Chrome to download web pages and extract data, it is useful for crawling of websites that require to execute JavaScript.

If you're looking for examples or want to learn more visit:

- [Crawlee + Apify Platform guide](https://crawlee.dev/docs/guides/apify-platform)
- [Examples](https://crawlee.dev/docs/examples/puppeteer-crawler)

## Included features

- **[Puppeteer Crawler](https://crawlee.dev/api/puppeteer-crawler/class/PuppeteerCrawler)** - simple framework for parallel crawling of web pages using headless Chrome with Puppeteer
- **[Configurable Proxy](https://crawlee.dev/docs/guides/proxy-management#proxy-configuration)** - tool for working around IP blocking
- **[Input schema](https://docs.apify.com/platform/actors/development/input-schema)** - define and easily validate a schema for your Actor's input
- **[Dataset](https://docs.apify.com/sdk/js/docs/guides/result-storage#dataset)** - store structured data where each object stored has the same attributes
- **[Apify SDK](https://docs.apify.com/api/client/js/)** - toolkit for building Actors

## How it works

1. `Actor.getInput()` gets the input from `INPUT.json` where the start urls are defined
2.  Create a configuration for proxy servers to be used during the crawling with `Actor.createProxyConfiguration()` to work around IP blocking. Use Apify Proxy or your own Proxy URLs provided and rotated according to the configuration. You can read more about proxy configuration [here](https://crawlee.dev/api/core/class/ProxyConfiguration).
3. Create an instance of Crawlee's Puppeteer Crawler with `new PuppeteerCrawler()`. You can pass [options](https://crawlee.dev/api/puppeteer-crawler/interface/PuppeteerCrawlerOptions) to the crawler constructor as:
    - `proxyConfiguration` - provide the proxy configuration to the crawler
    - `requestHandler` - handle each request with custom router defined in the `routes.js` file.
4. Handle requests with the custom router from `routes.js` file. Read more about custom routing for the Cheerio Crawler [here](https://crawlee.dev/api/puppeteer-crawler/function/createPuppeteerRouter)
    - Create a new router instance with `new createPuppeteerRouter()`
    - Define default handler that will be called for all URLs that are not handled by other handlers by adding `router.addDefaultHandler(() => { ... })`
    - Define additional handlers - here you can add your own handling of the page
        ```javascript
        router.addHandler('detail', async ({ request, page, log }) => {
            const title = await page.title();
            // You can add your own page handling here

            await Dataset.pushData({
                url: request.loadedUrl,
                title,
            });
        });
        ```
5. `crawler.run(startUrls);` start the crawler and wait for its finish

## Resources

If you're looking for examples or want to learn more visit:

- [Crawlee + Apify Platform guide](https://crawlee.dev/docs/guides/apify-platform)
- [Documentation](https://crawlee.dev/api/playwright-crawler/class/PlaywrightCrawler) and [examples](https://crawlee.dev/docs/examples/playwright-crawler)
- [Node.js tutorials](https://docs.apify.com/academy/node-js) in Academy
- [How to scale Puppeteer and Playwright](https://blog.apify.com/how-to-scale-puppeteer-and-playwright/)
- [Video guide on getting data using Apify API](https://www.youtube.com/watch?v=ViYYDHSBAKM)
- [Integration with Make](https://apify.com/integrations), GitHub, Zapier, Google Drive, and other apps
- A short guide on how to build web scrapers using code templates:

[web scraper template](https://www.youtube.com/watch?v=u-i-Korzf8w)


## Getting started

For complete information [see this article](https://docs.apify.com/platform/actors/development#build-actor-locally). To run the actor use the following command:

```bash
apify run
```

## Deploy to Apify

### Connect Git repository to Apify

If you've created a Git repository for the project, you can easily connect to Apify:

1. Go to [Actor creation page](https://console.apify.com/actors/new)
2. Click on **Link Git Repository** button

### Push project on your local machine to Apify

You can also deploy the project on your local machine to Apify without the need for the Git repository.

1. Log in to Apify. You will need to provide your [Apify API Token](https://console.apify.com/account/integrations) to complete this action.

    ```bash
    apify login
    ```

2. Deploy your Actor. This command will deploy and build the Actor on the Apify Platform. You can find your newly created Actor under [Actors -> My Actors](https://console.apify.com/actors?tab=my).

    ```bash
    apify push
    ```

## Documentation reference

To learn more about Apify and Actors, take a look at the following resources:

- [Apify SDK for JavaScript documentation](https://docs.apify.com/sdk/js)
- [Apify SDK for Python documentation](https://docs.apify.com/sdk/python)
- [Apify Platform documentation](https://docs.apify.com/platform)
- [Join our developer community on Discord](https://discord.com/invite/jyEM2PRvMU)
