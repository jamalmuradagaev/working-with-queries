import { useState, useEffect } from 'react'
import Form from './Form'
import { useSelector, useDispatch } from 'react-redux'
import './App.css'
import edit from '/edit.png'
import like from '/like.png'
import dontLike from '/dontLike.png'
import del from '/delete.png'
import { fetchProducts, deleteProduct, likeProduct, addProduct, updateProduct, selectProduct} from './store/productSlice'

function App() {

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const selectedProduct = useSelector(state => state.products.selectedProduct);

  console.log(products)

  // получение данных из сервера
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // функция изменения продукта
  const handleEditProductSubmit = async (e, selectedProduct) => {
    e.preventDefault()
  
    const editedProduct = {
      title: e.target.title.value,
      description: e.target.description.value,
      id: selectedProduct.id,
      like: false,
    }
  
    dispatch(updateProduct(editedProduct))
  };

  // функция добавления нового продукта
  const handleAddProductSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      title: e.target.title.value,
      description: e.target.description.value,
      like: false,
    };

    dispatch(addProduct(newProduct));
  };

  return (
    <div className='app'>
      <h1>Products</h1>

      <div className='forms'>

        {/* Форма изменеиня данных */}
        <Form onSubmit={e => (handleEditProductSubmit(e, selectedProduct))} name='editProduct' />

        {/* Форма добавления данных */}
        <Form onSubmit={handleAddProductSubmit} name='addProduct' />

      </div>

      {/* вывод данных */}
      {products.map(product => {
        return (
          <div key={product.id} className='product'>
            <h3>{product.title}</h3>
            <p>{product.description}</p>

            <div className='actions'>

              <button onClick={() => dispatch(selectProduct(product))}>
                <img src={edit} alt="" />
              </button>

              <button onClick={() => dispatch(likeProduct(product))}>
                {product.like && (
                  <img src={like} alt="" />
                )}
                {!product.like && (
                  <img src={dontLike} alt="" />
                )}
              </button>

              <button onClick={() => dispatch(deleteProduct(product.id))}>
                <img src={del} alt="" />
              </button>

            </div>
          </div>


        )
      })}
    </div>
  )
}

export default App
