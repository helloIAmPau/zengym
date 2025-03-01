if(__DEV__ === true) {
  global.API_HOSTNAME = 'localhost';
  global.API_PROTOCOL = 'http:';
} else {
  global.API_HOSTNAME = 'zengym.io';
  global.API_PROTOCOL = 'https:';
}

global.API_URL = `${ API_PROTOCOL }//${ API_HOSTNAME }`;
