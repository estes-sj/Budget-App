import React, { useState, useEffect } from "react";
import axios from "axios";
import httpClient from "../httpClient";

const Ledger = () => {
  const [data, setData] = useState([])

  const [loading, isLoading] = useState(true)

/* 
  const fetchEvents = async () => {
 
    const data = await axios.get("http://10.100.0.2:5000/ledger")
    const { events } = data.data
    setEventsList(events);
  } */


  useEffect(() => {
    const fetchEvents = async () => {
      let events = await fetch("http://10.100.0.2:5000/ledger")
      events = await events.json()
      setData(events);
      console.log(events.event)
      isLoading(false)
    }
    fetchEvents()
  

  }, [])
  
  if (loading) {
    return (
      <h1>Loading...</h1>
    )
  }
  else {
    return (
      <div className="App">
        <section>
          <p>i'm pissed</p>
        <ul>
            {data.event.map((event, index) => {
              return <li key={event.id}>{event.description}</li>
              
            })}
          </ul>
        </section>
      </div>
  )
  }

}

export default Ledger;
