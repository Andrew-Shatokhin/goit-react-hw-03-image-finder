import React, { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
import ImageGallery from './ImageGallery/ImageGallery';
import { Layout } from './Layout';
import Searchbar from './Searchbar/Searchbar';

export default class App extends Component {
  state = {
    imageSearch: '',
  };

  handleSubmit = imageSearch => {
    this.setState({ imageSearch });
  };

  render() {
    console.log('state', this.state);
    return (
      <Layout>
        <Searchbar onSearch={this.handleSubmit} />
        <ImageGallery value={this.state.imageSearch} />

        <GlobalStyle />
      </Layout>
    );
  }
}

// componentDidMount() {
//   this.setState({ loading: true });
//   // const KEY = '32826694-227c236c87c03694788342456';
//   fetch(
//     'https://pixabay.com/api/?q=cat&page=1&key=32826694-227c236c87c03694788342456&image_type=photo&orientation=horizontal&per_page=12'
//   )
//     .then(res => res.json())
//     .then(image => this.setState({ image }))
//     .finally(() => this.setState({ loading: false }));
// }
