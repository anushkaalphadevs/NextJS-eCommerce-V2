import ProductItem from '../../product-item';
import ProductsLoading from './loading';
import { storeItem } from 'types';
import { useGetSubcategoryQuery } from 'store/api';
import { useEffect, useState } from 'react';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { useRouter } from 'next/router';
        

const ProductsContent = () => {
  const router = useRouter()
  console.log(router.query.products)
  const{data:subcategroy,error} = useGetSubcategoryQuery(router.query.products=='All Items'?'':router.query.products)
  const [dataList, setDataList] = useState([]);
  const [rows, setRows] = useState(6);
  const [first, setFirst] = useState(1);


  useEffect(() => {
    getData()
  }, [subcategroy])

  const getData = async () => {
    console.log(await subcategroy);
    setDataList(await subcategroy)
  };
  
  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
};
  if (error) return <div>Failed to load users</div>;
  return (
    <>
      {!subcategroy && <ProductsLoading />}

      {subcategroy && (
        <><section className="products-list">
          {dataList?.slice(first, first+rows).map((item: storeItem,index:number) => (
            <ProductItem
              itemCode={item.itemCode}
              itemName={item.itemName}
              itemUnitPrice={item.itemUnitPrice}
              itemDescription={item.itemDescription}
              key={index}
              itemImages={item.itemImages[0]?.url} />
          ))}
        </section>
        <Paginator first={first} rows={rows} totalRecords={dataList?.length}  onPageChange={onPageChange} />
              
          </>
      )}
    </>
  );
};
  
export default ProductsContent