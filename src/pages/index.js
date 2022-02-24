import React, { useState } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import styles from './index.module.css';

function HomepageHeader() {

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title"><Translate>Welcome to my website</Translate></h1>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            <Translate>
              Here is some notes
            </Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}
const Skills = () => {
  return(
  <div >
    <p>
    <strong>Program Language:</strong> Python(3/5), Java(3/5), HTML 5(4.5/5), CSS(3/5), JavaScript(4.5), React(4/5), Redux(3/5),MySQL(3/5), Unix/Linux(4/5)
    <br/>
    <strong>Version Control:</strong>  Git, Docker, Devops
    <br/>
    <strong>Editors:</strong> Vim, VS Code, IntelliJ IDEA
    <br/>
    <strong>Automates tool:</strong> Selenium
    <br/>
    <strong>Activities: </strong>https://malaaa.mljlls.tech/（A blog that documents the learning process）
 </p>
     </div>)
}
const Projects = () => {
  return(
  <div >
    <p>
    <strong>Library control system:</strong>
    (based on Java spring-boot co-work another people on GitHub)
    <br/>

• Use JAVA with spring-boot frame with JDBC.
<br/>

• Use Bootstrap 5 and JavaScript to design the interface.
<br/>
    <strong>Private BI consultant company website:</strong>
    Designed a full-stack website by React and Bootstrap, and build API on Google Cloud Platform for Sum accounting company.    <br/>
    <br/>
    • Use firebase as the back-end platform and build robot function APIs.
    <br/>
• Design and build user interface by using React and use the Bootstrap styles.
    <br/>
    <strong>Tic-Tac-Toe game:</strong>A react game help me have a better understanding of the react component and how to use hook.
    </p>  </div>)
}
export default function Home() {
  const [option, setOption] = useState(true);


  return (
    <main>
      <Layout
        title={`Hello Stranger`}
        description="This is a resume and blog for my program">
        <HomepageHeader />
        <div className={styles.warp}>
          <div className={clsx("button button--secondary button--lg", styles.left)}  onClick={()=>{setOption(true)}}><strong>skills</strong></div>
          <div className={styles.middle}></div>
          <div className={clsx("button  button--secondary button--lg", styles.right)} onClick={()=>{setOption(false)}}><strong>projects</strong></div>

        </div>
        <div className="container" >
          <div className={styles.description}>
          {option?<Skills/>:<Projects/>}

        </div>
        </div>
        </Layout>
    </main>
  );
}
