import request  from '@/util/request';

export function login(data) {
  return request.post('/login', { data:data });
}

export function imageCode(){
  return request.get('/imageCaptcha');
};
