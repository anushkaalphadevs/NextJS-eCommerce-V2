import React from "react";

type ProductDescriptionType = {
  show: boolean;
  product:any
}

const Description = ({ show,product }: ProductDescriptionType) => {
  console.log(product)
  const style = {
    display: show ? 'flex' : 'none',
  }

  return (
    <section style={style} className="product-single__description">
      <div className="product-description-block">
        <p dangerouslySetInnerHTML={{ __html:product?.itemLongDescription}}></p>
      </div>
    </section>
  );
};
  
export default Description;
    