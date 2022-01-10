import Product from "./Product";

const NoProduct = () => (
  <div className="flex items-center justify-center">
    <h2 className="text-sm md:text-base lg:text-lg font-medium tracking-wider">
      Sorry there are no products available right now
    </h2>
  </div>
);

function Products({ products, user, setProducts }) {
  if (!products || products.length === 0) return <NoProduct />;
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
      {products?.map((product) => (
        <Product
          setProducts={setProducts}
          key={product._id}
          product={product}
          id={product._id}
          title={product.title}
          description={product.description}
          category={product.category}
          images={product.images}
          price={product.productSizes[0].price}
          gender={product.gender}
          user={user}
        />
      ))}
    </div>
  );
}

export default Products;
