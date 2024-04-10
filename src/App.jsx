import { useState, useEffect } from 'react'
import './App.css'
import edit from '../public/edit.png'
import like from '../public/like.png'
import del from '../public/delete.png'

const URL = `https://65a5126552f07a8b4a3e4af8.mockapi.io/API/Commerce`

function App() {
  
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    const getProducts = async() => {
      try {
        let response = await fetch(URL)
        let data = await response.json()
        
        setProducts(data)
      } 
      catch (error) {
        console.log(`Error: ${error}`)
      }
    }

    getProducts()
  }, [])

  const editProduct = (product) => {
    setSelectedProduct(product)
  }

  // функция изменения продукта
  const handleEditProductSubmit = async (e) => {
    e.preventDefault();
  
    const editedProduct = {
      title: e.target.title.value,
      description: e.target.description.value,
      id: selectedProduct.id,
      liked: selectedProduct.liked,
    };

    console.log(editedProduct);
  
    const response = await fetch(`${URL}/${selectedProduct.id}`, {
      method: "PUT",
      body: JSON.stringify({...selectedProduct, ...editedProduct}),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) return 
  
    const editedProductFromServer = await response.json();
  
    setProducts(
      products.map((product) => {
        if (product.id === editedProductFromServer.id) {
          return editedProductFromServer;
        }
  
        return product;
      })
    );
  
    e.target.title.value = "";
    e.target.description.value = "";
  
    return true;
  };

  // функция добавления нового продукта
  const handleAddProductSubmit  = async(e) => {
    e.preventDefault()

    const newProduct = {
      title: e.target.title.value,
      description: e.target.description.value,
      liked: false,
    }

    const response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) return;

    const createdProduct = await response.json()

    setProducts([...products, createdProduct]);

    e.target.title.value = ''
    e.target.description.value = ''

    return true
  }
  

  return (
    <div className='app'>
      <h1>Products</h1>

      <div className='forms'>

        {/* Форма изменеиня данных */}
        <form action="" onSubmit={handleEditProductSubmit} name='editProduct'>
          <h2>Edit</h2>
          <div>
            <input type="text" name='title'/> 
          </div>
          <div>
            <textarea name="description" id="" cols="30" rows="10"></textarea>
          </div>
          <button>Submit</button>
        </form>

        {/* Форма добавления данных */}
        <form action="" onSubmit={handleAddProductSubmit} name='addProduct'>
          <h2>Add</h2>
          <div>
            <input type="text" name='title'/> 
          </div>
          <div>
            <textarea name="description" id="" cols="30" rows="10"></textarea>
          </div>
          <button>Submit</button>
        </form>

      </div>

      {/* вывод данных */}
      {products.map(product => {
        return (
          <div key={product.id} className='product'>
            <h3>{product.title}</h3>
            <p>{product.description}</p>

            <div className='actions'>
              <button onClick={() => editProduct(product)}>
                <img src={edit} alt="" />
              </button>
            </div>
          </div>

          
        )
      })}
    </div>
  )
}

export default App
