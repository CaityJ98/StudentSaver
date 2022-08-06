import React from 'react';
import BackgroundImg from '../assets/images/students.png';
import "../styles/Home.scss"


function Home() {
    return (
      <div className="home-content" style={{ backgroundImage: `url(${BackgroundImg})`}}>
      <div className="container home-text">
        <h1>Welcome to StudentSaver</h1>
        <p>StudentSaver is here to help you save money, save study time, and save your health, so you can focus on enjoying your student experience</p>
      </div>
    </div>
    )
    

}

  export default Home;