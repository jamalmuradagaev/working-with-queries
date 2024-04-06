import { useState, useEffect } from 'react'
import './App.css'

const URL = `https://65a5126552f07a8b4a3e4af8.mockapi.io/API/Commerce`

function App() {
  
  const [products, setProducts] = useState([])

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
  

  return (
    <div className='app'>
      <h1>Products</h1>

      {products.map(product => {
        return (
          <div key={product.id} className='product'>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
          </div>
        )
      })}
    </div>
  )
}

export default App
