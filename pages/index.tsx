import Layout from "../layouts/Main";
import PageIntro from "../components/page-intro";
import ProductsFeatured from "../components/products-featured";
import Footer from "../components/footer";
import Subscribe from "../components/subscribe";
import { useEffect, useRef, useState } from "react";
import { useGetcategoriesBasedOnStoreQuery } from "store/api";
import { AppStore, makeStore } from "store";
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from "next/link";

const IndexPage = () => {
  let slidesPerView = 1.3;
  let centeredSlides = true;
  let spaceBetween = 30;
  if (process.browser) {
    if (window.innerWidth > 768) {
      slidesPerView = 3;
      spaceBetween = 35;
      centeredSlides = false;
    }
    if (window.innerWidth > 1024) {
      slidesPerView = 4;
      spaceBetween = 65;
      centeredSlides = false;
    }
  }

  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  const { data: Category } = useGetcategoriesBasedOnStoreQuery([]);
  const [CategoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getData();
  }, [Category]);

  const getData = async () => {
    setCategoryList(await Category);
    console.log(await Category);
  };
  return (
    <Layout>
      <PageIntro />
      <div className="products-carousel" style={{marginTop:"12px"}}>
        <Swiper
          spaceBetween={spaceBetween}
          loop={true}
          centeredSlides={centeredSlides}
          watchOverflow={true}
          slidesPerView={slidesPerView}
          className="swiper-wrapper"
          navigation
        >
          {CategoryList?.map((item:any) => (
            <SwiperSlide key={item.id} >
              <div className="product-item">
                <div className="product__image">
                  <Link href={`/products/${item.code}`}>
                    <a>
                      <img src={item.imgURL} alt="category" />
                    </a>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <section className="section">
        <div className="container">
          <header className="section__intro">
            <h4>Why should you choose us?</h4>
          </header>

          <ul className="shop-data-items">
            <li>
              <i className="icon-shipping"></i>
              <div className="data-item__content">
                <h4>Free Shipping</h4>
                <p>
                  All purchases over $199 are eligible for free shipping via
                  USPS First Class Mail.
                </p>
              </div>
            </li>

            <li>
              <i className="icon-payment"></i>
              <div className="data-item__content">
                <h4>Easy Payments</h4>
                <p>
                  All payments are processed instantly over a secure payment
                  protocol.
                </p>
              </div>
            </li>

            <li>
              <i className="icon-cash"></i>
              <div className="data-item__content">
                <h4>Money-Back Guarantee</h4>
                <p>
                  If an item arrived damaged or you've changed your mind, you
                  can send it back for a full refund.
                </p>
              </div>
            </li>

            <li>
              <i className="icon-materials"></i>
              <div className="data-item__content">
                <h4>Finest Quality</h4>
                <p>
                  Designed to last, each of our products has been crafted with
                  the finest materials.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <ProductsFeatured />
      <Subscribe />
      <Footer />
    </Layout>
  );
};

export default IndexPage;
