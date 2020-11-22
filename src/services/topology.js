import request from '@/utils/request';

export async function get(id) {
  return request(`/api/topology//${id}`);
}

export async function list(pageIndex, pageCount) {
  return request(`/api/topologies?pageIndex=${pageIndex}&pageCount=${pageCount}`);
}
