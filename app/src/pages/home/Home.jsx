import { useEffect, useState } from 'react'
import './Home.css'

function Home() {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await fetch('http://localhost:4000/categories');
      const data = await response.json();
      setCategories(data);
    }
    catch (error) {
      console.log(error)
    }
  }
  
  
  useEffect(() => {
    getCategories();
  }, [])

  return (
    <div className="Home">
      <ul>
        {
          categories.map(category => <li key={category.id}>{category.value}</li>)
        }
      </ul>
    </div>
  )
}

export default Home
