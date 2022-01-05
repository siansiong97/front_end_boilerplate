import { wrapper } from '../redux/store'
import '../styles/globals.css'
import 'antd/dist/antd.css';
require("../styles/variables.less");

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp)