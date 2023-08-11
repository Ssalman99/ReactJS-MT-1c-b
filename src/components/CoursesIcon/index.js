import {Link} from 'react-router-dom'
import './index.css'

const CourseIcon = props => {
  const {courseItemDetails} = props
  const {id, name, logoUrl} = courseItemDetails
  return (
    <Link to={`/courses/${id}`} className="link-item">
      <li className="courses-item">
        <img src={logoUrl} alt={name} className="logo" />
        <p className="logo-name">{name}</p>
      </li>
    </Link>
  )
}

export default CourseIcon
