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
import Translate, {translate} from '@docusaurus/Translate';
import Link from "@docusaurus/Link";

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
              <img src={ji} className={styles.img} alt="Logo"/>
              <h2><Translate>Liangji Ma</Translate></h2>
              <div>
                <p className='work'><Translate>Software Developer Engineer</Translate></p>
                <p className='location'><Translate>Toronto, CA</Translate></p>
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
              <h4 className={styles.skill}>Skills</h4>
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
              <Translate>Education</Translate>
                <div>
                  <h6 className={styles.bishop}><Translate>Bishop's University</Translate></h6>
                  <p className={styles.place}>
                    <b className={styles.locate}>Sherbrooke, Québec</b>
                    <i className={styles.time}>Sep. 2020 - Jan. 2022</i>
                    <br />
                  </p>
                  <p><Translate>Master of Computer Science</Translate></p>
                </div>
                <div>
                  <h6 className={styles.xupt}>
                    <Translate>Xian University of Posts Telecommunications University</Translate>
                  </h6>
                  <p className={styles.place}>
                    <b className={styles.locate}>Xian. China</b>
                    <i className={styles.time}>Sep. 2015 - Jun. 2019</i>
                    <br />
                  </p>
                  <p><Translate>Bachelor of Electrical Engineering</Translate></p>
                </div>
              </div>
              <hr></hr>
              <div className={styles.experience}><Translate>My Portfolio</Translate></div>
              <hr />
              <a href="https://ninth-glider-325616.web.app/"><h4>Sum Accounting Website</h4></a>
              <a href="https://malaaaaaa.github.io/"><h4>Jira Website</h4></a>
              <a href="https://stmichaelscollegeschool.com/"><h4>st-michaels-colleges-chool website</h4></a>
              <button className={styles.arrowbutton}>↓</button>

            </div>
          </div>
          <div>
              <iframe src="https://ninth-glider-325616.web.app/"></iframe>
              <iframe src="https://malaaaaaa.github.io/"></iframe>
              <iframe src="https://stmichaelscollegeschool.com/"></iframe>

          </div>
        </div>
      </Layout>
    </main>
  );
}
