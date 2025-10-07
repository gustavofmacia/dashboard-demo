export type ActionResponsePromise<T> = Promise<ActionResponse<T>>;

type ActionResponse<T> =
  | { success: true; data?: T; message?: string; status: number }
  | { success: false; message: string; status: number };
