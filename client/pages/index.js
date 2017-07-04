import App from '../components/App'
import Channels from '../components/Channels'
import withData from '../lib/withData'

export default withData(prop =>
  <App>
    <Channels />
  </App>
)
