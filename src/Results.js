import React from 'react';
import './Results.css';

class Results extends React.Component {
  state = {
    winners: [],
  }


  componentDidMount(){
    Promise.all([
      fetch('/meme').then(response=> response.json()),
      fetch('/vote').then(response=> response.json())
    ]).then(([memes, votes]) => this.setState({
        votes, memes,
        winners : memes.map(meme=> {
          const total = votes.filters(vote => (
            meme.id === vote.winner || meme.id === vote.loser
          )).length;
          const winning = votes.filter(vote => (
            vote.winner === meme.id
          )).length;

          return { percentage : winning / total, imgUrl: meme.imgUrl };
      }).sort((ma, mb)=> ma.percentage < mb.percentage ? 1 : -1),
    }));
  }

  componentWillUnmount(){
    console.log('Results unmount');
  }

  render(){
    return (
      <div className='Results Page'>
        <div>
          <ul>
          {this.state.winners
            .slice(0,3)
            .map(meme=>(
            <li key={meme.imgUrl}>
              {meme.imgUrl} - {meme.percentage}
            </li>
          ))}
          </ul>
        </div>
        <div>
          <ul>
          {this.state.winners
            .slice()
            .map(meme=>(
            <li key={meme.imgUrl}>
              {meme.imgUrl} - {meme.percentage}
            </li>
          ))}
          </ul>
        </div>
      </div>
    );
  }
};

export default Results;
