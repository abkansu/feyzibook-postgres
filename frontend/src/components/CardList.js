import React, { useEffect, useState } from "react";
import {
  createMeeting,
  getAllContent,
  getAllContentUser,
} from "../api/apiCalls";
import { toggleContext, userContext } from "../shared/Context";
import { useContext } from "react";
import Card from "./Card";
import InputForMeeting from "./InputForMeeting";
import { useParams } from "react-router-dom";

const CardList = (props) => {
  const [listOfMeetings, setListOfMeetings] = useState({ content: [] });
  const [disabled, setDisabled] = useState(true);
  const { toggle, setToggle } = useContext(toggleContext);
  const { user, setUser } = useContext(userContext);
  const [pendingApiCall, setPendingApiCall] = useState(false);
  // const params = useParams();
  // const { username: currentPath } = params;

  const { isLoggedIn, nameGlobal, usernameGlobal, passwordGlobal, isAdmin } =
    user;

  const [form, setForm] = useState({
    header: null,
    context: null,
    beginDate: null,
    endDate: null,
  });

  const { username } = props;
  const getData = async () => {
    if (!username || isAdmin) {
      try {
        const response = await getAllContent();
        setListOfMeetings({ content: response.data.listOfMeetings });
      } catch (error) {}
    } else {
      try {
        const response = await getAllContentUser(username);
        setListOfMeetings({ content: response.data.listOfMeetings });
      } catch (error) {}
    }
  };

  const onClickPost = async () => {
    const { header, context, beginDate, endDate } = form;
    if (beginDate > endDate || beginDate === null || endDate === null) {
      setDisabled(false);
      return;
    }
    setDisabled(true);
    const meeting = {
      header: header,
      context: context,
      beginDate: `${beginDate.split("-")[2]}/${beginDate.split("-")[1]}/${
        beginDate.split("-")[0]
      }`,
      endDate: `${endDate.split("-")[2]}/${endDate.split("-")[1]}/${
        endDate.split("-")[0]
      }`,
    };

    const creds = {
      username: usernameGlobal,
      password: passwordGlobal,
    };
    try {
      setPendingApiCall(true);
      await createMeeting(meeting, creds);
      setToggle(!toggle);
    } catch (error) {
    } finally {
      setPendingApiCall(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [toggle]);

  const { content } = listOfMeetings;

  const onChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setForm((previousForm) => ({ ...previousForm, [name]: value }));
    setDisabled(true);
  };

  return (
    <div>
      <InputForMeeting
        onChange={onChange}
        disabled={disabled}
        onClickPost={onClickPost}
        pendingApiCall={pendingApiCall}
      />

      {content.map((meeting) => {
        return (
          <Card
            key={meeting.id}
            name={meeting.creatorMember.name}
            username={meeting.creatorMember.username}
            header={meeting.header}
            context={meeting.context}
            joinedMembers={meeting.joinedMembers}
            id={meeting.id}
            date={meeting.date}
            beginDate={meeting.beginDate}
            endDate={meeting.endDate}
          />
        );
      })}
    </div>
  );
};

export default CardList;
