import { assert } from "chai";
import { RateObserver } from '../src/rateObserver'
import { ProtocolRates } from '../src/types'

describe('Port', () => {

  it('Fetch Port Rates.', async () => {
    const rateObserver = new RateObserver();
    const protocolRates: ProtocolRates = await rateObserver.fetch('port');
console.log(JSON.stringify(protocolRates, null, 2));
    assert.isTrue(protocolRates.protocol === 'port');
    assert.isTrue(protocolRates.rates.length > 0);
  });

});
