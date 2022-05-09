import request from '@/util/request';
import Qs from 'querystring';

export const getProjectList = () => {
  return request.get(`/api/projects?page=0`);
};
