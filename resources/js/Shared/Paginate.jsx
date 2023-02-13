import React from "react";
import PropTypes from "prop-types";

const Paginate = (props) => {
  const getUrl = (url, current_page = null) => {
    if (url) {
      let indexUrl = url.split("page=");
      let page = indexUrl[1];
      if (current_page) {
        page = current_page;
      }
      return page;
    }
  };

  const {
    last_page,
    current_page,
    last_page_url,
    first_page_url,
    next_page_url,
    prev_page_url,
  } = props.pagination;

  return (
    <nav>
      <div className="mt-2 mb-3">
        {`Show ${props.pagination.from} to ${props.pagination.to} of ${props.pagination.total} records`}
      </div>

      {current_page > 0 && (
        <ul className="inline-flex -space-x-px">
          <li className={current_page > 1 ? "page-item" : "page-item disabled"}>
            <a
              className={
                "px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }
              onClick={() => {
                if (current_page > 1) props.handlePage(getUrl(first_page_url));
              }}
            >
              Primeira
            </a>
          </li>

          <li className={current_page > 1 ? "page-item" : "page-item disabled"}>
            <a
              className={
                "px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }
              onClick={() => {
                if (current_page > 1) props.handlePage(getUrl(prev_page_url));
              }}
            >
              {"<<"}
            </a>
          </li>

          {current_page === last_page && last_page > 2 && (
            <li className="page-item">
              <a
                className={
                  "px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                }
                onClick={() =>
                  props.handlePage(getUrl(first_page_url, current_page - 2))
                }
              >
                {current_page - 2}
              </a>
            </li>
          )}

          {current_page > 1 && (
            <li className="page-item">
              <a
                className={
                  "px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                }
                onClick={() =>
                  props.handlePage(getUrl(first_page_url, current_page - 1))
                }
              >
                {current_page - 1}
              </a>
            </li>
          )}

          <li className={"page-item active"}>
            <a
              className={
                "px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              }
            >
              {current_page}
            </a>
          </li>

          {current_page < last_page && (
            <li className="page-item">
              <a
                className={
                  "px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                }
                onClick={() =>
                  props.handlePage(getUrl(first_page_url, current_page + 1))
                }
              >
                {current_page + 1}
              </a>
            </li>
          )}

          {current_page === 1 && last_page > 2 && (
            <li className="page-item">
              <a
                className={
                  "px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                }
                onClick={() =>
                  props.handlePage(getUrl(first_page_url, current_page + 2))
                }
              >
                {current_page + 2}
              </a>
            </li>
          )}

          <li
            className={
              current_page < last_page ? "page-item" : "page-item disabled"
            }
          >
            <a
              className={
                "px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }
              onClick={() => {
                if (current_page < last_page)
                  props.handlePage(getUrl(next_page_url));
              }}
            >
              {">>"}
            </a>
          </li>

          <li
            className={
              current_page < last_page ? "page-item" : "page-item disabled"
            }
          >
            <a
              className={
                "px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }
              onClick={() => {
                if (current_page < last_page)
                  props.handlePage(getUrl(last_page_url));
              }}
            >
              Última
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
};

Paginate.defaultProps = {
  pagination: {
    to: 0,
    from: 0,
    total: 0,
    last_page: 0,
    current_page: 0,
    prev_page_url: null,
    next_page_url: "",
    last_page_url: "",
    first_page_url: "",
  },
};

Paginate.propTypes = {
  handlePage: PropTypes.func.isRequired,
  pagination: PropTypes.shape({
    to: PropTypes.number.isRequired,
    from: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    last_page: PropTypes.number.isRequired,
    current_page: PropTypes.number.isRequired,
    last_page_url: PropTypes.string.isRequired,
    first_page_url: PropTypes.string.isRequired,
    next_page_url: PropTypes.string,
    prev_page_url: PropTypes.string,
  }),
};

export default Paginate;
