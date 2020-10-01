import React from "react";

class MemeGenerator extends React.Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImage: "http://i.imgflip.com/1bij.jpg",
      allMemeImages: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((responseData) => {
        const { memes } = responseData.data;
        this.setState({
          allMemeImages: memes
        });
      });
  }

  onChangeText = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const number = Math.floor(Math.random() * this.state.allMemeImages.length);
    const randMemeImage = this.state.allMemeImages[number].url;

    this.setState({ randomImage: randMemeImage });
  };

  render() {
    return (
      <div>
        <form className="meme-form" onSubmit={this.handleSubmit}>
          <input
            name="topText"
            type="text"
            placeholder="top text"
            value={this.state.topText}
            onChange={(event) => this.onChangeText(event)}
          />
          <input
            name="bottomText"
            type="text"
            placeholder="bottom text"
            value={this.state.bottomText}
            onChange={(event) => this.onChangeText(event)}
          />
          <button>Generate</button>
        </form>
        <div className="meme">
          <img src={this.state.randomImage} alt="Meme" />
          <h2 className="top">{this.state.topText}</h2>
          <h2 className="bottom">{this.state.bottomText}</h2>
        </div>
      </div>
    );
  }
}
export default MemeGenerator;
