import React from 'react';
import './Results.css';

class Results extends React.Component {
  componentDidMount(){
    fetch('/meme', {'Content-Type' : 'application/json'})
    .then(response=> response.json())
    .then(memes => console.log(memes));
    console.log('Results mount');
  }

  componentWillUnmount(){
    console.log('Results unmount');
  }

  render(){
    return (
      <div className='Results Page'>
        Results Coming Soon...
      </div>
    );
  }
};

export default Results;
