import AddProductLink from "../components/productpage/add-product";
import { FilterDrawer } from "../components/productpage/filter-drawer";
import ProductList from "../components/productpage/product-list";



export default function Product() {
  return (

    <div className="container max-w-7xl mx-auto p-12 mt-24">

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold flex-1 text-center">
          Our Products
        </h1>
     
          <AddProductLink />
     
      </div>


      <ProductList />
    </div>
  );
}
