import { useEffect, useState, useCallback } from "react";
import Pagination from "rc-pagination";
import LazyLoad from "react-lazyload";
import Select from "react-select";
import { ChildListItem, Placeholder } from "../Base";
import { getChildrenApi } from "../../service/api";
import "rc-pagination/assets/index.css";
import "./ChildrenList.css";

const PAGE_SIZE_OPTIONS = [
  { value: 10, label: "10" },
  { value: 15, label: "15" },
  { value: 20, label: "20" },
  { value: 30, label: "30" },
];

const ChildrenList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [children, setChildren] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const getChildren = useCallback(async () => {
    try {
      setIsLoading(true);
      const { children, total } = await getChildrenApi(currentPage, pageSize);
      setChildren(children);
      setTotal(total);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error(`Fetch Error: ${err}`);
    }
  }, [currentPage, pageSize]);

  useEffect(() => {
    getChildren();
  }, [getChildren]);

  const handlePageChange = (current, pageSize) => {
    window.scrollTo(0, 0);
    setCurrentPage(current);
  };

  const handlePageSize = ({ value }) => {
    setPageSize(value);
  };

  return (
    <div className="list-container">
      <p className="header-title">Famly - Check In/Check Out Your Child</p>
      <div className="page-header">
        <div>
          <div className="total-count-view">
            <span className="page-header-label">Current Page:</span>
            <span className="page-header-value">{currentPage}</span>
          </div>
          <div className="total-count-view">
            <span className="page-header-label">Total:</span>
            <span className="page-header-value">{total}</span>
          </div>
        </div>
        <div className="page-size-select-view">
          <span className="page-header-label">Page Size: </span>
          <Select
            className="page-size-selector"
            defaultValue={{ value: 10, label: "10" }}
            onChange={handlePageSize}
            options={PAGE_SIZE_OPTIONS}
          />
        </div>
      </div>

      {isLoading ? (
        <>
          <Placeholder />
          <Placeholder />
          <Placeholder />
        </>
      ) : (
        <div className="list-content">
          {children.map((item) => (
            <LazyLoad
              key={item.childId}
              height={140}
              offset={-100}
              once={true}
              debounce={500}
              placeholder={<Placeholder />}
            >
              <ChildListItem childData={item} />
            </LazyLoad>
          ))}
          <Pagination
            defaultCurrent={1}
            current={currentPage}
            pageSize={pageSize}
            showLessItems
            total={total}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ChildrenList;
