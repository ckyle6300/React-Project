import React from 'react';

const Story = ({ info }) => {
  //need to get description info and add links

  return (
    <div>
      <div>
        <img src={info.project.image.small} />
      </div>
      { info.project.user_title &&
        <div>
          <h3>{info.project.user_title}</h3>
        </div>
      }
      <div>
        <p>Catagory: {info.category}</p>
        {info.project.user &&
          <p>Author: {info.project.user}</p>
        }
        <p>{(info.created_at).toLocaleString('UTC')}</p>
      </div>
      <div>
        <p dangerouslySetInnerHTML={{ __html: info.description }} />
        <p>{info.description}</p>
      </div>
    </div>
  )
}

export default Story;