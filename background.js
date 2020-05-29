const HEADERS_TO_STRIP_LOWERCASE = [
  'content-security-policy',
  'x-frame-options',
];

const ALLOWED_INITIATOR = 'https://app.flowdash.com';

const stripXFrameHeaders = (details) => {
  if(details.initiator.startsWith(ALLOWED_INITIATOR)) {
    return details.responseHeaders.filter(header =>
      !HEADERS_TO_STRIP_LOWERCASE.includes(header.name.toLowerCase())
    );
  } else {

    // Do not alter headers not originating from whitelisted origins. 
    return details.responseHeaders
  }
};

chrome.webRequest.onHeadersReceived.addListener(
  details => ({
    responseHeaders: stripXFrameHeaders(details)
  }),
  {
    urls: ['<all_urls>']
  },
  ['blocking', 'responseHeaders']
);
