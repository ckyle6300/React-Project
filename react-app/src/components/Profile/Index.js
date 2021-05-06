import React from 'react';


const Profile = () => {
  const getData = async () => {
    const x = await fetch('/api/coin/info');
    const y = await x.json();
    console.log(y);
    return y;
  }

  const data = getData();
  console.log(data);

  return (
    <h1>Okay</h1>
  )
}

export default Profile;