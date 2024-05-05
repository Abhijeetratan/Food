import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState('');

  const loadFoodItems = async () => {
    try {
      const response = await fetch( `/api/auth/foodData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setFoodItems(data[0]);
      setFoodCat(data[1]);
    } catch (error) {
      console.error('Error loading food items:', error);
    }
  };

  useEffect(() => {
    loadFoodItems();
  }, []);

  return (
    <div>
      <Navbar />
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        {/* Carousel code... */}
      </div>
      <div className='container'>
        {foodCat.map((data) => (
          <div className='row mb-3' key={data.id}>
            <div className='fs-3 m-3'>{data.CategoryName}</div>
            <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
            {foodItems
              .filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
              .map((filterItems) => (
                <div className='col-12 col-md-6 col-lg-3' key={filterItems.id}>
                  <Card foodName={filterItems.name} item={filterItems} options={filterItems.options[0]} ImgSrc={filterItems.img} />
                </div>
              ))}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
