import dynamic from 'next/dynamic'
import HomeContainer from 'layouts/HomeContainer'
import SiteHead from 'components/shared/SiteHead'
import { Row, Col } from 'react-bootstrap'
import styles from 'styles/SubMenu.module.css'
const { MongoClient } = require('mongodb')
const TextContent = dynamic(() => import('components/shared/TextContent'))

const History = ({ page }) => (
  <HomeContainer>
    <SiteHead
      title="History & Background - Asbury Park High School Hall of Fame"
      metaDescription="In the late 90’s, Carl Williams, Mayor of Asbury Park and graduate of Asbury Park High School, conceived of a vehicle where the rich history of the high school and its graduates would be remembered and celebrated."
    />
    <Row className="mx-2 mt-2 content">
      <Col sm={12} className="px-0">
        <div className="my-4">
          <h3 className={styles.membersTitle}>
            <strong>History & Background</strong>
          </h3>
          <TextContent content={page.history} />
        </div>
      </Col>
    </Row>
  </HomeContainer>
)

export const getStaticProps = async () => {
  const connection = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  const db = connection.db(process.env.DB_NAME)
  const reqPage = await db.collection('home').find({}).toArray()
  return {
    props: {
      page: JSON.parse(JSON.stringify(reqPage[0])),
    },
  }
}

export default History
