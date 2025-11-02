// export const catchError = async <T, E = Error>(
//   promise: Promise<T>
// ): Promise<[E | null, T | null]> => {
//   try {
//     const result = await promise;
//     // On success: [error, data] -> [null, result]
//     return [null, result];
//   } catch (error: unknown) {
//     // On failure: [error, data] -> [error, null]
//     // The 'as E' assertion handles the 'error: unknown' type.
//     return [error as E, null];
//   }
// };

export const catchError = async <T, E = Error>(
  promise: Promise<T>
): Promise<[E | null, T]> => {
  try {
    const result = await promise;
    return [null, result];
  } catch (error: unknown) {
    return [error as E, undefined as T];
  }
};
