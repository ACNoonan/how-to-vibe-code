import { useTina } from 'tinacms/dist/react'
import { client } from '../tina/__generated__/client'
import { TinaMarkdown } from '../components/TinaMarkdown'
import Head from 'next/head'

export default function PlanningWorksheetPage(props) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })

  const page = data.page

  return (
    <>
      <Head>
        <title>{page.title}</title>
        {page.description && <meta name="description" content={page.description} />}
      </Head>

      <article>
        <h1 className="text-4xl font-bold mb-4">{page.title}</h1>
        {page.description && (
          <p className="text-xl text-gray-600 mb-8">{page.description}</p>
        )}
        
        <TinaMarkdown content={page.body} />
      </article>
    </>
  )
}

export const getStaticProps = async () => {
  const pageResponse = await client.queries.page({ relativePath: 'planning-worksheet.mdx' })

  return {
    props: {
      data: pageResponse.data,
      query: pageResponse.query,
      variables: pageResponse.variables,
    },
  }
}

