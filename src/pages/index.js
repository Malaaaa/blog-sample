import Developtools from "./components/Developtools";
import React from "react";
import csharp from "../../static/img/icons8-c-sharp-logo-48.png";
import aws from "../../static/img/icons8-amazon-web-services-32.png";
import sumacc from "../../static/img/ninth-glider-325616.web.app_.png";
import jira from "../../static/img/malaaaaaa.github.io_.png";
import stmic from "../../static/img/stmichaelscollegeschool.com.png";
import Layout from "@theme/Layout";
import ji from "../../static/img/Ji.png";
import styles from "./index.module.css";
import Frontendab from "./components/Frontendab";
import Backendab from "./components/Backendab";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export default function Home() {
  return (
    <main>
      <Layout
        title={`Liangji Ma Resume`}
        description='This is a resume and blog for my program'
      >
        <div className='container'>
          <div className={styles.warp}>
            <div className={styles.left}>
              <img src={ji} className={styles.img} />
              <h2>Liangji Ma</h2>
              <div>
                <p className='work'>Software Developer Engineer</p>
                <p className='location'>Toronto, CA</p>
                <p className='email'>
                  <a href='mailto:ethan@liangjima.com'>
                  ethan@liangjima.com
                  </a>
                </p>
                <p className='linkedin'>
                  <a href='https://www.linkedin.com/in/liangji-ma/'>
                    linkedin.com/in/liangji-ma
                  </a>
                </p>
              </div>
              <hr />
              <h3 className={styles.skill}>Skills</h3>
              <h5>Program Language</h5>
              <>
                <Frontendab />
                <Backendab csharp={csharp} />
              </>
              <h5>Development Tools</h5>
              <Developtools aws={aws} />
            </div>
            <div className={styles.right}>
              <div className={styles.education}>
                Education
                <div>
                  <h6 className={styles.bishop}>Bishop's University</h6>
                  <p className={styles.place}>
                    <b className={styles.locate}>Sherbrooke, Québec</b>
                    <i className={styles.time}>Sep. 2020 - Jan. 2022</i>
                    <br />
                  </p>
                  <p>Master of Computer Science</p>
                </div>
                <div>
                  <h6 className={styles.xupt}>
                    Xian University of Posts Telecommunications University
                  </h6>
                  <p className={styles.place}>
                    <b className={styles.locate}>Xian. China</b>
                    <i className={styles.time}>Sep. 2015 - Jun. 2019</i>
                    <br />
                  </p>
                  <p>Bachelor of Electrical Engineering</p>
                </div>
              </div>
              <hr></hr>
              <div className={styles.experience}>My Portfolio</div>
              <hr />
              <Carousel thumbs={false}>
                <a href="https://ninth-glider-325616.web.app/">
                    <img src={sumacc} />
                </a>
                <a href="https://malaaaaaa.github.io/">
                    <img src={jira}  />
                </a>
                <a href="https://stmichaelscollegeschool.com/">
                    <img src={stmic} />
                </a>
            </Carousel>
            </div>
          </div>
        </div>
      </Layout>
    </main>
  );
}
