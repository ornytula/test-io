import { Link } from 'react-router-dom';
import './Home.css';
export default function Home() {
  const categories = [
    {
      code: 'electric-guitars',
      title: 'Электрогитары',
      image: '/images/guitars/1.jpg',
    },
    {
      code: 'bass-guitars',
      title: 'Бас-гитары',
      image: '/images/guitars/1b.jpg',
    },
    {
      code: 'classical-guitars',
      title: 'Классические гитары',
      image: '/images/guitars/1k.jpg',
    },
    {
      code: 'acoustic-guitars',
      title: 'Акустические гитары',
      image: '/images/guitars/1a.jpg',
    },
  ];

  return (
    <>
    <div className="container">
      <div className="cat-row">
        {categories.map(({ code, title, image }) => (
          <Link to={`/catalog/${code}`} key={code} className="home-card" style={{ backgroundImage: `url(${image})` }}>
            <div className="home-card-overlay">
              <h2>{title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
</>  );
}

