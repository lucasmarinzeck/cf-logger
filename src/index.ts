import pino, { LoggerOptions, Logger as TypeLogger } from 'pino';

export class Logger {
  static logger: TypeLogger;

  constructor(config: LoggerOptions = { base: undefined, level: 'info' }) {
    Logger.logger = pino(config);
  }

  private static removeFields(obj: any, blackList: Array<string>) {
    Object.keys(obj).forEach(prop => {
      if (blackList.includes(prop)) {
        delete obj[prop];
      } else if (typeof obj[prop] === 'object') {
        Logger.removeFields(obj[prop], blackList);
      }
    });

    return obj;
  }

  info(
    message: unknown,
    opts?: { children?: Array<Record<string, any>>; blackList?: Array<string> }
  ) {
    let finalMessage = message;

    if (typeof message === 'object' && opts?.blackList) {
      const messageCopy = { ...message };

      Logger.removeFields(messageCopy, opts.blackList);

      finalMessage = messageCopy;
    }

    if (opts?.children && opts?.children.length) {
      opts.children
        .reduce((logger, child) => {
          return logger.child(child);
        }, Logger.logger)
        .info(finalMessage);
    } else {
      Logger.logger.info(finalMessage);
    }
  }

  warn(
    message: unknown,
    opts?: { children?: Array<Record<string, any>>; blackList?: Array<string> }
  ) {
    let finalMessage = message;

    if (typeof message === 'object' && opts?.blackList) {
      const messageCopy = { ...message };

      Logger.removeFields(messageCopy, opts.blackList);

      finalMessage = messageCopy;
    }

    if (opts?.children && opts?.children.length) {
      opts.children
        .reduce((logger, child) => {
          return logger.child(child);
        }, Logger.logger)
        .warn(finalMessage);
    } else {
      Logger.logger.warn(finalMessage);
    }
  }

  error(
    message: unknown,
    opts?: { children?: Array<Record<string, any>>; blackList?: Array<string> }
  ) {
    let finalMessage = message;

    if (typeof message === 'object' && opts?.blackList) {
      const messageCopy = { ...message };

      Logger.removeFields(messageCopy, opts.blackList);

      finalMessage = messageCopy;
    }

    if (opts?.children && opts?.children.length) {
      opts.children
        .reduce((logger, child) => {
          return logger.child(child);
        }, Logger.logger)
        .error(finalMessage);
    } else {
      Logger.logger.error(finalMessage);
    }
  }

  debug(
    message: unknown,
    opts?: { children?: Array<Record<string, any>>; blackList?: Array<string> }
  ) {
    let finalMessage = message;

    if (typeof message === 'object' && opts?.blackList) {
      const messageCopy = { ...message };

      Logger.removeFields(messageCopy, opts.blackList);

      finalMessage = messageCopy;
    }

    if (opts?.children && opts?.children.length) {
      opts.children
        .reduce((logger, child) => {
          return logger.child(child);
        }, Logger.logger)
        .debug(finalMessage);
    } else {
      Logger.logger.debug(finalMessage);
    }
  }
}
