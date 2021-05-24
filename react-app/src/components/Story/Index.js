import React from 'react';
import styles from './story.module.css'

const Story = ({ info }) => {
  let descArr = info.description.split(' ');
  console.log(info);
  let newDescription = descArr.map(word => {
    if (word.includes('http')) {
      let link = word.indexOf('http');
      let newWord = word.slice(link);
      return `<a href=${newWord}>${word}</a>`
    }
    return word;
  })

  const word = newDescription.join(' ');

  return (
    <div className={styles.outer}>
      <div className={styles.header}>
        <div>
          <img src={info.project.image.small} />
        </div>
        <div>
          <h3>{info.project.name}</h3>
        </div>
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
        <p dangerouslySetInnerHTML={{ __html: word }} />
      </div>
    </div>
  )
}

export default Story;