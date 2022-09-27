import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import httpClient from "../httpClient";

const baseURL = "http://10.100.0.2:5000/ledger";
const Ledger = () => {
  const [eventsList, setEvent] = useState([]);
  const [description, setDescription] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [eventID, setEventID] = useState(null);

  const [loading, isLoading] = useState(true);
  const countRef = useRef(0);

  const handleChange = (e, field) => {
    if (field === "edit") {
      setEditDescription(e.target.value);
    } else {
      setDescription(e.target.value);
    }
    countRef.current++;
  };

  const toggleEdit = (event) => {
    setEventID(event.id);
    setEditDescription(event.description);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editDescription) {
        const data = await axios.put(`${baseURL}/${eventID}`, {
          description: editDescription,
        });
        const updatedEvent = data.data.event;
        const updatedList = eventsList.map((event) => {
          if (event.id === eventID) {
            return (event = updatedEvent);
          }
          return event;
        });
        setEvent(updatedList);
      } else {
        const data = await axios.post(`${baseURL}`, { description });
        setEvent([...eventsList, data.data]);
      }
      setDescription("");
      setEditDescription("");
      setEventID(null);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/${id}`);
      const updatedList = eventsList.filter((event) => event.id !== id);
      setEvent(Array.from(updatedList));
      countRef.current++;
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
      /*
      let data = await fetch("http://10.100.0.2:5000/ledger");
      data = await data.json();
      setEvent(data.event);
*/
      //     console.log(data.event);
      //console.log(data);
      await axios.get("http://10.100.0.2:5000/ledger").then((response) => {
        //     console.log(response);
        const myRepo = response.data;
        /* 
        for (let i = 0; i < myRepo.event.length; i++) {
          console.log(myRepo.event[i].id);
        }
 */
        setEvent(myRepo.event);
      });

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
                onChange={(e) => handleChange(e, "description")}
                type="text"
                name="description"
                id="description"
                value={description}
                placeholder="Name the transaction"
              />
              <button type="submit">Submit</button>
            </form>
          </header>
        </div>
        <div className="panel">
          <section>
            <ul>
              {/*  after deleting, expects eventsList.map but only works once */}
              {Array.isArray(eventsList)
                ? eventsList.map((event, index) => {
                    if (eventID === event.id) {
                      return (
                        <li key={event.id}>
                          <form onSubmit={handleSubmit} key={event.id}>
                            <input
                              onChange={(e) => handleChange(e, "edit")}
                              type="text"
                              name="editDescription"
                              id="editDescription"
                              value={editDescription}
                            />
                            <button type="submit">Submit</button>
                          </form>
                        </li>
                      );
                    } else {
                      return (
                        <li style={{ display: "Flex" }} key={event.id}>
                          {event.id} {event.email} {event.cost}{" "}
                          {event.created_at} {event.description}{" "}
                          <button onClick={() => toggleEdit(event)}>
                            Edit
                          </button>
                          <button onClick={() => handleDelete(event.id)}>
                            X
                          </button>
                        </li>
                      );
                    }
                  })
                : null}
            </ul>
          </section>
        </div>
      </>
    );
  }
};

export default Ledger;
