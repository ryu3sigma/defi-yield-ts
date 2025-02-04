import { AssetRate, ProtocolRates, toRate } from '../types';

export async function fetch(): Promise<ProtocolRates> {
  const url = "https://francium.io/app/lend";

  const puppeteer = require("puppeteer");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { timeout: 15000 });
  await new Promise(resolve => setTimeout(resolve, 5000));
  const content = await page.content();
  await browser.close();

  const cheerio = require("cheerio");
  const $ = cheerio.load(content);
  const rates: AssetRate[] = $(".ant-table-row").map((i, el) => {
    return {
      // @ts-ignore
      asset: $(el).find("td div").first().text(),
      // @ts-ignore
      deposit: toRate($(el).find("td div p").first().text()),
    };
  }).toArray().filter((assetRate) => { return isSupportedAsset(assetRate.asset); });

  return {
    protocol: 'francium',
    rates,
  };
}

function isSupportedAsset(asset: string): boolean {
  switch (asset) {
    case 'BTC': return true;
    case 'ETH': return true;
    case 'SOL': return true;
    case 'USDC': return true;
    default: return false;
  }
}
