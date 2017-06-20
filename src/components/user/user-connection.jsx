import React from 'react';
import PropTypes from 'prop-types';
import defaultPicture from './user-picture-default.png';
import _ from 'lodash';

function UserConnection({ user, locale }) {
  const isLogged = !_.isEmpty(user);

  return (
    <div id="user-connection">
      {isLogged
        ? <div>
            <div className="user">
              {user.picture
                ? <div className="user-picture"><img alt="" src={user.picture} /></div>
                : <div className="user-picture">
                    <img alt="" className="default-picture" src={defaultPicture} />
                  </div>}
              <div className="user-name"><strong>{user.name}</strong></div>
              <div className="user-stamp">{locale.stamp}: {user.stamp}</div>
            </div>
            <div className="user-logout">
              <a><span className="glyphicon glyphicon-remove-sign" />{locale.logout}</a>
            </div>
          </div>
        : <div className="user-login" />}
    </div>
  );
}

UserConnection.propTypes = {
  locale: PropTypes.object.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    picture: PropTypes.string,
  }),
};

UserConnection.defaultProps = {
  user: {},
};

export default UserConnection;
