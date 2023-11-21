import React, { Fragment, useEffect, useState } from "react";
import MetaData from "./layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Loader from "./layouts/Loader";
import Product from "./product/Product";
import {toast} from "react-toastify";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";


export default function Home() {
  const dispatch = useDispatch();
  const { products, loading, error,productsCount,resPerPage} = useSelector((state) => state.productsState);
  const[currentPage, setCurrentPage] = useState(1);

  // Use useParams to get the pageNumber parameter from the route
  const { pageNumber } = useParams();

  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
  }
  useEffect(() => {
    if (error) {
      return toast.error(error ,{
      position: toast.POSITION.BOTTOM_CENTER

    })
    }
    dispatch(getProducts(null,null,null,null,currentPage||1));
  }, [error, dispatch,currentPage])

  return (
    <Fragment>
      {loading ? <Loader /> : 

        <Fragment>
          {/* Tile of page canbe changed */}
          <MetaData title={"newmart"} />

          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {products && products.map((product) => (
                <Product col={3} key={product._id} product={product}/>
              ))}
            </div>
          </section>
          {productsCount > 0 &&  productsCount > resPerPage? (
              <div className="d-flex justify-content-center mt-5">
                <Pagination activePage={currentPage} 
                  onChange={setCurrentPageNo}
                  totalItemsCount={productsCount}
                  itemsCountPerPage={resPerPage}
                  nextPageText={'Next'}
                  firstPageText={'First'}
                  lastPageText={'Last'}
                  itemClass={'page-item'}
                  linkClass={'page-link'}
                />
              </div>):null}
          
        </Fragment>
      }
    </Fragment>
  );
}
