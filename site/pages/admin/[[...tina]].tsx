import { TinaAdmin } from 'tinacms/dist/admin'

export default TinaAdmin

// Prevent static generation - this route only works in dev mode
export const getStaticPaths = async () => {
  // Only generate paths in development
  if (process.env.NODE_ENV === 'production') {
    return {
      paths: [],
      fallback: false,
    }
  }
  
  return {
    paths: [{ params: { tina: [] } }],
    fallback: true,
  }
}

export const getStaticProps = async () => {
  return {
    props: {},
  }
}

