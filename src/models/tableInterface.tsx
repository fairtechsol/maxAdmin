export interface TableConfig {
  page: number | null;
  sort: any;
  keyword: string;
  rowPerPage:any;
}

export interface Column {
  id: string;
  label: any;
  colSpan?: number;
}
