import Layout from '../components/Layout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const PostLink = ({ post }) => (
  <li>
    <Link as={`/p/${post.id}`} href={`/post?title=${post.name}`}>
      <a>{post.name}</a>
    </Link>
    <style jsx>{`
      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: blue;
        font-family: "Arial";
      }

      a:hover {
        opacity: 0.6;
      }
    `}</style>
  </li>
)

const Index = (props) => (
  <Layout>
    <h1>Batman TV Shows</h1>
    <ul>
      {props.shows.map(({show}) => (
        <PostLink key={ show.id } post={ show } />
      ))}
    </ul>
    <style jsx>{`
      h1 {
        font-family: "Arial";
      }

      ul {
        padding: 0;
      }
    `}</style>
  </Layout>
)

Index.getInitialProps = async function () {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()

  console.log(`Show data fetched. Count: ${data.length}`)

  return {
    shows: data
  }
}

export default Index
