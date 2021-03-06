import * as mockBitpayResponse from '../../mocks/mockBitpayResponse';
import { generateTransactionDataFromBitpayResponse } from '../../../../../src/explorers/bitcoin/apis/bitpay';

function getMockBitpayResponse () {
  return JSON.parse(JSON.stringify(mockBitpayResponse));
}

describe('Bitpay Explorer test suite', function () {
  let mockResponse;

  beforeEach(function () {
    mockResponse = getMockBitpayResponse();
  });

  describe('given the transaction has enough confirmations', function () {
    const assertionTransactionData = {
      issuingAddress: '1AwdUWQzJgfDDjeKtpPzMfYMHejFBrxZfo',
      remoteHash: 'b2ceea1d52627b6ed8d919ad1039eca32f6e099ef4a357cbb7f7361c471ea6c8',
      revokedAddresses: ['1AwdUWQzJgfDDjeKtpPzMfYMHejFBrxZfo'],
      time: new Date(1518049414 * 1000)
    };

    it('should return the transaction data', function () {
      expect(generateTransactionDataFromBitpayResponse(mockResponse)).toEqual(assertionTransactionData);
    });
  });

  describe('given the transaction does not have enough confirmations yet', function () {
    it('should throw the right error', async function () {
      mockResponse.confirmations = 0;
      expect(() => {
        generateTransactionDataFromBitpayResponse(mockResponse);
      }).toThrowError('Number of transaction confirmations were less than the minimum required, according to Bitpay API');
    });
  });
});
