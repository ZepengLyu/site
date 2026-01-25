import React, { useState } from 'react'
import {Link, useStaticQuery, graphql } from 'gatsby'
import { Button, ConfigProvider, Layout, Menu, theme } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  FolderOutlined,
} from '@ant-design/icons';

import {navLinks, navLinkItem, navLinkText} from './layout.module.css'
import {articleLayout} from './layout.module.css'

const { Header, Content, Footer, Sider } = Layout;

const PageLayout = ({pageTitle,releaseDate,children}) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer,colorPrimary, borderRadiusLG },
  } = theme.useToken();

  // data 
  // const data=useStaticQuery(graphql`      
  //   query MyQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `)
  const navItems=[
    {key:"Home", label:<Link to="/">Home</Link>},
    {key:"about", label: <Link to="/about/">About</Link>}
  ]
  const postData=useStaticQuery(graphql`
    query {
      allMdx(sort: { frontmatter: { date: DESC }}) {
        nodes {
          frontmatter {
            date(formatString: "MMMM D, YYYY")
            title
            slug
          }
          id
          excerpt
        }
      }
    }
  `)
  const siderItems=[
    {
      key: '1',
      icon: <FolderOutlined />,
      label: 'post',
      children: postData.allMdx.nodes.map((node)=>{
          return {
            key: node.frontmatter.slug,
            label:
              <Link to={`/blog/${node.frontmatter.slug}`}>
              {node.frontmatter.title}
              </Link>,
          }
        } 
      )
    },
    {
      key: '2',
      icon: <FolderOutlined />,
      label: 'nav 2',
      children:[
        {key:'123',
         label:'123',
        }
      ]
    },
    {
      key: '3',
      icon: <UploadOutlined />,
      label: 'nav 3',
    },
  ]

  
  return (
    <Layout style={{minHeight:'100vh'}}>

      <Sider trigger={null} collapsible collapsed={collapsed} collapsedWidth='0' style={{backgroundColor:'#001529'}} >
        <Menu
          theme='dark'
          mode="inline"
          defaultSelectedKeys={['1']}
          items={siderItems}
        />
      </Sider>

      <Layout>
        <Header style={{ display:'flex', alignItems: 'center', padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={navItems}
            style={{ flex: 1, minWidth: 0 }}
          />

          {/* TODO: 这里放置一个查询框 */}

        </Header>
        <div style={{marginLeft:24,marginTop:24}}>
        <h1>{pageTitle}</h1>
        <p>{releaseDate}</p>  
        </div>        
        
        <Content
          style={{
            margin: '0 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
        {children}
        </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
      </Layout>    

    </Layout>
 
  );
};

export default PageLayout;

