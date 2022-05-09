import request from '@/util/request';
import Qs from 'qs';

export const getTowerList = (args) => {
  return request.get(`/eawcs/onetoweronemap/tower/list?${Qs.stringify(args)}`);
};

export const getStretchList = (args) => {
  return request.get(
    `/eawcs/onetoweronemap/distractfield/list?${Qs.stringify(args)}`,
  );
};

export const getPackage = (args) => {
  return request.get(`/eawcs/package/list?${Qs.stringify(args)}`);
};
