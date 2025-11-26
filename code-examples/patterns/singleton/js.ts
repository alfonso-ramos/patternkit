class Logger {
  private static instance: Logger | null = null;
  private constructor() {}

  static getInstance() {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  log(message: string) {
    console.info(`[log] ${message}`);
  }
}

export function useLogger() {
  const logger = Logger.getInstance();
  logger.log("Se emite un mensaje desde un Singleton");
}
