import { api } from 'src/boot/axios';
import { AxiosError } from 'axios';

export const ping = async () => {
  try {
    const request = await api.get('device/v1/ping', {});
    return request.data;
  } catch (error) {
    console.error(error);
    const err = error as AxiosError;
    return err.response?.data;
  }
};

export const devices = async () => {
  try {
    const request = await api.get('device/v1/get-devices', {});
    console.log('ADASDSDASDSA', request)
    return request.data;
  } catch (error) {
    console.error(error);
    const err = error as AxiosError;
    return err.response?.data;
  }
};

