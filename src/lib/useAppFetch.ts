/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASE_API_URL } from '@/config';

type ResponseState = {
  statusCode: number;
  ok: boolean;
};

type AppFetchResult = {
  data: any;
  responseState: ResponseState;
};

export const useAppFetch = async (
  path: string,
  opts?: RequestInit
): Promise<AppFetchResult> => {
  const response = await fetch(`${BASE_API_URL}${path}`, opts);
  const data = await response.json();

  const responseState = { statusCode: response.status, ok: response.ok };

  return { data, responseState };
};