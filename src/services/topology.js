import request from '@/utils/request';

export async function get(id) {
  return request(`/api/topology/${id}`);
}

export async function list(pageIndex, pageCount) {
  return request(`/api/topologies?pageIndex=${pageIndex}&pageCount=${pageCount}`);
}

// 迁移方法
export async function  save(data) {
  data = Object.assign({}, data);
  for (const item of data.data.pens) {
    delete item.elementLoaded;
    delete item.elementRendered;
  }
  let ret;
  if (!data.name) {
    data.name = `Created at ${new Date().toLocaleString()}`;
  }
  if (data.id) {
    ret = await this.http.Put('/api/user/topology', data);
  } else {
    ret = await this.http.Post('/api/user/topology', data);
  }

  if (ret.error) {
    return null;
  }

  return ret;
}
