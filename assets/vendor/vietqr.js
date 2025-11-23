class VietQR {
  /**
   * @param {Object} options
   * @param {string} [options.apiKey] - API key (nếu cần)
   * @param {string} [options.clientId] - Client ID (nếu cần)
   */
  constructor({ apiKey = '', clientId = '' } = {}) {
    this.baseUrl = 'https://api.vietqr.io/v2';
    this.apiKey = apiKey;
    this.clientId = clientId;
  }

  // Lấy danh sách ngân hàng
  async getBanks() {
    const url = `${this.baseUrl}/banks`;
    try {
      const resp = await fetch(url);
      if (!resp.ok) {
        throw new Error(`HTTP Error: ${resp.status}`);
      }
      const json = await resp.json();
      return json.data;
    } catch (err) {
      console.error('Error fetching banks:', err);
      throw err;
    }
  }

  /**
   * Tra cứu số tài khoản
   * @param {number} bin - mã BIN ngân hàng (6 số)
   * @param {string} accountNumber - số tài khoản (6-19 ký tự)
   * @returns {Promise<{ accountName: string }>} nếu hợp lệ
   */
  async lookupAccount(bin, accountNumber) {
    const url = `${this.baseUrl}/lookup`;
    const payload = {
      bin,
      accountNumber,
    };

    const headers = {
      'Content-Type': 'application/json',
    };

    // Nếu có API key & client ID thì thêm header
    if (this.apiKey) {
      headers['x-api-key'] = this.apiKey;
    }
    if (this.clientId) {
      headers['x-client-id'] = this.clientId;
    }

    try {
      const resp = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        throw new Error(`HTTP Error: ${resp.status}`);
      }

      const json = await resp.json();
      // Có thể json.code, json.desc ... kiểm tra nếu cần
      return json.data; // theo doc trả về object có accountName
    } catch (err) {
      console.error('Error lookup account:', err);
      throw err;
    }
  }

  /**
   * Tạo mã QR
   * @param {Object} params
   * @param {string} params.accountNo - Số tài khoản ngân hàng (6-19 ký tự)
   * @param {string} params.accountName - Tên chủ tài khoản (5-50 ký tự, không dấu)
   * @param {number|string} params.acqId - Mã BIN (6 số)
   * @param {number|string} [params.amount] - Số tiền chuyển (tùy chọn)
   * @param {string} [params.addInfo] - Nội dung chuyển tiền (tối đa 25 ký tự)
   * @param {string} [params.format] - Định dạng trả về (theo doc)
   * @param {string} [params.template] - Mẫu QR code (“compact”, “print”, …)
   * @returns {Promise<Object>} Trả về JSON data gồm `qrCode`, `qrDataURL`, ...
   */
  async generateQR({
    accountNo,
    accountName,
    acqId,
    amount,
    addInfo,
    format,
    template,
  }) {
    const url = `${this.baseUrl}/generate`;
    const payload = {
      accountNo,
      accountName,
      acqId,
    };

    // Chỉ thêm nếu có
    if (amount !== undefined) payload.amount = amount;
    if (addInfo !== undefined) payload.addInfo = addInfo;
    if (format !== undefined) payload.format = format;
    if (template !== undefined) payload.template = template;

    const headers = {
      'Content-Type': 'application/json',
    };
    if (this.clientId) headers['x-client-id'] = this.clientId;
    if (this.apiKey) headers['x-api-key'] = this.apiKey;

    try {
      const resp = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        throw new Error(`HTTP Error: ${resp.status}`);
      }

      const json = await resp.json();
      // Kiểm tra code trả về nếu cần
      if (json.code !== '00') {
        throw new Error(`VietQR error: ${json.code} – ${json.desc}`);
      }
      return json.data;
    } catch (err) {
      console.error('Error generating QR code:', err);
      throw err;
    }
  }

}

// =============================================
// Xuất module cho Node.js / Electron
// hoặc gán vào window cho browser
// =============================================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = VietQR; // Cho Node.js / Electron
} else {
  window.VietQR = VietQR; // Cho browser
}

// =============================================
// Ví dụ sử dụng thư viện VietQR.js
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  (async () => {
    const api = new VietQR({
      apiKey: 'YOUR_API_KEY',        // nếu cần
      clientId: 'YOUR_CLIENT_ID',    // nếu cần
    });

    // Lấy danh sách ngân hàng
    // const banks = await api.getBanks();
    // console.log('Banks:', banks);

    // Tra cứu tài khoản
    // try {
    //   const result = await api.lookupAccount(970415, '113366668888');
    //   console.log('Account lookup result:', result);
    //   // Ví dụ: result.accountName
    // } catch (err) {
    //   console.error('Lookup failed:', err);
    // }

    // Tạo mã QR chuyển tiền
    // try {
    //   const qr = await api.generateQR({
    //     accountNo: '113366668888',
    //     accountName: 'QUY VAC XIN PHONG CHONG COVID',
    //     acqId: 970415,
    //     amount: 79000,
    //     addInfo: 'Ung Ho Quy Vac Xin',
    //     template: 'compact',
    //     format: 'text',
    //   });

    //   console.log('QR Result:', qr);
    //   // qr.qrCode: payload text
    //   // qr.qrDataURL: ảnh QR dạng data URI (base64)
    // } catch (err) {
    //   console.error('Không tạo được QR:', err);
    // }
  })();
});
