import { LiteralObject } from '@nestjs/common';

export function returnPaging(
  data: LiteralObject,
  totalItems: number,
  params: LiteralObject,
  metadata = {},
) {
  return {
    pageIndex: params.pageIndex,
    totalPages: Math.ceil(totalItems / params.pageSize),
    totalItems,
    data,
    paging: true,
    metadata,
  };
}

export function assignPaging(params: LiteralObject) {
  params.pageIndex = Number(params.pageIndex) || 1;
  params.pageSize = Number(params.pageSize) || 10;

  params.skip = (params.pageIndex - 1) * params.pageSize;
  params.take = params.pageSize;

  return params;
}
