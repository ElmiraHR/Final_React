// import { useParams } from "react-router-dom";

// export default function ProductsByCategoryPage() {
//   const { categoryId } = useParams();

//   return (
//     <div>
//       <p>Products By Category Page</p>
//       <p>Category ID: {categoryId}</p>
//     </div>
//   );
// }
// pages/ProductByCategoryPage.js

import React from 'react';
import ProductByCategory from '../components/productByCategory/ProductByCategory';
import AllProductsPage from './AllProductsPage';

const ProductByCategoryPage = (props) => {
  return(
    <div>
    
    <ProductByCategory {...props} />
    </div>
  );
};

export default ProductByCategoryPage;
