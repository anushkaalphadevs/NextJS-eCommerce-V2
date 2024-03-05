import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectFade, Navigation } from "swiper";
import { useGetbannersBasedOnStoreQuery } from "store/api";
import { useEffect, useState } from "react";

SwiperCore.use([EffectFade, Navigation]);

const PageIntro = () => {
  const { data: banner } = useGetbannersBasedOnStoreQuery([]);
  const [bannerList, setBannerList] = useState([]);

  useEffect(() => {
    getData();
  }, [banner]);

  const getData = async () => {
    setBannerList(await banner);
    console.log(await banner);
  };

  return (
    <section className="page-intro">
      <Swiper navigation effect="fade" className="swiper-wrapper">
        {bannerList?.map((banner: any, index: number) => (
          <SwiperSlide>
            <div
              key={index}
              className="page-intro__slide"
              style={{ backgroundImage: `url(${banner?.images?.url})` }}
            >
              <div className="container">
                <div className="page-intro__slide__content">
                  <h2>{banner?.heading}</h2>
                  <a href={banner?.link} className="btn-shop">
                    <i className="icon-right"></i><div>Shop now</div>
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="shop-data">
        <div className="container">
          <ul className="shop-data__items">
            <li>
              <i className="icon-shipping"></i>
              <div className="data-item__content">
                <h4>Free Shipping</h4>
                <p>On purchases over $199</p>
              </div>
            </li>

            <li>
              <i className="icon-shipping"></i>
              <div className="data-item__content">
                <h4>99% Satisfied Customers</h4>
                <p>Our clients' opinions speak for themselves</p>
              </div>
            </li>

            <li>
              <i className="icon-cash"></i>
              <div className="data-item__content">
                <h4>Originality Guaranteed</h4>
                <p>30 days warranty for each product from our store</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PageIntro;
