import React, { Fragment } from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';
const SentMsg = ({messages }) => {
  const messagesData = messages.map(msg => (
    <tr key={msg._id}>
      <td>{msg.subject}</td>
      <td>{msg.receiver.name}</td>
      <td>
        <Moment format="DD/MM/YYYY">{moment.utc(msg.date)}</Moment>
      </td>
      <td>{msg.text}</td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Sent Emails</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>To</th>
            <th>Date</th>
            <th>Text</th>
          </tr>
        </thead>
        <tbody>{messagesData}</tbody>
      </table>
    </Fragment>
  );
};



export default connect(null,{})(SentMsg);