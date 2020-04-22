const targetServer = 'https://sent-an-demo.onepointltd.com';

export const createURLWithParams = (targetUrl, params) => {
    const url = new URL(`${targetServer}/${targetUrl}`);
    url.search = new URLSearchParams(params);
    return url;
};