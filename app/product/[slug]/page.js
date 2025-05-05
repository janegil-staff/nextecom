import ProductImage from "@/components/product/ProductImage";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export async function generateMetadata({ params }) {
  const product = await getProduct(params?.slug);

  return {
    title: product?.title,
    description: product?.description?.substring(0, 160),
    openGraph: {
      images: product?.images[0]?.secure_url,
    },
  };
}

dayjs.extend(relativeTime);

async function getProduct(slug) {
  const response = await fetch(`${process.env.API}/product/${slug}`, {
    method: "GET",
    next: { revalidate: 1 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const data = await response.json();

  return data;
}

export default async function ProductViewPage({ params }) {
  const product = await getProduct(params?.slug);
  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-lg-8 offset-lg-2 card pt-5">
          <h1 className="text-center">{product?.title}</h1>

          <ProductImage product={product} />
          <div className="card-body">
            <div
              dangerouslySetInnerHTML={{
                __html: product?.description.replace(/\./g, "<br/><br/>"),
              }}
            />
            <div className="alert alert-primary mt-4">
              Brand: {product?.brand}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
