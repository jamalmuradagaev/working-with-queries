import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const URL = `https://65a5126552f07a8b4a3e4af8.mockapi.io/API/Commerce`

// функция получения данных из сервера
export const fetchProducts = createAsyncThunk('products/fetchProducts', async function () {
    const response = await fetch(URL);
    if (!response.ok) {
        throw new Error('Error receiving data')
    }

    const data = response.json();
    return data
});

// функция удаления продукта
export const deleteProduct = createAsyncThunk('products/deleteProduct', async function (id) {
    const response = await fetch(`${URL}/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete product')
    }

    return response.json();
});

// функция добавления продукта в понравившееся
export const likeProduct = createAsyncThunk('products/likeProduct', async function (product) {
    const response = await fetch(`${URL}/${product.id}`, {
        method: "PUT",
        body: JSON.stringify({ ...product, like: !product.like }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error('Failed to like product')
    }

    const updatedProduct = await response.json();

    return updatedProduct;
});

// функция добавления нового продукта
export const addProduct = createAsyncThunk('products/addProduct', async function (newProduct) {
    const response = await fetch(URL, {
        method: 'POST',
        body: JSON.stringify(newProduct),
        headers: {
            "Content-Type": "application/json",
        }
    })
    if (!response.ok) {
        throw new Error('Error receiving data')
    }

    const data = response.json();
    return data
});

// функция изменения продукта
export const updateProduct = createAsyncThunk('products/updateProduct', async function (editedProduct) {
    const response = await fetch(`${URL}/${editedProduct.id}`, {
        method: "PUT",
        body: JSON.stringify(editedProduct),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error('Failed to update product')
    }

    const updatedProduct = await response.json();

    return updatedProduct;
});


const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        selectedProduct: null,
        status: null,
        error: null,
        like: false
    },
    reducers: {
        // ...
        selectProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },
    },
    extraReducers: builder => {
        // ПОЛУЧЕНИЕ ДАННЫХ ИЗ СЕРВЕРА
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'resolve';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'rejected';
            })



            // УДАЛЕНИЕ ПРОДУКТА
            .addCase(deleteProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.status = 'resolve'
                const deleteProduct = action.payload
                state.products = state.products.filter((product) => {
                    return product.id !== deleteProduct.id
                })
            })



            // ДОБАВЛЕНИЕ ПРОДУКТА В ПОНРАВИВШЕЕСЯ
            .addCase(likeProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(likeProduct.fulfilled, (state, action) => {
                state.status = 'resolve';
                const updatedProduct = action.payload;
                state.products = state.products.map((product) => {
                    if (product.id === updatedProduct.id) {
                        product.like = updatedProduct.like;
                        return product;
                    }
                    return product;
                });
            })



            // ДОБАВЛЕНИЕ нОВОГО ПРОДУКТА
            .addCase(addProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.status = 'resolve';
                const newProduct = action.payload;
                state.products.push(newProduct);
            })



            // ИЗМЕНЕИНЕ ПРОДУКТА
            .addCase(updateProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.status = 'resolve'
                const updatedProduct = action.payload;
                state.products = state.products.map((product) => {
                    if (product.id === updatedProduct.id) {
                        return updatedProduct;
                    }
                    return product;
                });
            })

    }

});

export const { selectProduct } = productSlice.actions;

export default productSlice.reducer;