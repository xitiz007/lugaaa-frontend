import { getProducts, getCategories } from "../utils/crud";
import Banner from "../components/Banner";
import Products from "../components/Products";
import Pagination from "../components/Pagination";
import FilterProducts from "../components/FilterProducts";
import { useEffect, useState } from "react";
import Popup from "../components/Popup";

export default function Home({ data, user, categories }) {
  const { page, hasPrevious, hasNext, prevPage, nextPage, lastPage } =
    data;
  const [showPopup, setShowPopup] = useState(false);
  const [products, setProducts] = useState(data.products);

  useEffect(() => {
    setTimeout(() => {
      !user && setShowPopup(true);
    }, 6000);
  }, []);
  
  useEffect(() => {
    if(data.products)
    {
      setProducts(data.products)
    }
    else
    {
      setProducts([]);
    }
  }, [data.products])

  return (
    <div className="relative">
      <main className="max-w-screen-2xl mx-auto">
        {showPopup && <Popup setShowPopup={setShowPopup} />}
        <FilterProducts categories={categories} />
        <Banner />
        <Products products={products} setProducts={setProducts} user={user} />
        <Pagination
          page={page}
          hasPrevious={hasPrevious}
          hasNext={hasNext}
          prevPage={prevPage}
          nextPage={nextPage}
          lastPage={lastPage}
        />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const data = await getProducts(context.query);
  const categories = await getCategories();
  return {
    props: {
      data,
      categories
    },
  };
}
