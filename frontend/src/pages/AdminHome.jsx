/* eslint-disable import/no-extraneous-dependencies */
import axios from "@services/axios";
import ClientList from "@components/ClientList";
import TextEditor from "@components/TextEditor";
import { Eventcalendar, toast, localeFr } from "@mobiscroll/react";
import React, { useEffect, useState } from "react";

export default function AdminHome() {
  const [myEvents, setEvents] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [reservationTitle, setReservationTitle] = useState();

  const postClient = async () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}preorder`)
      .then((res) => setReservationTitle(res.data));
  };
  const getDates = async () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}preorder/dates`)
      .then((res) => setEvents(res.data));
  };

  useEffect(() => {
    getDates();
    postClient();
  }, []);
  // React.useEffect(() => {
  //   // getJson(
  //   //   "https://trial.mobiscroll.com/events/?vers=5",
  //   //   (events) => {
  //   //     setEvents(events);
  //   //   },
  //   //   "jsonp"
  //   // );

  // }, []);
  const onEventClick = React.useCallback((event) => {
    toast({
      message: event.data.title,
    });
  }, []);

  const view = React.useMemo(() => {
    return {
      calendar: { popover: true, count: true },
    };
  }, []);
  return (
    <section className="background-home">
      <div className="position-admin--editor">
        <div className="background-texteditor">
          <TextEditor />
        </div>
        <ClientList />
      </div>
      <Eventcalendar
        locale={localeFr}
        theme="ios"
        themeVariant="light"
        clickToCreate={false}
        dragToCreate={false}
        dragToMove={false}
        dragToResize={false}
        eventDelete
        data={myEvents}
        view={view}
        onEventClick={onEventClick}
      />
    </section>
  );
}
