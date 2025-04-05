// frontend/src/components/ReservationView.js
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './ReservationView.css'
function ReservationView({ onBack }) {
  const [reservations, setReservations] = useState([])
  useEffect(() => {
    axios.get('http://45.63.15.45:3001/api/reservations')
      .then(res => {
        if (res.data.success) {
          setReservations(res.data.reservations)
        }
      })
      .catch(err => {
        console.error(err)
      })
  }, [])
  return (
    <div className="reservation-container">
      <h2>机器预约情况</h2>
      {reservations.map(item => (
        <div key={item._id} className="reservation-day">
          <h3>{item._id}</h3>
          <div className="slots">
            {item.slots.sort((a, b) => a.slot - b.slot).map(slotItem => (
              <div key={slotItem.slot} className="slot">
                <span className="slot-time">{slotItem.slot}:00 - {slotItem.slot + 2}:00</span>
                <span className="slot-count">{slotItem.count}人预约</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button onClick={onBack}>返回</button>
    </div>
  )
}
export default ReservationView
