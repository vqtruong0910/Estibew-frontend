import Choose from '../../components/home/Choose'
import Layout from '../../components/Layout'
import BestSeller from '../../components/home/discover/BestSeller'
import Products from '../../components/home/Products'
import Head from 'next/head'

export default function Discover({ games }) {
  return (
    <div>
      <Choose />
      <BestSeller games={games} />
      <Products games={games} colSm={12} colMd={6} colLg={3} />
    </div>
  )
}

export async function getStaticProps() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/game?_page=1&_limit=12&_sort=sold&_order=desc`
    )
    const games = await res.json()
    if (games.success === false) return { notFound: true }

    return {
      props: {
        games: games.data,
      },
      revalidate: 10,
    }
  } catch {
    return { notFound: true }
  }
}

Discover.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Head>
        <title>Discover</title>
      </Head>
      {page}
    </Layout>
  )
}
