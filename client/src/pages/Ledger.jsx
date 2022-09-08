import React, { useState, useEffect } from "react";
import axios from "axios";
import httpClient from "../httpClient";

const baseURL = "http://10.100.0.2:5000/ledger";
const Ledger = () => {
  const [eventsList, setEvent] = useState([]);
  const [description, setDescription] = useState("");
  const [loading, isLoading] = useState(true);

  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("http://10.100.0.2:5000/ledger", {
        description,
      });
      setEvent([...eventsList, data.data]);
      setDescription("");
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/${id}`);
      const updatedList = eventsList.filter((event) => event.id !== id);
      setEvent(updatedList);
    } catch (err) {
      console.error(err.message);
    }
  };
  // const encodedValue = encodeURIComponent("someVariable");
  /* 
  const fetchEvents = async () => {
 
    const event = await axios.get("http://10.100.0.2:5000/ledger")
    const { events } = event.event
    setEventsList(events);
  } */

  useEffect(() => {
    const fetchEvents = async () => {
      let data = await fetch("http://10.100.0.2:5000/ledger");
      data = await data.json();
      setEvent(data);
      console.log(data.event);

      /*
      const data = await axios.get("http://10.100.0.2:5000/ledger");
      const { events } = data.data;
      setEvent(events);
      */
      isLoading(false);
    };
    fetchEvents();
  }, []);
  // make a nice looking loading screen
  if (loading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <>
        <div className="panel">
          <header className="app-header">
            <form onSubmit={handleSubmit}>
              <label htmlFor="description">Description</label>
              <input
                onChange={handleChange}
                type="text"
                name="description"
                id="description"
                value={description}
              />
              <button type="submit">Submit</button>
            </form>
          </header>
        </div>
        <div className="panel">
          <section>
            <ul>
              {eventsList.event.map((event, index) => {
                return (
                  <li style={{ display: "Flex" }} key={event.id}>
                    {event.id} {event.email} {event.cost} {event.created_at}{" "}
                    {event.description}{" "}
                    <button onClick={() => handleDelete(event.id)}>X</button>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </>
    );
  }
};

export default Ledger;
