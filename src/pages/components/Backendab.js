import React from "react";

function Backendab({ csharp }) {
  return (
    <p>
      <i>Backend </i>
      <a href='https:/ / www.java.com' target='_blank' rel='noreferrer'>
        <img
          src='https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg'
          alt='java'
          width='28'
          height='28'
        />
      </a>
      <a href='https://www.w3schools.com/cpp/' target='_blank' rel='noreferrer'>
        <img
          src='https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg'
          alt='cplusplus'
          width='28'
          height='28'
        />
      </a>
      <a href='https://www.python.org' target='_blank' rel='noreferrer'>
        <img
          src='https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg'
          alt='python'
          width='28'
          height='28'
        />
      </a>
      <a
        href='https://docs.microsoft.com/en-us/dotnet/csharp/'
        target='_blank'
        rel='noreferrer'
      >
        <img src={csharp} width='28' height='28' alt='c#' />
      </a>
      <a href='https://nodejs.org' target='_blank' rel='noreferrer'>
        <img
          src='https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg'
          alt='nodejs'
          width='28'
          height='28'
        />
      </a>
      <a href='https://nextjs.org/' target='_blank' rel='noreferrer'>
        <img
          src='https://cdn.worldvectorlogo.com/logos/nextjs-2.svg'
          alt='nextjs'
          width='28'
          height='28'
        />
      </a>
    </p>
  );
}
export default Backendab;
