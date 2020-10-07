import React, { Fragment } from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';
import { deleteMsg } from '../../actions/message';
const ReceivedMsg = ({messages,deleteMsg }) => {
  const messagesData = messages.map(msg => (
    <tr key={msg._id}>
      <td>{msg.subject}</td>
      <td>{msg.sender.name}</td>
      <td>
        <Moment format="DD/MM/YYYY">{moment.utc(msg.date)}</Moment>
      </td>
      <td>{msg.text}</td>
      <td>
        <button
          className="btn btn-danger" onClick={() => deleteMsg(msg._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Received Emails</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>From</th>
            <th>Date</th>
            <th>Text</th>
            <th />
          </tr>
        </thead>
        <tbody>{messagesData}</tbody>
      </table>
    </Fragment>
  );
};



export default connect(null,{deleteMsg})(ReceivedMsg);