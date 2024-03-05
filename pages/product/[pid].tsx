"use client";
import { useEffect, useState } from "react";
import Footer from "../../components/footer";
import Layout from "../../layouts/Main";
import Breadcrumb from "../../components/breadcrumb";
import Gallery from "../../components/product-single/gallery";
import Content from "../../components/product-single/content";
import { useGetstoreItemQuery } from "store/api";
import { useRouter } from "next/router";
import Description from "../../components/product-single/description";
// import Reviews from '../../components/product-single/reviews';

const Product = () => {
  const router = useRouter();
  const [showBlock, setShowBlock] = useState("description");
  const { data: storeItem } = useGetstoreItemQuery(router.query.pid?.toString().toUpperCase());
  const [product, setProduct] = useState<any>("");

  useEffect(() => {
    getData();
  }, [storeItem]);

  const getData = async () => {
    setProduct(await storeItem);
  };
  return (
    <Layout>


      {product && 
        <>
              <Breadcrumb itemName={product?.itemName} />
          <section className="product-single">
            <div className="container">
              <div className="product-single__content">
                <Gallery images={product?.itemImages} />
                <Content product={product} />
              </div>

              <div className="product-single__info">
                <div className="product-single__info-btns">
                  <button
                    type="button"
                    onClick={() => setShowBlock("description")}
                    className={`btn btn--rounded ${
                      showBlock === "description" ? "btn--active" : ""
                    }`}
                  >
                    Description
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowBlock("reviews")}
                    className={`btn btn--rounded ${
                      showBlock === "reviews" ? "btn--active" : ""
                    }`}
                  >
                    Reviews (2)
                  </button>
                </div>

                <Description
                  product={product}
                  show={showBlock === "description"}
                />
                {/* <Reviews product={product} show={showBlock === 'reviews'} /> */}
              </div>
            </div>
          </section>
          <div className="product-single-page">
            {/* <ProductsFeatured /> */}
          </div>
        </>
      }

      <Footer />
    </Layout>
  );
};

export default Product;
