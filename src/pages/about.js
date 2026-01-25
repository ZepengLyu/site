import * as React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'

const AboutPage=()=>{
  return(
    <Layout pageTitle="About">
      <p>
        About Me
      </p>
    </Layout>
  )
}

export const Head=()=>{
    <title>
        About me
    </title>
}

export default AboutPage