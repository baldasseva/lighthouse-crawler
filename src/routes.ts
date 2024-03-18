import lighthouse from 'lighthouse';
import { Dataset, createPuppeteerRouter } from 'crawlee';

export const router = createPuppeteerRouter();

router.addDefaultHandler(async ({ enqueueLinks, log }) => {
    log.info(`INFO/ enqueueing new URLs`);
    await enqueueLinks({
        label: 'detail',
        strategy: 'same-origin',
    });
});

router.addHandler('detail', async ({ request, page, log }) => {
    const title = await page.title();
    log.info(`BEGIN/ ${title}`, { url: request.loadedUrl });

    const config = {
        extends: 'lighthouse:default',
        settings: {
            onlyCategories: ['performance'],
            skipAudits: [
                'screenshot-thumbnails',
                'final-screenshot',
                // Skip the h2 audit so it doesn't lie to us. See https://github.com/GoogleChrome/lighthouse/issues/6539
                'uses-http2',
                // There are always bf-cache failures when testing in headless. Reenable when headless can give us realistic bf-cache insights.
                'bf-cache'],
            disableFullPageScreenshot: true,
        },
    };
    const result = await lighthouse(request.url, undefined, config, page);
    const lhr = result?.lhr;

    log.info(`ENDED/ ${title}`, { url: request.loadedUrl });

    await Dataset.pushData({
        url: request.loadedUrl,
        title,
        lighthouse_result: lhr,
    });
});
