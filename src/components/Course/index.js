import './index.css'

const Course = props => {
  const {courseItemDetails} = props

  const {name, description, imageUrl} = courseItemDetails

  return (
    <li className="course-list-items">
      <div className="DetailsContainer">
        <img src={imageUrl} alt={name} className="image" />
        <div className="card">
          <h1 className="course-item-heading">{name}</h1>
          <p className="course-item-description">{description}</p>
        </div>
      </div>
    </li>
  )
}

export default Course
