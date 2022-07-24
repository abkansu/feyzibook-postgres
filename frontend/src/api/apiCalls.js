import axios from "axios";

export const signup = (body) => {
  return axios.post("/api/1.0/member/signup", body);
};

export const login = (creds) => {
  return axios.post("api/1.0/auth", {}, { auth: creds });
};

export const getAllContent = () => {
  return axios.get("api/1.0/meeting/getAll");
};

export const getAllContentUser = (username) => {
  return axios.get(`api/1.0/meeting/getAll/${username}`);
};

export const deleteUser = (creds) => {
  const { username } = creds;
  return axios.delete(`/api/1.0/member/in/deleteMember/${username}`, {
    auth: creds,
  });
};

export const getUser = (username) => {
  return axios.get(`/api/1.0/member/${username}`);
};

export const editUser = (body, creds) => {
  const { username } = creds;

  return axios.put(`/api/1.0/member/in/${username}`, body, {
    auth: creds,
  });
};

export const joinMeeting = (meetingID, creds) => {
  const { username } = creds;
  return axios.post(
    `/api/1.0/meeting/in/joinMeeting/${username}/${meetingID}`,
    {},
    { auth: creds }
  );
};

export const unjoinMeeting = (meetingID, creds) => {
  const { username } = creds;
  return axios.delete(
    `/api/1.0/meeting/in/unjoinMeeting/${username}/${meetingID}`,
    { auth: creds }
  );
};

export const deleteMeeting = (meetingID, creds) => {
  const { username } = creds;
  return axios.delete(
    `/api/1.0/meeting/in/deleteMeeting/${username}/${meetingID}`,
    { auth: creds }
  );
};

export const createMeeting = (meeting, creds) => {
  const { username } = creds;
  const { context, header, beginDate, endDate } = meeting;
  return axios.post(
    `/api/1.0/meeting/in/createMeeting/${username}`,
    {
      context: context,
      header: header,
      beginDate: beginDate,
      endDate: endDate,
    },
    {
      auth: creds,
    }
  );
};

export const getEnabledUsers = (creds) => {
  return axios.get(`/api/1.0/admin/enabledUsers`, { auth: creds });
};

export const banUser = (username, creds) => {
  return axios.delete(`/api/1.0/admin/${username}`, { auth: creds });
};

export const unbanUser = (username, creds) => {
  return axios.put(`/api/1.0/admin/${username}`, {}, { auth: creds });
};

export const getDisabled = (creds) => {
  return axios.get("api/1.0/admin/getDisabled", { auth: creds });
};
/*
/api/1.0/member/in/deleteMember/{username}
/api/1.0/member/in/{username}
/api/1.0/member
/api/1.0/member
/api/1.0/member




*/
