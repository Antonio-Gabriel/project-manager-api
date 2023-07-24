class AppError {
  public readonly message: string;
  public readonly status: number;

  constructor(message: string, status: number) {
    this.message = message;
    this.status = status;
  }
}

export { AppError };
