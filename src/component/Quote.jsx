import React, { useEffect, useState } from "react";
import { TiSocialTwitter, TiSocialTumbler,  } from "react-icons/ti";
import { FaQuoteLeft } from "react-icons/fa";
import styles from "./Quote.module.css";

const Quote = () => {

  const [quote, setQuote] = useState("")
  const [name, setName] = useState("")
  const [hex, setHex] = useState("FFFFFF");

  useEffect(() => {
    handleQuote()
  },[])
  
  const handleQuote = async () => {
    try {
      const res = await fetch('https://type.fit/api/quotes')
      const data = await res.json();
      // console.log(data);
      const randomIndex = Math.floor(Math.random() * data.length); // Get a random index
      const randomQuote = data[randomIndex];
    setQuote(`${randomQuote.text}`);
    setName(`${randomQuote.author.split(',')[0]}`);
    }catch(error) {
      setQuote("Is every thing OK mate!!!");
    }

    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16)
    setHex(randomColor);
  }

  return (
    <section className={styles.container}>
      <div className={styles.card} style={{color: `${hex}`}}>
        <h1 >
      <span className={styles.quote}><FaQuoteLeft /></span>
          {quote}
        </h1>
        <p>- {name}</p>
        <div className={styles.bottom}>
          <div className="social">
          <a href="" >
          <span  style={{color: `${hex}`}}>
              <TiSocialTwitter />
            </span>
          </a>
            <a href="">
            <span  style={{color: `${hex}`}}>
              <TiSocialTumbler />
            </span>
            </a>
            
          </div>
          <div>
            <button style={{backgroundColor: `${hex}`}} onClick={handleQuote}>New Quote</button>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Quote;
