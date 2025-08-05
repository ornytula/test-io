import React, { useState, useEffect } from "react";
import "./HeroSlider.css";

const slides = [
  {
    title: "Гитары со звуком эпохи",
    subtitle: "Скидка до 30% на винтажные модели только до конца недели",
    image: "/images/guitars/1.jpg",
    imagePosition: "right",
  },
  {
    title: "Твой звук. Твой стиль.",
    subtitle: "Полуакустические и классические — в наличии. Отправим в тот же день.",
    image: "/images/slider/slider01.jpg",
    imagePosition: "left",
  },
  {
    title: "Bass Power",
    subtitle: "Легендарные бас-гитары — снова в продаже",
    image: "/images/guitars/1b.jpg",
    imagePosition: "right",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % slides.length);
        setAnimating(false);
      }, 500);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const { title, subtitle, image, imagePosition } = slides[index];

  return (
    <div className="hero-slide-wrapper">
      <div className={`hero-slide ${imagePosition}`}>
        <div className={`hero-text ${animating ? "fade-out" : "fade-in"}`}>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <div className="hero-image">
          <img src={image} alt={title} />
        </div>
      </div>
    </div>
  );
}
