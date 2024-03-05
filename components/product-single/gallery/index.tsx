
const Gallery = ( {images}:any) => {
  console.log(images)
   const featImage: any = images?.[0].url;
  return (
    <section className="product-gallery">
      <div className="product-gallery__thumbs">
        {images?.map((image:any) => (
          <div key={image} className="product-gallery__thumb">
            <img src={image?.url} alt="" />
          </div>
        ))}
      </div>

      <div className="product-gallery__image">
        <img src={featImage} alt="" />
      </div>
    </section>
  );
};
  
export default Gallery;
  