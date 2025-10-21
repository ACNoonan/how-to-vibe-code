import { TinaAdmin } from "tinacms";
import tinaConfig from "../../tina/config";

export default TinaAdmin;

export const getStaticProps = async () => {
  return {
    props: {
      tinaConfig,
    },
  };
};
