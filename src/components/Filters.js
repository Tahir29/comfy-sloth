import React from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { getUniqueValues, formatPrice } from "../utils/helpers";
import { FaCheck } from "react-icons/fa";

const Filters = () => {
  const {
    filters: {
      text,
      company,
      category,
      colors,
      min_price,
      max_price,
      price,
      shipping,
    },
    updateFilters,
    clearFilters,
    all_products,
  } = useFilterContext();

  const companies = getUniqueValues(all_products, "company");
  const categories = getUniqueValues(all_products, "category");
  const color = getUniqueValues(all_products, "colors");

  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* search */}
          <div className="form-control">
            <input
              type="text"
              name="text"
              placeholder="Search"
              className="search-input"
              value={text}
              onChange={updateFilters}
            />
          </div>
          {/* end of search */}
          {/* category */}
          <div className="form-control">
            <h5>Category</h5>
            <div>
              {categories.map((c, index) => {
                return (
                  <button
                    key={index}
                    type="button"
                    name="category"
                    className={`${
                      category === c.toLowerCase() ? "active" : null
                    }`}
                    onClick={updateFilters}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
          {/* end of category */}
          {/* company */}
          <div className="form-control">
            <h5>Company</h5>
            <select
              className="company"
              name="company"
              value={company}
              onChange={updateFilters}
            >
              {companies.map((c, index) => {
                return (
                  <option key={index} value={c}>
                    {c}
                  </option>
                );
              })}
            </select>
          </div>
          {/* end of company */}
          {/* color */}
          <div className="form-control">
            <h5>Colors</h5>
            <div className="colors">
              {color.map((c, index) => {
                if (c === "all") {
                  return (
                    <button
                      key={index}
                      name="colors"
                      onClick={updateFilters}
                      data-color="all"
                      className={`${
                        colors === "all" ? "all-btn active" : "all-btn"
                      }`}
                    >
                      All
                    </button>
                  );
                }
                return (
                  <button
                    key={index}
                    name="colors"
                    className={`${
                      colors === c ? "color-btn active" : "color-btn"
                    }`}
                    style={{ background: c }}
                    data-color={c}
                    onClick={updateFilters}
                  >
                    {colors === c ? <FaCheck /> : null}
                  </button>
                );
              })}
            </div>
          </div>
          {/* end of color */}
          {/* price */}
          <div className="form-control">
            <h5>price</h5>
            <p className="price">{formatPrice(price)}</p>
            <input
              type="range"
              name="price"
              onChange={updateFilters}
              min={min_price}
              max={max_price}
              value={price}
            />
          </div>
          {/* end of price */}
          {/* shipping */}
          <div className="form-control shipping">
            <label htmlFor="shipping">Free Shipping</label>
            <input
              type="checkbox"
              name="shipping"
              id="shipping"
              onChange={updateFilters}
              checked={shipping}
            />
          </div>
          {/* end of shipping */}
        </form>
        <button type="button" className="clear-btn" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
