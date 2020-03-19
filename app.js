var serverUrl = 'http://api.douban.com/v2/movie',
  apikey = '0df993c66c0c636e29ecbb5344252a4a';

// in_theaters ? apikey = 0df993c66c0c636e29ecbb5344252a4a & start=0 & count=10
App({
  serverUrl: serverUrl,
  IN_THEATERS: serverUrl + '/in_theaters?apikey=' + apikey,
  COMING_SOON: serverUrl + '/coming_soon?apikey=' + apikey,
  TOP_250: serverUrl + '/top250?apikey=' + apikey,
  apikey 
})