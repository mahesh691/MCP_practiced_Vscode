/**
 * Logger utility for centralized logging across tests
 */
export class Logger {
  static step(message: string): void {
    console.log(`✓ [STEP] ${message}`);
  }

  static info(message: string): void {
    console.log(`ℹ [INFO] ${message}`);
  }

  static error(message: string, error?: Error): void {
    console.error(`✗ [ERROR] ${message}`);
    if (error) {
      console.error(error.message);
    }
  }

  static warn(message: string): void {
    console.warn(`⚠ [WARN] ${message}`);
  }

  static success(message: string): void {
    console.log(`✔ [SUCCESS] ${message}`);
  }

  static debug(message: string, data?: any): void {
    console.debug(`🔍 [DEBUG] ${message}`, data || '');
  }
}
