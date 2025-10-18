import ProductDetails from "@/app/components/productpage/product-details";


export default function Details({ params }: { params: { slug: string } }) {

  return (
    <div className="mt-24 max-w-7xl mx-auto">
      <ProductDetails slug={params.slug} />
    </div>
    
  );
}
