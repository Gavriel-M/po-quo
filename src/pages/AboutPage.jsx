import "../style/about.css"

const AboutPage = () => {

    return (
      <div className="about-page">
        <div className="about-box">
          <div className="about-header">
            <h2>About us</h2>
          </div>
          <div className="about-content">
            Hello and welcome to popular quotes! <br />
            This website is dedicated solely to sharing popular, fun, interesting and inspiring quotes! <br />
            <br />
            Popular quotes was built using a React front alongside a Node.js - express back end and designed using Figma. 
          </div>
        </div>
      </div>
    );
}

export default AboutPage;