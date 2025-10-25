import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useDebounce } from "./useDebounce"; // hook debounce

const useTableData = (url, options = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // phân trang tách riêng state
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  // search + debounce
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  // sort + filter
  const [sorter, setSorter] = useState({});
  const [filters, setFilters] = useState({});

  // selected rows
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // gọi API
  const fetchData = useCallback(
    async (params = {}) => {
      setLoading(true);
      try {
        const res = await axios.get(url, {
          params: {
            page: params.current,
            limit: params.pageSize,
            search: params.search,
            sortField: params.sorter?.field,
            sortOrder: params.sorter?.order,
            ...params.filters,
          },
        });

        setData(res.data.data || res.data);

        const newTotal = res.headers["x-total-count"] || res.data.total;

        setTotal((prev) => (prev === newTotal ? prev : newTotal));
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    },
    [url]
  );

  // lắng nghe current, pageSize, search, sorter, filters
  useEffect(() => {
    fetchData({
      current,
      pageSize,
      search: debouncedSearch,
      sorter,
      filters,
    });
  }, [current, pageSize, debouncedSearch, sorter, filters, fetchData]);

  // khi table thay đổi (phân trang, filter, sort)
  const handleTableChange = (newPagination, newFilters, newSorter) => {
    setCurrent(newPagination.current);
    setPageSize(newPagination.pageSize);
    setFilters(newFilters);
    setSorter(newSorter);
  };

  // chọn dòng
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
    if (options.onSelectChange) {
      options.onSelectChange(newSelectedRowKeys);
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return {
    data,
    loading,
    pagination: {
      current,
      pageSize,
      total,
      showSizeChanger: true,
      pageSizeOptions: ["10", "20", "50", "100"],
      showTotal: (total, range) => `${range[0]}-${range[1]} / ${total} items`,
    },
    handleTableChange,
    setSearch,
    rowSelection,
    selectedRowKeys,
  };
};

export default useTableData;
