import "./topBox.scss"
import {topDealUsers} from "../../data.ts"

const TopBox = () => {
  return (
    <div className="topBox">
      <h1>Upcoming event</h1>
      <div className="list">
        {topDealUsers.map(user=>(
          <div className="listItem" key={user.id}>
            <div className="user">
              <img src={user.img} alt="" />
              <div className="userTexts">
                <span className="username">{user.username}</span>
              </div>
            </div>
            <span className="">{user.amount}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopBox