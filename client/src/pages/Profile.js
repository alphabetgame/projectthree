import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/query";
import "./Profile.css";
//signup, login, description/directions of the game

const Profile = () => {
  const { loading, data } = useQuery(QUERY_USER);
  const [userFirstName, setUserFirstName] = useState("");
  const [userScores, setUserScores] = useState([]);
  useEffect(() => {
    const user = data?.user.firstName;
    setUserFirstName(user);

    const scores = data?.user.scores;
    setUserScores(scores);
  });
  return (
    <>
      {loading ? (
        <div>loading</div>
      ) : (
        <>
          <div className="text">Welcome, {userFirstName}!</div>
          <div className="body-text">
            Your past scores:
            {userScores?.map((score, index) => (
              <div key={index}>
                {score.game}:{score.score} seconds
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
