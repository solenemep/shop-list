import React, { useState, useEffect } from 'react'
import ShoppingList from "./ShoppingList"
import AddPopularProduct from "./AddPopularProduct"
import AddProductForm from "./AddProductForm"

const ShoppingApp = () => {
  const getInitialShopping = () => {
    return JSON.parse(localStorage.getItem('myShoppingList')) || []
  }

  const [shopping, setShopping] = useState(getInitialShopping())

  useEffect(() => {
    document.title =
      shopping.length === 0
        ? `Prepare shopping list`
        : `${shopping.length} product(s) on list`
  }, [shopping])

  useEffect(() => {
    localStorage.setItem("myShoppingList", JSON.stringify(shopping))
  }, [shopping])

  const addToShoppingList = (product) => {
    setShopping([...shopping, product])
  }

  const removeFromShoppingList = (product) => {
    setShopping(shopping.filter((el) => el !== product))
  }

  return (
    <main className="row">
      <section className="col-lg-8">
        <ShoppingList
          shopping={shopping}
          removeFromShoppingList={removeFromShoppingList}
        />
      </section>
      <section className="col-lg-4">
        <div className="bg-light border p-4 mb-3">
          <h2 className="mb-3 h4">Ajouter un produit :</h2>
          <AddProductForm
            shopping={shopping}
            addToShoppingList={addToShoppingList}
          />
          <AddPopularProduct
            shopping={shopping}
            addToShoppingList={addToShoppingList}
          />
        </div>
      </section>
    </main>
  )
}

export default ShoppingApp