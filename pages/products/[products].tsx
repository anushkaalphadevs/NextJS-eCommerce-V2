import Layout from '../../layouts/Main';
import Footer from '../../components/footer';
import Breadcrumb from '../../components/breadcrumb';
import ProductsFilter from '../../components/products-filter';
import ProductsContent from '../../components/products-content';
import { useRouter } from 'next/router';
const Products = () => {
  const router = useRouter();
  return(
    <Layout>
    <Breadcrumb itemName={router.query?.products} />
    <section className="products-page">
      <div className="container">
        <ProductsFilter />
        <ProductsContent />
      </div>
    </section>
    <Footer />
  </Layout>
  )

  }
  
export default Products
  