import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
export default function UserProfile() {
  const storeduser = JSON.parse(localStorage.getItem("user"));
  const { username } = useParams();
  const [isloading, setIsloading] = useState(false);
  const [data, setData] = useState();
  const fetchdata = () => {
    setIsloading(true);
    fetch(`http://localhost:5000/api/user/${username}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.response);
        setIsloading(false);
      });
  };
  useEffect((id) => {
    fetchdata();
  }, []);
  const handlefollow = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.patch(
        `http://localhost:5000/api/user/${username}`,
        {
          followers: data.followers + 1,
        }
      );
      setData(resp.data.response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        {isloading ? (
          <p>loading</p>
        ) : (
          <>
            {data ? (
              <>
                <div
                  style={{
                    background: "white",
                    fontSize: "25px",
                    padding: "30px",
                    borderRadius: "20px",
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "40px",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src="../avatar.png"
                      alt="avatar"
                      style={{
                        width: "8rem",
                        borderRadius: "100%",
                        border: "2px solid green",
                      }}
                    />
                    <div>
                      <p>
                        <span style={{ fontWeight: "bold" }}>Username: </span>
                        {data.username}
                      </p>
                      <p>
                        <span style={{ fontWeight: "bold" }}>Name: </span>
                        {data.name}
                      </p>
                      {storeduser?.username === data.username ? (
                        <></>
                      ) : (
                        <>
                          <button
                            onClick={handlefollow}
                            style={{ background: "#0691b8" }}
                            className="form__button"
                          >
                            Follow
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "20px" }}>
                    <p>
                      <span style={{ fontWeight: "bold" }}>Posts: </span>
                      {data.posts}
                    </p>
                    <p>
                      <span style={{ fontWeight: "bold" }}>Followers: </span>
                      {data.followers}
                    </p>
                    <p>
                      <span style={{ fontWeight: "bold" }}>Following: </span>
                      {data.following}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <p
                  style={{
                    textAlign: "center",
                    color: "#a32807",
                    fontWeight: "bold",
                    fontSize: "25px",
                  }}
                >
                  no user found with username {username}
                </p>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
