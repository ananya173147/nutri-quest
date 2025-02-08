import debug from 'debug';

const logger = {
  debug: debug('app:debug'),
  info: debug('app:info'),
  error: debug('app:error')
};

export default logger;