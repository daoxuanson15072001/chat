export class QueryDto {
  skip: number;
  take: number;
  pageSize: number;
  pageIndex: number;
  keyword?: string;
}
