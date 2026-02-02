interface globalResponseType<T> {
  success: true | false;
  message: string;
  data?: T;
}

export type { globalResponseType };
