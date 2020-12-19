import request from '@/utils/request';

export async function get() {
  return request('/api/user/profile');
}

// 迁移方法
export async function Upload(blob, filename) {
  const form = new FormData();
  form.append('path', filename);
  form.append('randomName', '1');
  form.append('public', 'true');
  form.append('file', blob);
  console.dir(form,blob,filename);

  request.post("api/image", {
    data:form
  })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });

  // const ret = await this.http.PostForm('/api/image', form); // 作为通用方法封装
  // if (ret.error) {
  //   return null;
  // }
  // return ret;
}

