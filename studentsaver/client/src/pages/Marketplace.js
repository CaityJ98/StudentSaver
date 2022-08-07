import React, { useEffect, useState } from "react";
import { getAll } from "../functions/listingdata";
import { useSearchParams } from "react-router-dom";
import { Col } from "react-bootstrap";
import CategoriesNav from "../components/Categories/categoriesNav";
import SearchBar from "../components/header/Header";
import ListingCard from "../components/ListingCards/ListingCard";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/marketplace.scss";

const Marketplace = () => {
  const [params, setParams] = useSearchParams();
  const category = params.get('category')
  // console.log(category)

  const [listings, setListing] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    // setPage(1);
    setLoading(true);
    // below to change search on category
    if (query) setParams({ category: 'all' })
    // setQuery("");
    getAll(page, category, query)
      .then((res) => {
        // console.log(res);
        setListing(res.listings);
        setLoading(false);
        // setPage((page) => page + 1);
        // setQuery("");
      })
      .catch((err) => console.log(err));
  }, [category, query, setListing, page]);


  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  return (
    <>
    
      <div id="sider">
        <SearchBar
         />
        <input
          className="col-lg-6"
          type="text"
          placeholder="Search..."
          name="search"
          value={query}
          onChange={handleSearch}
        />
      </div>
      <h1> Book Exchange </h1>
      <CategoriesNav />
      {/* <div className="drop">
        <Dropdown id="dropdown-sort">
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            Sort <BiSort />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                setSort("oldest");
              }}
            >
              Oldest <BiDownArrowAlt />
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setSort("newest");
              }}
            >
              Newest <BiUpArrowAlt />
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setSort("lowerPrice");
              }}
            >
              Price <BiSortDown />
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setSort("biggerPrice");
              }}
            >
              Price <BiSortUp />{" "}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div> */}
      
      <div className="listings">
        {listings &&
          listings.length > 0 &&
          listings.map((listing) => (
            <Col xs={12} md={6} lg={3} key={listing._id.toString()}>
              <ListingCard params={listing} />
            </Col>
          ))}
          {page > 1 && <button onClick={() => setPage(page - 1)}>Back</button>}
          {listings.length === 10 && <button onClick={() => setPage(page + 1)}>Show more</button>}
      </div>
    </>
  );
};

export default Marketplace;
