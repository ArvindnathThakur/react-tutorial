import React from "react";
import {
  FaCompass,
  FaBriefcase,
  FaUsers,
  FaUserFriends,
  FaUser,
} from "react-icons/fa";
import PropTypes from "prop-types";
import Tooltip from "./Tooltip";
import TooltipHoc from "./TooltipHoc";

export default function ProfileList({ profile }) {
  return (
    <ul className="card-list">
      <li>
        <FaUser color="rgb(239, 115, 115)" size={22} />
        {profile.name}
      </li>
      <li>
        {profile.location && (
          <Tooltip text="User's Location">
            <FaCompass color="rgb(144, 115, 255)" size={22} />
            {profile.location}
          </Tooltip>
        )}
      </li>
      <li>
        {profile.company && (
          <Tooltip text="User's Company">
            <FaBriefcase color="#795548" size={22} />
            {profile.company}
          </Tooltip>
        )}
      </li>
      <li>
        <TooltipHoc text="User's Followers">
          <FaUsers color="rgb(129, 195, 245)" size={22} />
          {profile.followers.toLocaleString()} followers
        </TooltipHoc>
      </li>
      <li>
        <FaUserFriends color="rgb(64, 183, 95)" size={22} />
        {profile.following.toLocaleString()} following
      </li>
    </ul>
  );
}

ProfileList.propTypes = {
  profile: PropTypes.object.isRequired,
};
